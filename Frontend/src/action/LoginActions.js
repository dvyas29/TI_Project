import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Backend_URL from '../config/configBackendURL';


export const login = createAsyncThunk(
    'users/login',
    async (creds)=>{
        const response = await axios.post(Backend_URL + "/auth/login", creds)
        if(response.data.role==="customer"){
           
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('accessToken', response.data.accessToken);
            return {auth : true, role: response.data.role, id: response.data.id, name: response.data.name,
                 accessToken: response.data.accessToken}
           // history.push('/custDashboard');
          }else if(response.data.role==="restaurant"){
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('accessToken', response.data.accessToken);
            return {auth : true, role: response.data.role, id: response.data.id, name: response.data.name,
                accessToken: response.data.accessToken}
            //history.push('/restDashboard');
          }else{
            return {auth : false}
         }
    })

export const clear= createAsyncThunk(
    'users/clear',
    async()=>{
        return {arg:true}
    }
)