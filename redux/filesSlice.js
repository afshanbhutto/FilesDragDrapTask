import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: [],
  reducers: {
    addFile: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addFile } = filesSlice.actions;
export default filesSlice.reducer;
