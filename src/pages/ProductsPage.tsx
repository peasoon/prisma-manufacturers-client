import * as React from "react";
import { useGetAllProductsQuery } from "../api/products";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../api/products";
import { NavLink } from "react-router-dom";


interface IProductsPageProps {}

const columns: ColumnsType<Product> = [
  {
    title: "Код товара",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Код поставщика",
    dataIndex: "manufacturerId",
    key: "manufacturerId",
    render:(val,rec)=>{
      return <NavLink to={`/users/${val}`}>{val}</NavLink>
    }
  },
];

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {
  const { data, isLoading } = useGetAllProductsQuery();
  return (
    <main>
      Products Page
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </main>
  );
};

export default ProductsPage;
