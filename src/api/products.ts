import { api } from "./api";

export type Product = {
  id:number;
  title:string;
  manufacturerId:number
}

export const productsApi = api.injectEndpoints({
  endpoints:(builder)=>({
    getAllProducts:builder.query<Product[],void>({
      query:()=>({
        url:'/products',
        method: 'GET'
      }),
    })
  })
})

export const {useGetAllProductsQuery} = productsApi