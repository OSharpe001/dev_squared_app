import axios from 'axios';

const BASE_URL = "http://localhost:5011";

export const fetchFromAPI = async (url, options) => {
  const { data } = await axios.get(BASE_URL + url, options);
  return data;
};

export const postToAPI = async (url, ...options) => {
  const { data } = await axios.post(BASE_URL + url, options);
  return data;
};
export const deleteFromAPI = async (url, options) => {
  const { data } = await axios.delete(BASE_URL + url, options);
  return data;
};