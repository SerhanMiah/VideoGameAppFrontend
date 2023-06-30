
import { Buffer } from 'buffer'

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

export const getPayload = () => {
  const token = getToken();
  console.log(token);
  if (!token) return null;
  const splitToken = token.split('.');
  if (splitToken.length !== 3) return null;
  return JSON.parse(Buffer.from(splitToken[1], 'base64').toString('utf-8'));
};

export const userIsAuthenticated = () => {
  const payload = getPayload();
  if (!payload) return false;
  const currentTime = Math.round(Date.now() / 1000);
  return currentTime < payload.exp;
};

export const userIsOwner = (item) => {
  const payload = getPayload();
  if (!payload) return false;
  return payload.sub === item.createdBy;
};
