/* eslint-disable no-useless-concat */
/* eslint-disable no-useless-escape */

import React from "react";
import clsx from "clsx";

//css
import styles from "../../sass/pages/Register.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { registerForm } from "../../actions/manageUser";
const Register = () => {
  const { registerList } = useSelector((state) => state.manageUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: onchange });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={clsx(styles.formBody)}>
      <ToastContainer />
      <form
        className={clsx(styles.form)}
        onSubmit={handleSubmit((value) => {
          try {
            const res = registerList?.find(
              (account) =>
                account?.info.taiKhoan === value.taiKhoan ||
                account?.info.email === value.email
            );
            if (!res) {
              toast.success("Bạn đã đăng ký thành công", { theme: "colored" });
              dispatch(
                registerForm({ info: value, favorSong: [], favorPlayList: [] })
              );
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            } else {
              toast.error("Tài khoản hoặc email đã tồn tại", {
                theme: "colored",
              });
            }
          } catch (err) {
            console.log(err);
          }
        })}
      >
        <span className={clsx(styles.signup)}>Sign Up</span>
        <div className="w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={clsx(styles.formInput)}
            {...register("taiKhoan", {
              required: "Vui lòng nhập tài khoản !",
              pattern: {
                value: /^\w[\w.]{2,12}\w$/,
                message: "Tài khoản khởi tạo không hợp lệ !",
              },
              maxLength: {
                value: 14,
                message: "Tài khoản khởi tạo vượt quá độ dài 14 ký tự !",
              },
              minLength: {
                value: 4,
                message: "Tài khoản khởi tạo có độ dài nhỏ hơn 4 ký tự !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.taiKhoan?.message}
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className={clsx(styles.formInput)}
            {...register("email", {
              required: "Vui lòng nhập email !",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email khởi tạo không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.email?.message}
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={clsx(styles.formInput)}
            {...register("matKhau", {
              required: "Vui lòng nhập mật khẩu !",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                message: "Mật khẩu khởi tạo không hợp lệ !",
              },
              maxLength: {
                value: 16,
                message: "Mật khẩu khởi tạo vượt quá độ dài 16 ký tự !",
              },
              minLength: {
                value: 8,
                message: "Mật khẩu khởi tạo có độ dài nhỏ hơn 8 ký tự !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.matKhau?.message}
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="phone-number">Phone number</label>
          <input
            className={clsx(styles.formInput)}
            name="phone-number"
            placeholder="Phone number"
            id="phone-number"
            type="text"
            {...register("soDt", {
              required: "Vui lòng nhập số điện thoại !",
              pattern: {
                value: /^[0-9]+$/,
                message: "Số điện thoại khởi tạo không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.soDt?.message}
          </p>
        </div>
        <input
          type="submit"
          value="Sign up"
          className={clsx(styles.formSubmit)}
        />
        <p className={clsx(styles.signup)}>
          Have an account?
          <a
            href="/login"
            className="ml-2 text-lg text-black hover:text-red-500"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
