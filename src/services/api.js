import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getUsers = async (page = 1) => {
  return axios.get(`${API_URL}/users?page=${page}`);
};
export const updateUser = async (id, userData) => {
  return axios.put(`https://reqres.in/api/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return axios.delete(`https://reqres.in/api/users/${id}`);
};
