import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Create an Axios instance
// const apiClient = axios.create({
//   baseURL: "http://localhost:8080/api/v1",
//   withCredentials: true,
// });

// Interceptor to handle token refresh logic
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = Cookies.get("refreshToken");

//       if (refreshToken !== null) {
//         try {
//           const response = await apiClient.post("/auth/refresh", {
//             token: refreshToken,
//           });
//           const newAccessToken = response.data.data.accessToken;
//           localStorage.setItem("token", newAccessToken);
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           console.error("Error refreshing token:", refreshError);
//           // Handle token refresh failure (e.g., redirect to login)
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const handleLogOut = async () => {
//   const token = localStorage.getItem("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   const response = await apiClient.delete("/auth/logout", { headers });
//   return response;
// };

const Homepage = () => {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // const getAllUsers = async () => {
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     const response = await apiClient.get("/users", { headers });
  //     const data = response.data.data;
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handleLoginClick = () => {
    navigate("/login", { replace: true });
  };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  return (
    <div>
      <button onClick={handleLoginClick}>Log In </button>
      {/* {users.map((user) => (
        <p key={user.id}>name: {user.name}</p>
      ))} */}
      {/* <button
        onClick={() => {
          handleLogOut();
        }}
      >
        Log Out
      </button> */}
    </div>
  );
};

export default Homepage;
