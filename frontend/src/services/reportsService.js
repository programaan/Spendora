import API from "../api/api";

export async function getReportsSummary(range = "all") {
  const res = await API.get(`reports/summary/?range=${range}`);
  return res.data;
}

export async function getMonthlyReport(range = "all") {
  const res = await API.get(`reports/monthly/?range=${range}`);
  return res.data;
}

export async function getCategoryReport(range = "all") {
  const res = await API.get(`reports/categories/?range=${range}`);
  return res.data;
}