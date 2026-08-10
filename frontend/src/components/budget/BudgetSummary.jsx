import StatsCard from "../dashboard/StatsCard";

import { Wallet, Calendar, TrendingUp, PiggyBank } from "lucide-react";

function BudgetSummary({ budget }) {

  const totalBudget = budget.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalCategories = new Set(
    budget.map((item) => item.category)
  ).size;

  const averageBudget =
    budget.length > 0
      ? Math.round(totalBudget / budget.length)
      : 0;

  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const monthlyBudget = budget
  .filter((item) => item.month === currentMonth)
  .reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

return (

    <section>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Budget"
          amount={totalBudget}
          icon={Wallet}
          color="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
        />

        <StatsCard
          title="This Month"
          amount={monthlyBudget}
          icon={Calendar}
          color="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
        />

        <StatsCard
          title="Categories"
          amount={totalCategories}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
          isCurrency={false}
        />

        <StatsCard
          title="Average Budget"
          amount={averageBudget}
          icon={PiggyBank}
          color="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
        />

      </div>

    </section>

);

}

export default BudgetSummary;