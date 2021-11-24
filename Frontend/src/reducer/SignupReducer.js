import { createSlice } from "@reduxjs/toolkit";
import { signup, clear } from "../action/SignupActions";

// const Initial_state={
//     email: '',
//     password: '',
//     role: ''
// }
export const SignupReducer = createSlice({
  name: "signup",
  initialState: {
    // email: "",
    // password: "",
    id: '',
    role: "",
    error: "",
    passSignup: "",
  },
  reducers: {
    setUser: () => {}
  },
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      //console.log(action.payload);
      if (action.payload.auth) {
        state.passSignup=true;
        state.id=action.payload.id;
        state.role=action.payload.role;
      } else {
        state.error = "invalid action, try again";
      }
    },
    [clear.fulfilled]: (state, action) => {
      //console.log("---inside signup11 clear action");
      if (action.payload.arg) {
        state.error = "";
        state.passSignup = false;
        
      }
    },
    
  },
});

export default SignupReducer.reducer;
