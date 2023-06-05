import * as React from "react";
import { useCreateProductMutation, useGetAllProductsQuery } from "../api/products";
import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../api/products";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usersSlice } from "../features/users/usersSlice";
import { useAppSelector } from "../store/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { isErrorWithMessage } from "../utils/is-error-with-message";

const newProductValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("title is required")
    .min(7, "Minimun length is 5")
    .max(20, "Maximunm length is 20"),
});

const newProductFormOptions = {
  resolver: yupResolver(newProductValidationSchema),
};

interface NewProductInputs {
  title: string;
}

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
    render: (val, rec) => {
      return (
        <NavLink key={rec.id} to={`/users/${val}`}>
          {val}
        </NavLink>
      );
    },
    onCell: (record, rowIndex) => {
      return {
        onClick: (ev) => {
          ev.stopPropagation();
        },
      };
    },
  },
];

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {
  const isUserLoggedIn = useAppSelector((state) => state.users.isAuthenticated);
  const [createProductMtn] = useCreateProductMutation()
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllProductsQuery();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [creationResult, setCreationResult] = useState("");
  const onNewProductSubmit: SubmitHandler<NewProductInputs> = (data) =>
    createProduct(data);
  const createProduct = async (data: NewProductInputs) => {
    try {
      //const response = (await instance.post("/users/register", data)).data;
      await createProductMtn(data.title).unwrap();
      setCreationResult("product created");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        setCreationResult(err.data.message);
      } else {
        setCreationResult("Неизвестная ошибка");
      }
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewProductInputs>(newProductFormOptions);
  return (
    <main>
      Products Page
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/products/${record.id}`);
            },
          };
        }}
      />
      <button
        style={{ display: "block", marginLeft: "auto", width: "fit-content" }}
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        Добавить товар
      </button>
      <Modal
        title="Добавление товара"
        style={{ top: 20, right: 20, margin: 0, marginLeft: "auto" }}
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
        }}
        footer={[]}
      >
        <form
          className="add-product-form"
          onSubmit={handleSubmit(createProduct)}
        >
          {isUserLoggedIn ? (
            <label>
              <input
                type="text"
                placeholder="Название товара"
                {...register("title")}
                style={{ borderColor: errors.title ? "red" : "black" }}
              />
            </label>
          ) : (
            <span>Для добавления товара войдите в аккаунт</span>
          )}
          <button disabled={!isUserLoggedIn}>Ok</button>
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              setIsAddModalOpen(false);
            }}
          >
            Cancel
          </button>
          <span>{creationResult}</span>
        </form>
      </Modal>
    </main>
  );
};

export default ProductsPage;
