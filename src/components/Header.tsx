import * as React from "react";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { instance } from "../api/instance";
import { AxiosError } from "axios";
import { useRegisterUserMutation } from "../api/users";
import { isErrorWithMessage } from "../utils/is-error-with-message";

interface IHeaderProps {}

interface Inputs {
  email: string;
  confirmedEmail: string;
  name: string;
  password: string;
  confirmedPassword: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [registerUserRtq] = useRegisterUserMutation();
  const registerUser = async (data: Inputs) => {
    try {
      //const response = (await instance.post("/users/register", data)).data;
      await registerUserRtq({
        email: data.email,
        name: data.name,
        password: data.password,
      }).unwrap();
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
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [registerResult, setRegisterResult] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => registerUser(data);

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
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(formOptions);
  return (
    <header className="header">
      <div className="container header-container">
        <span>Продукция поставщиков</span>
        <div className="header-register">
          <button
            onClick={() => {
              setModal1Open(true);
            }}
          >
            Регистрация
          </button>
          <button>Вход</button>
        </div>
        <Modal
          title="Регистрация поставищика"
          style={{ top: 20, right: 20, margin: 0, marginLeft: "auto" }}
          open={modal1Open}
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
      </div>
    </header>
  );
};

export default Header;
