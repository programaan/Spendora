import StatsCard from "../dashboard/StatsCard";

import { Wallet, IndianRupee, Receipt, PiggyBank } from "lucide-react";

function ReportsSummary({ summary }) {

  if (!summary) return null;

return (

    <section className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Income"
        amount={Number(summary.income)}
        icon={IndianRupee}
        color="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      />

      <StatsCard
        title="Total Expenses"
        amount={Number(summary.expense)}
        icon={Receipt}
        color="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      />

      <StatsCard
        title="Total Savings"
        amount={Number(summary.savings)}
        icon={PiggyBank}
        color="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
      />

      <StatsCard
        title="Net Balance"
        amount={Number(summary.net_worth)}
        icon={Wallet}
        color="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
      />

    </section>

);

}

export default ReportsSummary;