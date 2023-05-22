import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/trip",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// import axios from "axios";

// const AxiosInst = axios.create({
//   baseURL: "http://localhost:8080/trip",
// });

// AxiosInst.interceptors.request.use((config) => {
//   config.headers.authorization = "token";
//   config.headers["Access-Control-Allow-Origin"] = "*"; // CORS 설정(모든 리소스 허용)
//   return config;
// });

// export default AxiosInst;
