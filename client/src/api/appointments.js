import axios from "axios";

const API_URL = "http://localhost:3001/appointments";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAppointments = () => axios.get(API_URL, getAuthConfig());

export const getOneAppointment = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthConfig());

export const createAppointment = (data) => axios.post(API_URL, data);

export const deleteAppointment = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthConfig());

export const updateAppointment = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthConfig());
