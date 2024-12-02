import { createSlice } from "@reduxjs/toolkit";
import { Staff } from "../entities";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    curInfo: {} as Staff
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.curInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
