import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { loginActions, StudentRecords } from "../../store/slices";
import { api } from "../../apis/routes";
import { useAppDispatch } from "../../store";

const Homepage = () => {
  const [name, setName] = useState("");
  const [pickStudent, setPickStudent] = useState<StudentRecords>([]);

  const dispatch = useAppDispatch();

  const getClasses = (record: StudentRecords) => {
    dispatch(loginActions.getStudentClasses(record));
  };

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Enter name to login");
      return;
    } else if (name.trim().length < 2) {
      alert("Name too short! at least more than 1 character is needed");
      return;
    } else {
      (async () => {
        try {
          const res = await api.login(name);
          if (!res.length) {
            alert(`No Student record for ${name}`);
            return;
          }
          if (res.length > 1) {
            // ask user to pick a student ==> if filterByFormula is using SEARCH
            setPickStudent(res);
          } else {
            getClasses(res);
          }
        } catch (e) {
          alert(`An error has occurred, ${JSON.stringify(e)}`);
        }
      })();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <HomepageStyle>
      <form className={"HomepageStyle__input-container"} onSubmit={login}>
        <label>
          Student Name:
          <input onChange={handleChange} name="login" value={name} />
        </label>
        <button type="submit">login</button>
      </form>
      {/*only shows if filterByFormula uses search ==> eg joe*/}
      {pickStudent.length > 1 && (
        <div>
          <p>
            Similar names with <b>{name}</b> found, Please select a name:
          </p>
          <SuggestionDropDown>
            {pickStudent.map((record) => (
              <button onClick={() => getClasses([record])}>
                {record.name}
              </button>
            ))}
          </SuggestionDropDown>
        </div>
      )}
    </HomepageStyle>
  );
};

const SuggestionDropDown = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > button {
    all: unset;
    cursor: pointer;
    height: 15px;
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
`;

const HomepageStyle = styled.div`
  .HomepageStyle {
    &__input-container {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Homepage;
