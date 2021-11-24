import { createSlice } from "@reduxjs/toolkit";
import { restlist, restlistfordashue, restaurantlistfilter, searcByhModeOfDeliveryOnly, restlistforsearch } from "../action/DashBoardActions";

export const restaurantListUE = createSlice({
  name: "restaurantListDashboardue",
  initialState: {
    restList: []
  },
  reducers: {
    setUser: () => {}
  },
  extraReducers: {

    [restlistforsearch.fulfilled]: (state, action) => {
      //console.log("inside restlistforsearch of DashBoardUseEffectReducer")
      if (action.payload.auth) {
      
          state.restList = action.payload.restList;
    
    }
  },

  [restlistfordashue.fulfilled]: (state, action) => {
   // console.log("inside restlistfordashue of DashBoardUseEffectReducer")
    if (action.payload.auth) {
    
        state.restList = action.payload.restList;
  
  }
},

[restaurantlistfilter.fulfilled]: (state, action) => {
 // console.log("inside restaurantlistfilter of DashBoardUseEffectReducer")
  if (action.payload.auth) {
  
      state.restList = action.payload.restList;

}
},

[searcByhModeOfDeliveryOnly.fulfilled]: (state, action) => {
 //console.log("inside searcByhModeOfDeliveryOnly of DashBoardUseEffectReducer")
  if (action.payload.auth) {
  
      state.restList = action.payload.restList;

}
}



  
}});

export default restaurantListUE.reducer;
