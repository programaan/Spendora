import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

function ExpensePieChart({ categoryData }) {
  const data = (categoryData || []).map((item) => ({
    name: item.category,
    value: Number(item.value),
  }));

return (

    <Card className="rounded-3xl border shadow-sm">
      
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Expenses by Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[330px] items-center justify-center text-sm text-muted-foreground">
            No expense data available.
          </div>
        ) : (
          <div className="h-[330px] w-full sm:h-[360px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="43%"
                  innerRadius="38%"
                  outerRadius="68%"
                  paddingAngle={3}
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine
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
                    fontSize: "12px",
                    lineHeight: "18px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

    </Card>
);

}

export default ExpensePieChart;