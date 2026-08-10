import API from "../api/api";

export const getDashboardSummary = async () => {
  const response = await API.get("dashboard/summary/");
  return response.data;
};

export const getRecentTransactions = async () => {
  const response = await API.get("dashboard/recent-transactions/");
  return response.data;
};

export const getMonthlyChart = async () => {
  const response = await API.get("dashboard/monthly-chart/");
  return response.data;
};

export const getExpenseCategoryChart = async () => {
  const response = await API.get("dashboard/expense-category-chart/");
  return response.data;
};

export const getBudgetProgress = async () => {
  const response = await API.get("dashboard/budget-progress/");
  return response.data;
};