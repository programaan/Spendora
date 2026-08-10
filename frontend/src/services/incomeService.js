import API from "../api/api";

export const getIncome = async () => {
  const response = await API.get("income/");
  return response.data;
};

export const createIncome = async (data) => {
  const response = await API.post("income/", data);
  return response.data;
};

export const updateIncome = async (id, data) => {
  const response = await API.put(`income/${id}/`, data);
  return response.data;
};

export const deleteIncome = async (id) => {
  await API.delete(`income/${id}/`);
};