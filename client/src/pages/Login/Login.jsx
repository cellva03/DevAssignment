import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [passwordErr, setPasswordErr] = useState("");

  const onSubmit = (data) => {
    if (data.password !== data.confirm_password) {
      setPasswordErr("Password not match");
    } else {
      setPasswordErr("");

      fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            window.location.href = "/register";
          }
        });
    }
  };
  return (
    <div className="form_container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="Fist Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div className="form_group">
          <input
            type={"email"}
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="User Name"
            {...register("userName", { required: true })}
          />
          {errors.userName && <span>This field is required</span>}
        </div>
        <div className="form_group">
          <input
            type={"password"}
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              validate: (value) => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                    pattern.test(value)
                  ) ||
                  "Password must have at least one uppercase, one lowercase, one number and one special case character"
                );
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form_group">
          <input
            type={"password"}
            placeholder="Password"
            {...register("confirm_password", { required: true })}
          />
          {(errors.confirm_password && <span>This field is required</span>) ||
            (passwordErr && <span>Password MisMatch</span>)}
        </div>
        <div className="submit_btn">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
      <div className="signup_link">
        If you don't have account
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Login;
