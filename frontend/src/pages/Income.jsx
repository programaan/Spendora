import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import IncomeTable from "../components/income/IncomeTable";
import IncomeDialog from "../components/income/IncomeDialog";
import IncomeFilters from "../components/income/IncomeFilters";
import IncomeSummary from "../components/income/IncomeSummary";

import { getIncome } from "../services/incomeService";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Income() {

  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingIncome, setEditingIncome] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest First");

  async function fetchIncome(mounted = true) {
    try {
      const data = await getIncome();

      if (mounted) {
        setIncome(data);
      }
    } 
    catch (err) {
      console.error(err);

      if (mounted) {
        toast.error("Unable to load income.");
      }
    } 
    finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    fetchIncome(mounted);

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
        <title>Income | Spendora</title>
        <meta
          name="description"
          content="Manage and track all your income sources in Spendora."
        />
      </Helmet>


    <DashboardLayout>
      
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Income
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track all your earnings.
          </p>
        </div>

        <IncomeDialog
          income={income}
          setIncome={setIncome}
          editingIncome={editingIncome}
          setEditingIncome={setEditingIncome}
          refreshIncome={() => fetchIncome(true)}
        />

      </div>

      <section className="space-y-8">
        <IncomeSummary income={income} />

        <IncomeFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        <IncomeTable
          income={income}
          setIncome={setIncome}
          editingIncome={editingIncome}
          setEditingIncome={setEditingIncome}
          search={search}
          category={category}
          sort={sort}
          refreshIncome={() => fetchIncome(true)}
        />
      </section>

    </DashboardLayout>

  </>
);

}

export default Income;