import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import BudgetSummary from "../components/budget/BudgetSummary";
import BudgetDialog from "../components/budget/BudgetDialog";
import BudgetFilters from "../components/budget/BudgetFilters";
import BudgetTable from "../components/budget/BudgetTable";

import { getBudgets } from "../services/budgetService";
import { getExpenses } from "../services/expenseService";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Budget() {

  const [budget, setBudget] = useState([]);

  const [expense, setExpense] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingBudget, setEditingBudget] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("Newest");

  async function refreshBudget() {

    try {
      const [budgetData, expenseData] = await Promise.all([
        getBudgets(),
        getExpenses(),
      ]);

      setBudget(budgetData);
      setExpense(expenseData);
    }
    catch (err) {
      console.error(err);
      toast.error("Unable to load budget.");
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    refreshBudget();
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
        <title>Budget | Spendora</title>
        <meta
          name="description"
          content="Create and monitor your monthly budgets with Spendora."
        />
      </Helmet>

    <DashboardLayout>

      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Budget
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Plan your spending and stay within your limits.
          </p>
        </div>

        <BudgetDialog
          refreshBudget={refreshBudget}
          editingBudget={editingBudget}
          setEditingBudget={setEditingBudget}
        />

      </section>

      <section className="space-y-8">

        <BudgetSummary budget={budget} />

        <BudgetFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        <BudgetTable
          budget={budget}
          expense={expense}
          refreshBudget={refreshBudget}
          setEditingBudget={setEditingBudget}
          search={search}
          category={category}
          sort={sort}
        />

      </section>

    </DashboardLayout>

  </>
);

}

export default Budget;