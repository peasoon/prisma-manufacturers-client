import { api } from "./api";
import { Product } from "./products";

type UserInfo = {
  email: string;
  name: string;
  password: string;
};

export type RegisteredUser = {
  id: number;
  email: string;
  name: string;
  token: string;
};

export type UserWithProducts = {
  id:number;
  email:string;
  name:string;
  password:string;
  products:Product[]
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisteredUser, UserInfo>({
      query: (data: UserInfo) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<RegisteredUser,Omit<UserInfo,'name'>>({
      query:(data:Omit<UserInfo,'name'>)=>({
        url:'/users/login',
        method:'POST',
        body:data,
      })
    }),
    getUserProducts: builder.query<UserWithProducts,number>({
      query:(id:number)=>({
        url:`/products?user=${id}`,
        method:'GET'
      })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserProductsQuery } = usersApi;
