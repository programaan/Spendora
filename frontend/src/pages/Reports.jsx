import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import ReportsSummary from "../components/reports/ReportsSummary";
import ReportsCharts from "../components/reports/ReportsCharts";
import ReportsFilter from "../components/reports/ReportsFilter";

import { getReportsSummary, getMonthlyReport, getCategoryReport } from "../services/reportsService";
import { getIncome } from "../services/incomeService";
import { getExpenses } from "../services/expenseService";
import { getBudgets } from "../services/budgetService";

import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";

import { Button } from "@/components/ui/button";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Reports() {

  const [range, setRange] = useState("all");

  const [summary, setSummary] = useState(null);

  const [monthlyData, setMonthlyData] = useState({income: [], expense: []});

  const [categoryData, setCategoryData] = useState([]);

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      const [
        summaryRes,
        monthlyRes,
        categoryRes,
        incomeRes,
        expenseRes,
        budgetRes,
      ] = await Promise.all([
        getReportsSummary(range),
        getMonthlyReport(range),
        getCategoryReport(range),
        getIncome(),
        getExpenses(),
        getBudgets(),
      ]);

      setSummary(summaryRes);
      setMonthlyData(monthlyRes);
      setCategoryData(categoryRes);

      setIncome(incomeRes);
      setExpenses(expenseRes);
      setBudgets(budgetRes);
    } 
    catch (err) {
      console.error(err);

      toast.error("Unable to load reports.");
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadReports();
  }, [range]);

if (loading) {
  return (

    <DashboardLayout>
      <Loader />
    </DashboardLayout>

  );
}

  function handleExportPDF() {
    try {
      exportPDF(
        income,
        expenses,
        budgets
      );

      toast.success("PDF exported successfully.");
    } 
    catch (err) {
      console.error(err);
      toast.error("Unable to export PDF.");
    }
  }

  function handleExportExcel() {
    try {
      exportExcel(
        income,
        expenses,
        budgets
      );

      toast.success("Excel exported successfully.");
    } 
    catch (err) {
      console.error(err);
      toast.error("Unable to export Excel.");
    }
  }

return (
  <>

      <Helmet>
        <title>Reports | Spendora</title>

        <meta
          name="description"
          content="View financial reports and spending analytics in Spendora."
        />
      </Helmet>

      <DashboardLayout>
        <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
         
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reports
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Analyze your income and expenses.
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>

            <Button
              className="flex-1 rounded-xl"
              onClick={handleExportExcel}
            >
              Export Excel
            </Button>
          </div>
        </section>

        <ReportsSummary
          summary={summary}
        />

        <ReportsFilter
          range={range}
          setRange={setRange}
        />

        <ReportsCharts
          monthlyData={monthlyData}
          categoryData={categoryData}
        />
      </DashboardLayout>
      
  </>
);

}

export default Reports;