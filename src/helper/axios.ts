import base from "axios";

export const createInstance = ({ API_KEY, USER_KEY }) => {
  const axios = base.create({ baseURL: "https://api.trello.com" });

  axios.interceptors.request.use((config) => {
    config.params = {
      key: API_KEY,
      token: USER_KEY,
    };
    return config;
  });

  return axios;
};
