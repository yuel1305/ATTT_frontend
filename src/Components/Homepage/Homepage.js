// import React, { useState, useEffect, useRef } from "react";
// // import basestyle from "../Base.module.css";
// import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";
// const Homepage = () => {
//   const [users, setUsers] = useState([]);
//   //   async function getUser() {
//   //     const token = localStorage.getItem("token");
//   //     const headers = {
//   //       Authorization: `Bearer ${token}`,
//   //     };

//   //     try {
//   //       const response = await axios.get(`http://localhost:8080/api/v1/users`, {
//   //         headers: headers,
//   //       });
//   //       const data = response.data.data;
//   //       setUsers(data);
//   //       console.log(data);
//   //       return data;
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   }

//   //   useEffect(() => {
//   //     const fetchData = async () => {
//   //       await getUser();
//   //     };
//   //     fetchData();
//   //     console.log("data", users);
//   //   }, []);

//   const useDidMountEffect = (func, deps) => {
//     const didMount = useRef(false);

//     useEffect(() => {
//       if (didMount.current) {
//         func();
//       } else {
//         didMount.current = true;
//       }
//     }, [deps]);
//   };

//   async function getAllUsers() {
//     const token = localStorage.getItem("token");
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(`http://localhost:8080/api/v1/users`, {
//         headers: headers,
//       });
//       const data = response.data.data;
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useDidMountEffect(() => {
//     const fetchData = async () => {
//       await getAllUsers();
//     };
//     fetchData();
//     // console.log(users);
//   }, [users]);

//   return (
//     <div>
//       {users.map((user) => {
//         return(
// <p>name: {user.name}</p>

//         )

//       })}
//     </div>
//   );
// };

// export default Homepage;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Interceptor to handle token refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log(originalRequest);
    if (
      error.response.status === 401
      // !originalRequest._retry
    ) {
      // originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      console.log("refresh token", refreshToken);
      if (refreshToken !== "error") {
        try {
          
          const response = await axios.post(
            "http://localhost:8080/api/v1/auth/refresh",
          );
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem("token", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log("new accessToken", newAccessToken);
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Handle token refresh failure (e.g., redirect to login)
        }
      }
    }
    return Promise.reject(error);
  }
);

const getCookie = (name) => {
  const refreshToken = Cookies.get(name);
  return refreshToken;
};

const Homepage = () => {
  const [users, setUsers] = useState([]);

  async function getAllUsers() {
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
  }

  // async function refresh() {
  //   // const token = localStorage.getItem("token");
  //   // const headers = {
  //   //   Authorization: `Bearer ${token}`,
  //   // };
  //   try {
  //     const response = await apiClient.post("/auth/refresh");
  //     const data1 = response.data.data;
  //     console.log(data1);
  //     // setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData();
    // refresh();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>name: {user.name}</p>
      ))}
    </div>
  );
};

export default Homepage;
