import React, { useState, useEffect } from "react";
// import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { red } from "@mui/material/colors";
// import * as Cookies from

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "email is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    console.log(formErrors);
    // }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios
        .post("http://localhost:8080/api/v1/auth/login", user, config)
        .then((res) => {
          if (typeof window !== "undefined")
            localStorage.setItem("token", res.data.data.accessToken);
          // console.log(res.data.data.accessToken);
          navigate("/Homepage", { replace: true });
        });
      // if (typeof window !== "undefined")
      //   localStorage.setItem("token", 'da dang nhap');
      // navigate("/Homepage", { replace: true });
    }
  }, [formErrors]);

  return (
    <div className={loginstyle.container}>
      <div className={loginstyle.login}>
        <form>
          <h1 style={{ color: "#1890ff" }}>Login</h1>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={loginstyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={loginstyle.error}>{formErrors.password}</p>
          <button className={loginstyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
        <NavLink to="/signup">Not yet registered ? Register Now</NavLink>
      </div>
    </div>
  );
};
export default Login;
