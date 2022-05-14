import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../apis/routes";

const typePrefix = "student";

export type StudentRecords = Array<{ name: string; classes: string[] }>;
export type ClassRecords = {
  allStudents: Record<string, any>;
  classes: Array<{ name: string; students: string[] }>;
};

const getStudentClasses = createAsyncThunk<any, any, any>(
  `${typePrefix}/getClasses`,
  async (record: StudentRecords, { rejectWithValue }) => {
    try {
      const res = await api.getClasses(record);
      if (!res.classes.length) {
        const errMssg = `No Student record for ${"ss"}`;
        alert(errMssg);
        return rejectWithValue(errMssg);
      }
      return res;
    } catch (e) {
      alert(`An error has occurred, ${JSON.stringify(e)}`);
      return rejectWithValue(`An error has occurred, ${JSON.stringify(e)}`);
    }
  }
);

const loginSlice = createSlice({
  name: typePrefix,
  initialState: {
    allStudents: {},
    classes: [],
  } as ClassRecords,
  reducers: {
    logout: (state) => {
      state.classes = [];
      state.allStudents = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudentClasses.fulfilled, (state, action) => {
      state.classes = action.payload?.classes || [];
      state.allStudents = action.payload?.allStudents || {};
    });
  },
});

export const loginActions = { ...loginSlice.actions, getStudentClasses };

export const loginSelector = (state: ClassRecords) => state;

export default loginSlice.reducer;
