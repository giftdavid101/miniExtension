import base from "./index";
import { FieldSet, Records } from "airtable";
import { ClassRecords, StudentRecords } from "../store/slices";

interface StudentTFields extends FieldSet {
  Name: string;
  Classes: string[];
}

const multipleRecords = (arr: string[]) =>
  arr.map((el) => `RECORD_ID() = '${el}'`).join(",");

const routes = {
  login: (studentName: string) =>
    new Promise<StudentRecords>((resolve, reject) => {
      base("Students")
        .select({
          fields: ["Name", "Classes"],
          filterByFormula: `LOWER({Name}) = TRIM(LOWER("${studentName}"))`,
          // filterByFormula: `SEARCH(TRIM(LOWER("${studentName}")), LOWER({Name}))`,
        })
        .eachPage(
          (records: Records<StudentTFields | any>) => {
            resolve(
              records.map(({ fields } ) => ({
                name: fields.Name,
                classes: fields.Classes,
              }))
            );
          },
          (err: Error) => {
            reject(err);
          }
        );
    }),
  getClasses: (data: StudentRecords) =>
    new Promise<ClassRecords>((resolve, reject) => {
      base("Classes")
        .select({
          filterByFormula: `OR(${multipleRecords(data[0].classes)})`,
        })
        .eachPage(
          async (records: Records<any>) => {
            const studentIds: string[] = records
              .map((record) => record.fields.Students)
              .flat();
            // get all existing students in class
            let res = await base("Students")
              .select({
                filterByFormula: `OR(${multipleRecords(
                  Array.from(new Set(studentIds))
                )})`,
              })
              .all();
            // keep records of all existing student in classes, map name to id
            const allStudents = res.reduce((res: Record<string, any>, obj) => {
              res[obj.id] = obj.fields.Name;
              return res;
            }, {});

            resolve({
              allStudents,
              classes: records.map((_class) => ({
                name: _class.fields.Name,
                students: _class.fields.Students.map(
                  (student: string) => allStudents[student]
                ),
              })),
            });
          },
          (err: Error) => {
            reject(err);
          }
        );
    }),
};

export const api = { ...routes };
