import API from "../api/api";

export const getExpenses = async () => {
  const response = await API.get("expense/");
  return response.data;
};

export const createExpense = async (data) => {
  const response = await API.post("expense/", data);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await API.put(`expense/${id}/`, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`expense/${id}/`);
  return response.data;
};