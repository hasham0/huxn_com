import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userTemTS } from "@/lib/zod";

interface InitialState {
  userInfo: userTemTS | null;
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
    setCredientials: (state, action: PayloadAction<{ data: userTemTS }>) => {
      state.userInfo = action.payload.data;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
      const expiration: number =
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expiration.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
