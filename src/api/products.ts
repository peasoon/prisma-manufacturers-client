import { api } from "./api";

export type Product = {
  id: number;
  title: string;
  manufacturerId: number;
};

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<Product, string>({
      query: (title: string) => ({
        url: "/products/create",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productsApi;
