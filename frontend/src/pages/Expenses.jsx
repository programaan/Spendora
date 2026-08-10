import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import ExpenseDialog from "../components/expense/ExpenseDialog";
import ExpenseSummary from "../components/expense/ExpenseSummary";
import ExpenseFilter from "../components/expense/ExpenseFilter";
import ExpenseTable from "../components/expense/ExpenseTable";

import { getExpenses } from "../services/expenseService";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Expenses() {

  const [expense, setExpense] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("Newest");

  async function fetchExpenses() {
    try {
      const data = await getExpenses();

      setExpense(data);
    } 
    catch (err) {
      console.error(err);
      toast.error("Unable to load expenses.");

    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
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
      <title>Expenses | Spendora</title>
      <meta
        name="description"
        content="Track and manage your daily expenses with Spendora."
      />
    </Helmet>
    
    <DashboardLayout>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Expenses
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your spending and control every expense.
          </p>
        </div>

        <ExpenseDialog
          refreshExpenses={fetchExpenses}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />
      </div>

      <section className="space-y-8">
        <ExpenseSummary expense={expense} />

        <ExpenseFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        <ExpenseTable
          expense={expense}
          refreshExpenses={fetchExpenses}
          setEditingExpense={setEditingExpense}
          search={search}
          category={category}
          sort={sort}
        />

      </section>
      
    </DashboardLayout>

  </> 
);

}

export default Expenses;