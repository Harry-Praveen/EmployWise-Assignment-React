export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
//here
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
