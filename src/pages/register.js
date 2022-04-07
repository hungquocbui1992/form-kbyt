import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    error: {
      username: undefined,
      email: undefined,
      password: undefined,
      confirm: undefined,
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      error: {
        username: undefined,
        email: undefined,
        password: undefined,
        confirm: undefined,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {
      username: undefined,
      email: undefined,
      password: undefined,
      confirm: undefined,
    };

    if (form.username === "") {
      error.username = "Required";
    } else {
      if (!form.username.match(/^.{5,20}$/)) {
        error.username = "Username từ 5-20 kí tự!";
      }
    }
    if (form.email === "") {
      error.email = "Required";
    } else {
      if (
        !form.email.match(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
      ) {
        error.email = "Email dạng abc@gmail.com!";
      }
    }
    if (form.password === "") {
      error.password = "Required";
    } else {
      if (form.password.length < 8) {
        error.password = "Password > 8 kí tự";
      }
    }
    if (form.confirm === "") {
      error.confirm = "Required";
    } else {
      if (!form.password.match(form.confirm)) {
        error.confirm = "Phải trùng với password";
      }
    }

    setForm({ ...form, error: error });
  };


  return (
    <div className="bg-violet-400 min-h-screen flex justify-center items-center">
      <div className="border p-5 w-[500px]">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-center font-semibold text-2xl">SIGN UP</h1>
          <div className="mt-3">
            <label className="" htmlFor="">
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              className={`block px-5 py-1 outline-none w-full ${
                form.error.username && "border border-red-600"
              }`}
            />
            {form.error.username && (
              <p className="text-red-600">{form.error.username}</p>
            )}
          </div>
          <div className="mt-3">
            <label className="" htmlFor="">
              Email
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              className={`block px-5 py-1 outline-none w-full ${
                form.error.email && "border border-red-600"
              }`}
            />
            {form.error.email && (
              <p className="text-red-600">{form.error.email}</p>
            )}
          </div>
          <div className="mt-3">
            <label className="" htmlFor="">
              Password
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="password"
              className={`block px-5 py-1 outline-none w-full ${
                form.error.password && "border border-red-600"
              }`}
            />
            {form.error.password && (
              <p className="text-red-600">{form.error.password}</p>
            )}
          </div>
          <div className="mt-3">
            <label className="" htmlFor="">
              Confirm password
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="confirm"
              className={`block px-5 py-1 outline-none w-full ${
                form.error.confirm && "border border-red-600"
              }`}
            />
            {form.error.confirm && (
              <p className="text-red-600">{form.error.confirm}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-1 w-full mt-3 bg-gradient-to-r from-blue-400 to-red-400 text-gray-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;