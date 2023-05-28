import * as React from "react";
import { useGetAllProductsQuery } from "../api/products";

interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {
  const { data } = useGetAllProductsQuery();
  return (
    <main>
      Products Page
      {data && JSON.stringify(data)}
    </main>
  );
};

export default ProductsPage;
