import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).users.user?.token ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
