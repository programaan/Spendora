import API from "../api/api";

export async function getBudgets() {
  const res = await API.get("budget/");
  return res.data;
}

export async function createBudget(data) {
  const res = await API.post("budget/", data);
  return res.data;
}

export async function updateBudget(id, data) {
  const res = await API.put(`budget/${id}/`, data);
  return res.data;
}

export async function deleteBudget(id) {
  await API.delete(`budget/${id}/`);
}