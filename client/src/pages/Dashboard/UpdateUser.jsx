import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({});
  const params_id = window.location.pathname.split("/")[2];

  const onSubmit = (data) => {
    fetch(`http://localhost:3001/api/users/${params_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          window.location.href = "/dashboard";
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${params_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);
  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="First Name"
            {...register("firstName", { required: true })}
            defaultValue={user.firstName}
          />
        </div>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            defaultValue={user.lastName}
          />
        </div>
        <div className="form_group">
          <input
            type={"email"}
            placeholder="Email"
            {...register("email", { required: true })}
            defaultValue={user.email}
          />
        </div>
        <div className="form_group">
          <input
            type={"text"}
            placeholder="User Name"
            {...register("userName", { required: true })}
            defaultValue={user.userName}
          />
        </div>
        <div className="form_group">
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
