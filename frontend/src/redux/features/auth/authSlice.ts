import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userInfo: any;
}

const initialState: InitialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredientials: (state, action: PayloadAction) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expiration: number =
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expiration.toString());
    },
    logout: (state, action: PayloadAction) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
