import { useEffect, useState } from "react";

import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getMonthlyChart } from "../../services/dashboardService";

function IncomeExpenseChart() {

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChart() {
      try {
        const data = await getMonthlyChart();

        setChartData(data);
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

return (
    
    <Card className="min-w-0 overflow-hidden rounded-3xl border bg-card shadow-sm">
      
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold sm:text-lg">
          Income vs Expenses
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 pb-4 sm:px-6">
        {loading ? (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="h-[270px] w-full min-w-0 sm:h-[340px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 8,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  strokeOpacity={0.25}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickMargin={8}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  fontSize={11}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `₹${value / 1000}k`
                      : `₹${value}`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString()}`
                  }
                />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{
                    fontSize: 12,
                    paddingTop: 8,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
      </CardContent>

    </Card>

);

}

export default IncomeExpenseChart;