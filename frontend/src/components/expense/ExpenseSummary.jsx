import StatsCard from "../dashboard/StatsCard";

import { Receipt, Calendar, TrendingUp, IndianRupee } from "lucide-react";

function ExpenseSummary({ expense }) {

  const totalExpense = expense.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthlyExpense = expense
    .filter((item) => {
      const [year, month] = item.date.split("-").map(Number);

      return (
        year === currentYear &&
        month - 1 === currentMonth
      );
    })
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const categories = new Set(
    expense.map((item) => item.category)
  ).size;

  const averageExpense =
    expense.length > 0
      ? Math.round(totalExpense / expense.length)
      : 0;

return (

    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Expenses"
        amount={totalExpense}
        icon={Receipt}
        color="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      />

      <StatsCard
        title="This Month"
        amount={monthlyExpense}
        icon={Calendar}
        color="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
      />

      <StatsCard
        title="Categories"
        amount={categories}
        icon={TrendingUp}
        color="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
        isCurrency={false}
      />

      <StatsCard
        title="Average Expense"
        amount={averageExpense}
        icon={IndianRupee}
        color="bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
      />

    </section>

);

}

export default ExpenseSummary;