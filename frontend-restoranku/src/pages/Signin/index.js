import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import jwt from "jwt-decode";

import {
  LayoutOne,
  Card,
  Button,
  InputPassword,
  InputText,
  FormControl,
} from "upkit";
import { userLogin } from "../../features/Auth/actions";
import { login } from "../../api/auth";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const [status, setStatus] = useState(statuslist.idle);
  const onSubmit = async ({ email, password }) => {
    let { data } = await login(email, password);
    console.log("====================================");
    console.log(data);
    console.log("====================================");

    if (data.error) {
      setError("password", {
        type: "invalidCredential",
        message: data.message,
      });
      setStatus(statuslist.error);
    } else {
      let { token } = data.data;
      const user = jwt(token);
      console.log("====================================");
      console.log(user);
      console.log("====================================");
      dispatch(userLogin(user, token));
      history.push("/");
    }
  };
  return (
    <div>
      <LayoutOne size="small">
        <br />
        <Card color="white">
          <div className="text-center mb-5"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputText
                placeholder="email"
                fitContainer
                name="email"
                {...register("email", {
                  required: "email harus di isi!",
                  maxLength: {
                    value: 500,
                    message: "Maksimal karakter email adalah 500",
                  },
                  pattern: {
                    value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
                    message: "Email tidak valid",
                  },
                })}
              />
              {errors.email && (
                <p style={{ color: "#bf1650" }}>{errors.email.message}</p>
              )}
            </FormControl>
            <FormControl>
              <InputPassword
                placeholder="password"
                name="password"
                fitContainer
                {...register("password", {
                  required: "Password harus di isi!",
                  maxLength: {
                    value: 500,
                    message: "Maksimal karakter password adalah 500",
                  },
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                })}
              />
              {errors.password && (
                <p style={{ color: "#bf1650" }}>{errors.password.message}</p>
              )}
            </FormControl>
            <Button fitContainer size="large" disabled={status === "process"}>
              Login
            </Button>
          </form>
          <div className="text-center mt-2">
            Belum punya akun?{" "}
            <Link to="/signup">
              <b>Daftar sekarang.</b>
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
