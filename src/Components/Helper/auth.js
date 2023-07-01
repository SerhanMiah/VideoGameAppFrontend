export const setToken = (token) => {
  window.localStorage.setItem('local-user-Token', token);
};

export const setId = (id) => {
  window.localStorage.setItem('local-user-Id', id);
};

export const getToken = () => {
  return window.localStorage.getItem('local-user-Token');
};

export const getId = () => {
  return window.localStorage.getItem('local-user-Id');
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo) => {
  const data = JSON.stringify(userInfo);
  window.localStorage.setItem('userInfo', data);
};

export const setUserSession = (token, userInfo) => {
  setToken(token);
  setUserInfo(userInfo);
};

export const clearUserSession = () => {
  window.localStorage.removeItem('local-user-Token');
  window.localStorage.removeItem('local-user-Id');
  window.localStorage.removeItem('userInfo');
};

export const userIsOwner = (item) => {
  const userInfo = getUserInfo();
  return userInfo && userInfo.userId === item.createdBy.toString();
};

export const userIsAuthenticated = () => {
  return getToken() !== null && getUserInfo() !== null;
};
