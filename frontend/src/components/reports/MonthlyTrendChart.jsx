import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function MonthlyTrendChart({ monthlyData }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => {
    const incomeItem = monthlyData.income.find((item) => {
      const date = new Date(item.month);
      return date.getMonth() === index;
    });

    const expenseItem = monthlyData.expense.find((item) => {
      const date = new Date(item.month);
      return date.getMonth() === index;
    });

    return {
      month,
      Income: incomeItem
        ? Number(incomeItem.total)
        : 0,
      Expenses: expenseItem
        ? Number(expenseItem.total)
        : 0,
    };
  });

return (

    <Card className="rounded-3xl border shadow-sm">
      
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Monthly Trend
        </CardTitle>

        <CardDescription>
          Income vs Expenses
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full sm:h-[360px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 8,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                strokeOpacity={0.2}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                interval={1}
              />

              <YAxis
                tickFormatter={(value) =>
                  `₹${value / 1000}k`
                }
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={42}
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString()}`
                }
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />

              <Line
                type="monotone"
                dataKey="Income"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

    </Card>
);

}

export default MonthlyTrendChart;