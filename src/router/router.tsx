import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import ProductsPage from "../pages/ProductsPage";
import { Navigate } from "react-router-dom";
import ManufacturerPage from "../pages/ManufacturerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/products" />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <span>Страница товара</span>,
      },
      {
        path: "/users/:id",
        element: <ManufacturerPage />,
      },
    ],
  },
]);
