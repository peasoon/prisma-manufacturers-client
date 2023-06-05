import * as React from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserWithProducts, useGetUserProductsQuery } from "../api/users";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";

const columns: ColumnsType<{ id: number; name: string; products: any[] }> = [
  {
    title: "Код поставщика",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название компании",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Товары",
    dataIndex: "products",
    key: "products",
  },
];

interface IManufacturerPageProps {}

const ManufacturerPage: React.FunctionComponent<IManufacturerPageProps> = (
  props
) => {
  const params = useParams();
  const { data, isLoading } = useGetUserProductsQuery(Number(params.id));
  return (
    <main>
      Поставщик {params.id}
      {isLoading && <span>Загрузка...</span>}
      {data && (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={[
            {
              id: data!.id,
              name: data!.name,
              products: data!.products.map((product) => (
                <div>
                  <NavLink to={`/products/${product.id}`}>
                    <span>Id:{product.id}</span>
                    {"  "}
                    <span>{product.title}</span>
                  </NavLink>
                </div>
              )),
            },
          ]}
          pagination={false}
        />
      )}
    </main>
  );
};

export default ManufacturerPage;
