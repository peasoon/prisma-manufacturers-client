import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import Layout from "./components/Layout.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {RouterProvider} from 'react-router-dom'
import { router } from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <Layout> */}
      <Provider store={store}>
        {/* <App /> */}
        <RouterProvider router={router}/>
      </Provider>
    {/* </Layout> */}
  </React.StrictMode>
);
