import React from "react";
import clsx from "clsx";

//css
import styles from "../../sass/pages/Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { loginForm } from "../../actions/manageUser";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: onchange });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerList } = useSelector((state) => state.manageUser);

  return (
    <div className={clsx(styles.formBody)}>
      <ToastContainer />
      <div className={clsx(styles.formContainer)}>
        <p className={clsx(styles.title)}>Login</p>
        <form
          className={clsx(styles.form)}
          onSubmit={handleSubmit((value) => {
            try {
              const res = registerList?.findIndex(
                (account) =>
                  account?.info.taiKhoan === value.taiKhoan &&
                  account?.info.matKhau === value.matKhau
              );
              if (res !== -1) {
                toast.success("Bạn đã đăng nhập thành công", {
                  theme: "colored",
                });
                dispatch(loginForm({ user: value, index: res }));
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              } else {
                toast.error("Tài khoản hoặc mật khẩu không đúng", {
                  theme: "colored",
                });
              }
            } catch (err) {
              console.log(err);
            }
          })}
        >
          <div className={clsx(styles.inputGroup)}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              {...register("taiKhoan", {
                required: "Vui lòng nhập tài khoản !",
                maxLength: {
                  value: 14,
                  message: "Tài khoản vượt quá độ dài 14 ký tự !",
                },
                minLength: {
                  value: 4,
                  message: "Tài khoản có độ dài nhỏ hơn 4 ký tự !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.taiKhoan?.message}
            </p>
          </div>
          <div className={clsx(styles.inputGroup)}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              {...register("matKhau", {
                required: "Vui lòng nhập mật khẩu !",
                maxLength: {
                  value: 16,
                  message: "Mật khẩu vượt quá độ dài 16 ký tự !",
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu có độ dài nhỏ hơn 8 ký tự !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.matKhau?.message}
            </p>
          </div>
          <input
            type="submit"
            defaultValue="Sign in"
            className={clsx(styles.sign, " cursor-pointer")}
          />
        </form>
        <p className={clsx(styles.signup)}>
          Don't have an account?
          <a
            href="/register"
            className="ml-2 text-lg text-white hover:text-red-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
