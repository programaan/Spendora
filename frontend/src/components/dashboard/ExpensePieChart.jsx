import { useEffect, useState } from "react";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getExpenseCategoryChart } from "../../services/dashboardService";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

function ExpensePieChart() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChart() {
      try {
        const response = await getExpenseCategoryChart();

        const formatted = response.map((item) => ({
          name: item.name,
          value: Number(item.value),
        }));

        setData(formatted);
      } 
      catch (err) {
        console.error(err);
      } 
      finally {
        setLoading(false);
      }
    }

    fetchChart();
  }, []);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

return (

    <Card className="min-w-0 overflow-hidden rounded-3xl border bg-card shadow-sm">
      
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold sm:text-lg">
          Expense Categories
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 pb-4 sm:px-6">
        {loading ? (
          <div className="flex h-[270px] items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-[270px] items-center justify-center text-sm text-muted-foreground">
            No expense data available.
          </div>
        ) : (
          <div className="h-[290px] w-full min-w-0 sm:h-[340px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius="42%"
                  outerRadius="68%"
                  paddingAngle={3}
                  label={({ percent }) =>
                    percent >= 0.05
                      ? `${(percent * 100).toFixed(0)}%`
                      : ""
                  }
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString()}`
                  }
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: 12,
                    lineHeight: "18px",
                    paddingTop: 8,
                  }}
                />

                <text
                  x="50%"
                  y="40%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "var(--foreground)",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  ₹{total.toLocaleString()}
                </text>

                <text
                  x="50%"
                  y="46%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "12px",
                    fill: "var(--muted-foreground)",
                  }}
                >
                  Total
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        
      </CardContent>

    </Card>

);

}


export default ExpensePieChart;