import axios from "axios";

export const makeGetRequest = async (
  url: string,
  headers = {},
  params = {}
) => {
  try {
    const response = await axios.get(url, {
      headers: {
        ...headers,
      },
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
