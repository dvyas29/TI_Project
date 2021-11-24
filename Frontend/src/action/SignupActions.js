import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Backend_URL from '../config/configBackendURL';


export const signup = createAsyncThunk(
    'users/signup',
    async (creds)=>{
        const response = await axios.post(Backend_URL + "/auth/register", creds)
        if(response.status===200){
          
            return {auth : true, role:response.data.role, id: response.data.id}
         
          }else if(response.data.status!==200){
           
            return {auth : false}

           
          }
    })

export const clear= createAsyncThunk(
    'users/clear',
    async()=>{
        return {arg:true}
    }
)