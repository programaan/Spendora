import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import BudgetProgress from "../components/dashboard/BudgetProgress";

import { Wallet, IndianRupee, Receipt, PiggyBank } from "lucide-react";

import { getDashboardSummary } from "../services/dashboardService";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Dashboard() {

  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    savings: 0,
    total_budget: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchSummary() {
      try {
        const data = await getDashboardSummary();

        if (mounted) {
          setSummary(data);
        }
      } 
      catch (err) {
        console.error(err);

        if (mounted) {
          toast.error("Unable to load dashboard.");
        }
      } 
      finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchSummary();

    return () => {
      mounted = false;
    };
  }, []);

if (loading) {

  return (

    <DashboardLayout>
      <Loader />
    </DashboardLayout>

  );

}

return (
  <>

     <Helmet>
        <title>Dashboard | Spendora</title>
        <meta
          name="description"
          content="View your financial dashboard, income, expenses, budgets, and spending insights in Spendora."
        />
      </Helmet>

    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Get an overview of your finances.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Balance"
          amount={summary.balance}
          icon={Wallet}
          color="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
        />

        <StatsCard
          title="Income"
          amount={summary.total_income}
          icon={IndianRupee}
          color="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
        />

        <StatsCard
          title="Expenses"
          amount={summary.total_expense}
          icon={Receipt}
          color="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
        />

        <StatsCard
          title="Savings"
          amount={summary.savings}
          icon={PiggyBank}
          color="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
        />

      </section>

      <section className="mt-8 grid min-w-0 gap-6 md:grid-cols-2">
        <IncomeExpenseChart />
        <ExpensePieChart />
      </section>

      <section className="mt-8 grid min-w-0 items-start gap-6 md:grid-cols-2">
        <RecentTransactions />
        <BudgetProgress />
      </section>

    </DashboardLayout>
    
  </>
  
);

}

export default Dashboard;