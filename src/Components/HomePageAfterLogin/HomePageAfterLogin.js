import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import BasicTable from "./table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// Interceptor to handle token refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken !== null) {
        try {
          const response = await apiClient.post("/auth/refresh", {
            token: refreshToken,
          });
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem("token", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Handle token refresh failure (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

const HomepageAfterLogin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await apiClient.get("/users", { headers });
      const data = response.data.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //   const handleLoginClick = () => {
  //     navigate("/login", { replace: true });
  //   };

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiClient.delete("/auth/logout", { headers });
    navigate("/", { replace: true });
    localStorage.removeItem("token");

    return response;
  };

  const handleReturn = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      {/* <button onClick={handleLoginClick}>Log In </button> */}
      {localStorage.getItem("token") ? (
        <div>
          {/* {users.map((user) => (
            <p key={user.id}>name: {user.name}</p>
          ))} */}
          <BasicTable datas={users}></BasicTable>
          {/* <button onClick={handleLogOut}>Log Out</button> */}
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleLogOut}>
              Log Out
            </Button>
          </Stack>
        </div>
      ) : (
        <div>
          <div>Bạn không có quyền truy cập</div>
          {/* <button onClick={handleReturn}>Return</button> */}
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleReturn}>
              Return
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default HomepageAfterLogin;
