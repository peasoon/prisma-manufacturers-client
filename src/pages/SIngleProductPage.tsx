import * as React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../api/products";
import Table, { ColumnsType } from "antd/es/table";

interface ISingleProductPageProps {}

const columns: ColumnsType<{
  id: number;
  title: string;
  manufacturerId: number;
}> = [
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
    render: (val) => {
      return <NavLink to={`/users/${val}`}>{val}</NavLink>;
    },
  },
];

const SingleProductPage: React.FunctionComponent<ISingleProductPageProps> = (
  props
) => {
  const params = useParams();
  const { data, isLoading } = useGetSingleProductQuery(Number(params.id));
  return (
    <main>
      Страница товара
      {data && (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={[
            {
              id: data!.id,
              title: data!.title,
              manufacturerId: data!.manufacturerId,
            },
          ]}
          pagination={false}
        />
      )}
    </main>
  );
};

export default SingleProductPage;
