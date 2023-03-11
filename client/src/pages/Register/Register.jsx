import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:3001/api/login", {
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
          localStorage.setItem("userData", JSON.stringify(data.data));
          window.location.href = "/dashboard";
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <div className="form_container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="Email or Username"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
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
          {errors.password && <span>{errors.firstName.message}</span>}
        </div>
        <div className="submit_btn">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
      <div className="signup_link">
        Already have account
        <Link to={"/"}>Register</Link>
      </div>
    </div>
  );
};

export default Register;
