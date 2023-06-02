import { createSlice } from "@reduxjs/toolkit";
import { RegisteredUser, usersApi } from "../../api/users";


interface InitialState {
  user: RegisteredUser | null;
  isAuthenticated: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthenticated:false
};

export const usersSlice = createSlice({
  name:'users',
  initialState,
  reducers:{
    logout:(state)=>initialState
  },
  extraReducers:(builder)=> {
    builder
    .addMatcher(usersApi.endpoints.registerUser.matchFulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
    })
    .addMatcher(usersApi.endpoints.loginUser.matchFulfilled, (state, action) => {
      console.log('login')
      state.user = action.payload;
      state.isAuthenticated = true
    })
  },
})