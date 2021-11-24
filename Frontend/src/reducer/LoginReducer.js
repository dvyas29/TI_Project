import { createSlice } from "@reduxjs/toolkit";
import { login, clear } from "../action/LoginActions";

// const Initial_state={
//   
// 
// }
export const LoginReducer = createSlice({
  name: "signin",
  initialState: {
    id : "",
    role: "",
    accessToken: "",
    error: "",
    passRest: "",
    passCust: "",
  },
  reducers: {
    setUser: () => {}
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      //console.log("---action payload------",action.payload);
      if (action.payload.auth) {
        if (action.payload.role === "customer") {
          state.passCust = true;
          state.id = action.payload.id;
          state.role = action.payload.role;
          state.accessToken = action.payload.accessToken;
        } else if (action.payload.role === "restaurant") {
          state.passRest = true;
          state.id = action.payload.id;
          state.role = action.payload.role;
          state.accessToken = action.payload.accessToken;
        }
      } else {
        state.error = "invalid credentials";
      }
    },

    [clear.fulfilled]: (state, action) => {
      //console.log("---inside clear action");
      if (action.payload.arg) {
        state.error = "";
        state.passCust = false;
        state.passRest = false;
      }
    },
    
  },
});

export default LoginReducer.reducer;
