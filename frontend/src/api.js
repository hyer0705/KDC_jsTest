const API_ENDPOINT = "http://localhost:4001";
// "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

const REQUEST_ERROR = {
  500: { msg: "요청 실패!" },
};

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
    alert(error.msg);
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
