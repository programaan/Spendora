import MonthlyTrendChart from "./MonthlyTrendChart";
import ExpensePieChart from "./ExpensePieChart";

function ReportsCharts({
  monthlyData,
  categoryData,
}) {

  return (

    <section className="grid gap-6 xl:grid-cols-2">

      <MonthlyTrendChart
        monthlyData={monthlyData}
      />

      <ExpensePieChart
        categoryData={categoryData}
      />

    </section>

  );

}

export default ReportsCharts;