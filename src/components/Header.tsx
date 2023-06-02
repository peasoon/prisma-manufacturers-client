import * as React from "react";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { instance } from "../api/instance";
import { AxiosError } from "axios";
import { useLoginUserMutation, useRegisterUserMutation } from "../api/users";
import { isErrorWithMessage } from "../utils/is-error-with-message";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { usersSlice } from "../features/users/usersSlice";

interface IHeaderProps {}

interface Inputs {
  email: string;
  confirmedEmail: string;
  name: string;
  password: string;
  confirmedPassword: string;
}

interface LoginInputs {
  email: string;
  password: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const user = useAppSelector((state) => state.users.user?.name);
  const dispatch = useAppDispatch();
  const [registerUserRtq] = useRegisterUserMutation();
  const [loginUserRtq] = useLoginUserMutation();
  const registerUser = async (data: Inputs) => {
    try {
      //const response = (await instance.post("/users/register", data)).data;
      const { token } = await registerUserRtq({
        email: data.email,
        name: data.name,
        password: data.password,
      }).unwrap();
      localStorage.setItem("token", token);
      setRegisterResult("User successfully registered");
    } catch (err) {
      // if (err instanceof AxiosError) {
      //   console.log(err.response?.data.message);
      //   setRegisterResult(err.response?.data.message);
      // } else setRegisterResult("Error");
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        setRegisterResult(err.data.message);
      } else {
        setRegisterResult("Неизвестная ошибка");
      }
    }
  };
  const loginUser = async (data: LoginInputs) => {
    try {
      const { token } = await loginUserRtq(data).unwrap();
      localStorage.setItem("token", token);
      setLoginResult("User successfully logedin");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        setLoginResult(err.data.message);
      } else {
        setLoginResult("Неизвестная ошибка");
      }
    }
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [registerResult, setRegisterResult] = useState("");
  const [loginResult, setLoginResult] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => registerUser(data);
  const onLoginSubmit: SubmitHandler<LoginInputs> = (data) => loginUser(data);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    confirmedEmail: Yup.string()
      .oneOf([Yup.ref("email")], "Emails don't match!")
      .required("Required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Minimun length is 7")
      .max(20, "Maximunm length is 20"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match!")
      .required("Required"),
  });

  const validationLoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Minimun length is 7")
      .max(20, "Maximunm length is 20"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const loginFormOptions = { resolver: yupResolver(validationLoginSchema) };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(formOptions);
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    watch: watchLogin,
    formState: { errors: loginErrors },
  } = useForm<Inputs>(loginFormOptions);
  return (
    <header className="header">
      <div className="container header-container">
        <span>Продукция поставщиков</span>
        <span>Вы вошли как {user ? user : "Гость"}</span>
        <div className="header-register">
          <button
            onClick={() => {
              setModal1Open(true);
            }}
          >
            Регистрация
          </button>
          {!user ? (
            <button
              onClick={() => {
                setModal2Open(true);
              }}
            >
              Вход
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(usersSlice.actions.logout());
                localStorage.removeItem("token");
              }}
            >
              Выход
            </button>
          )}
        </div>
        <Modal
          title="Регистрация поставищика"
          style={{ top: 20, right: 20, margin: 0, marginLeft: "auto" }}
          open={modal1Open}
          onCancel={() => {
            setModal1Open(false);
          }}
          footer={[]}
        >
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <input
                type="text"
                placeholder="E-mail"
                {...register("email")}
                style={{ borderColor: errors.email ? "red" : "black" }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Повторите e-mail"
                {...register("confirmedEmail")}
                style={{ borderColor: errors.confirmedEmail ? "red" : "black" }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Ноазвание помпании"
                {...register("name")}
                style={{ borderColor: errors.name ? "red" : "black" }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Пароль"
                {...register("password")}
                style={{ borderColor: errors.password ? "red" : "black" }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Повторите пароль"
                {...register("confirmedPassword")}
                style={{
                  borderColor: errors.confirmedPassword ? "red" : "black",
                }}
              />
            </label>
            <button>Ok</button>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setModal1Open(false);
              }}
            >
              Cancel
            </button>
            <span>{registerResult}</span>
          </form>
        </Modal>
        <Modal
          title="Аутентификация"
          style={{ top: 20, right: 20, margin: 0, marginLeft: "auto" }}
          open={modal2Open}
          onCancel={() => {
            setModal2Open(false);
          }}
          footer={[]}
        >
          <form
            className="login-form"
            onSubmit={handleSubmitLogin(onLoginSubmit)}
          >
            <label>
              <input
                type="text"
                placeholder="E-mail"
                {...registerLogin("email")}
                style={{ borderColor: loginErrors.email ? "red" : "black" }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Пароль"
                {...registerLogin("password")}
                style={{ borderColor: loginErrors.password ? "red" : "black" }}
              />
            </label>
            <button>Ok</button>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setModal2Open(false);
              }}
            >
              Cancel
            </button>
            <span>{loginResult}</span>
          </form>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
