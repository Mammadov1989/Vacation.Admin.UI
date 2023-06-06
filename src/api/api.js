import axios from "axios";
import { BASE_URL } from "../constant/baseUrl";
import { getRefreshToken, getToken } from "../utils/auth.utils";

const options = () => ({
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + getToken(),
  },
});

export default {
  auth: {
    getPagination: async (offset, limit) => {
      return await axios
        .get(
          `/api/UserLogging/getpagination??Offset=${offset}&Limit=${limit}`,
          options()
        )
        .then((res) => res.data);
    },
    getUserLoggingBySearch: async (keyword, operation, offset, limit) => {
      return await axios
        .get(
          `/api/UserLogging/getpagination?search=${keyword}&Operation=${operation}&Offset=${offset}&Limit=${limit}`,
          options()
        )
        .then((res) => res.data);
    },
    signin: async (data) => {
      console.log("URL", `${BASE_URL}/api/account/auth`);
      return await axios.post(`${BASE_URL}/api/account/auth`, data);
    },
    signout: async () => {
      const requestData = {
        refresh_token: getRefreshToken(),
        grant_type: "sign_out",
      };
      return await axios.post(`${BASE_URL}/api/account/signout`, requestData, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
    },
  },

  department: {
    getAllDepartments: async () => {
      return await axios
        .get(`${BASE_URL}/api/Department/GetAll`, options())
        .then((res) => res.data);
    },
    post: async (requestData) => {
      return await axios
        .post(`${BASE_URL}/api/Department`, requestData, options())
        .then((res) => res.data);
    },
    put: async (requestData) => {
      return await axios
        .put(`${BASE_URL}/api/Department`, requestData, options())
        .then((res) => res.data);
    },
  },
};
