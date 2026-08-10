import StatsCard from "../dashboard/StatsCard";

import { Wallet, Calendar, BadgeIndianRupee, TrendingUp } from "lucide-react";

function IncomeSummary({ income }) {

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const thisMonthIncome = income
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

  const totalCategories = new Set(
    income.map((item) => item.category)
  ).size;

  const averageIncome =
    income.length > 0
      ? Math.round(totalIncome / income.length)
      : 0;

return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Income"
        amount={totalIncome}
        icon={Wallet}
        color="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      />

      <StatsCard
        title="This Month"
        amount={thisMonthIncome}
        icon={Calendar}
        color="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
      />

      <StatsCard
        title="Categories"
        amount={totalCategories}
        icon={TrendingUp}
        color="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
        isCurrency={false}
      />

      <StatsCard
        title="Average Income"
        amount={averageIncome}
        icon={BadgeIndianRupee}       
        color="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
      />

    </div>

);

}

export default IncomeSummary;