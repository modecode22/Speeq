import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
interface AppState {
  error: string;
}

  const initialState: AppState = {
    error: "",
  };




export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    dismissError: (state) => {
      state.error = "";
    },
  },
});

export const { setError, dismissError } = appSlice.actions;
export const selectError = (state: RootState) => state.app.error;

export default appSlice.reducer;
