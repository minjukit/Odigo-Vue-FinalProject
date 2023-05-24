import axios from "axios";
import store from "@/store/index"
import Constant from "@/common/Constant";

const axiosObj = axios.create({
  baseURL: "http://localhost:8080/trip",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "REFRESH_TOKEN": "noneToken",
  },
})
axiosObj.interceptors.request.use((config)=>{
  console.log('axios intercepter before!!')
  console.log(store.state)
  const token = store.state.accessToken
  config.headers.ACCESS_TOKEN = token ? token : "";
return  config;
});

axiosObj.interceptors.response.use(
  (response)=>{
    return response
  },
  (error) => {
    if (error.response.status == 403) {
      store.commit(Constant.CHECK_REFRESH_TOKEN_MUTATION)
      console.log("refresh")
    }
    return Promise.reject(error)
  },
);

export default axiosObj;

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
