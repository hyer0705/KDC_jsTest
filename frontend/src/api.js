// const API_ENDPOINT = "http://localhost:4001";
// "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

import config from "./config.js";
import error from "./error.js";

const { API_ENDPOINT } = config;

const { REQUEST_ERROR } = error;

const request = async (url) => {
  // return fetch(url).then((res) => res.json());

  try {
    const result = await fetch(url);

    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    return { data: null };
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;
