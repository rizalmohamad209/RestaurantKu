import React from "react";
import { useHistory, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import {
  LayoutOne,
  Card,
  FormControl,
  InputText,
  Button,
  InputPassword,
} from "upkit";
import { useForm } from "react-hook-form";
const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Signup() {
  let history = useHistory();
  let [status, setStatus] = React.useState(statuslist.idle);
  let {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (formData) => {
    let { data } = await registerUser(formData);
    if (data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statuslist.error);
      return;
    }
    setStatus(statuslist.process);
    history.push("/signup/sukses");
  };
  return (
    <div>
      <LayoutOne size="small">
        <Card color="white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputText
                name="full_name"
                placeholder="Nama Lengkap"
                fitContainer
                {...register("full_name", {
                  required: "Full Name harus di isi!",
                  maxLength: {
                    value: 500,
                    message: "Maksimal karakter full name adalah 500",
                  },
                })}
              />

              {errors.full_name && (
                <p style={{ color: "#bf1650" }}>{errors.full_name.message}</p>
              )}
            </FormControl>
            <FormControl>
              <InputText
                name="username"
                placeholder="Masukan username anda"
                fitContainer
                {...register("username", {
                  required: "username harus di isi!",
                  maxLength: {
                    value: 500,
                    message: "Maksimal karakter username adalah 500",
                  },
                })}
              />

              {errors.username && (
                <p style={{ color: "#bf1650" }}>{errors.username.message}</p>
              )}
            </FormControl>
            <FormControl>
              <InputText
                name="email"
                placeholder="Email"
                fitContainer
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
                name="password"
                placeholder="Your Password"
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
            <Button
              size="large"
              fitContainer
              disabled={status === statuslist.process}
            >
              {status === statuslist.process ? "Sedang memproses" : "Mendaftar"}
            </Button>
          </form>
          <div className="text-center mt-2">
            Sudah punya akun?{" "}
            <Link to="/signin">
              {" "}
              <b> Masuk Sekarang.</b>{" "}
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
