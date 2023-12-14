import axios from 'axios';

const base_url = 'http://10.0.2.2:3000/api/v1';

export const postService = async (endpoint, request) => {
  try {
    const res = await axios.post(`${base_url}${endpoint}`, request);
    if (!res.data.success) {
      return new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const getService = async (endpoint, header) => {
  try {
    const res = await axios({
      url: `${base_url}${endpoint}`,
      method: 'GET',
      headers: header,
    });
    if (!res.data.success) {
      return new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
