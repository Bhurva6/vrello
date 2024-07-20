// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: token },
  });
};

export const createTask = async (task, token) => {
  return axios.post(API_URL, task, {
    headers: { Authorization: token },
  });
};

export const updateTask = async (id, task, token) => {
  return axios.put(`${API_URL}/${id}`, task, {
    headers: { Authorization: token },
  });
};

export const deleteTask = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: token },
  });
};
