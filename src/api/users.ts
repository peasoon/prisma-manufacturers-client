import { api } from "./api";

type UserInfo = {
  email: string;
  name: string;
  password: string;
};

type RegisteredUser = {
  id: number;
  email: string;
  name: string;
  token: string;
};

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisteredUser, UserInfo>({
      query: (data: UserInfo) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = usersApi;
