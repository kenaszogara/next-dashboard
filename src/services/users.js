import { api } from './api';

export const getUser = () => {
  api.get(`users/`);
};

export const createUser = (body) => {
  api.post(`users/`, body);
};

export const editUser = (id, body) => {
  api.put(`users/${id}`, body);
};

export const destroy = (id) => {
  api.delete(`users/${id}`);
};
