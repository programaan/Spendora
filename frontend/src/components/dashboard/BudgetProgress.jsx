import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { getBudgetProgress } from "../../services/dashboardService";

import Loader from "../Loader";

function BudgetProgress() {

  const [budgetData, setBudgetData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchBudget() {

      try {

        const data = await getBudgetProgress();

        setBudgetData(data);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    }

    fetchBudget();

  }, []);

return (

    <Card className="rounded-3xl border bg-card shadow-sm">

      <CardHeader className="pb-2">

        <CardTitle className="text-lg font-semibold">

          Monthly Budget

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        {loading ? (

          <Loader />

        ) : budgetData.length === 0 ? (

          <p className="text-muted-foreground">

            No Budget Found

          </p>

        ) : (

          budgetData.map((item) => {

            const budget = Number(item.budget);

            const percentage =
              budget > 0
                ? (Number(item.spent) / budget) * 100
                : 0;

            const progressValue = Math.min(percentage, 100);

            const progressColor =
              percentage > 100
                ? "text-red-600"
                : percentage >= 80
                ? "text-yellow-600"
                : "text-green-600";

            return (

              <div
                key={`${item.category}-${item.budget}`}
                className="rounded-2xl p-3 transition hover:bg-accent"
              >

                <div className="mb-2 flex items-start justify-between gap-3">

                  <div>

                    <h4 className="text-sm md:text-base font-semibold">

                      {item.category}

                    </h4>

                    <p className="text-xs text-muted-foreground">

                      ₹
                      {Number(item.spent).toLocaleString()}
                      {" "}
                      of ₹
                      {Number(item.budget).toLocaleString()}

                    </p>

                  </div>

                  <span
                    className={`text-xs md:text-sm font-semibold ${progressColor}`}
                  >

                    {percentage.toFixed(0)}%

                  </span>

                </div>

                <Progress
                  value={progressValue}
                  className="h-3"
                />

              </div>

            );

          })

        )}

      </CardContent>

    </Card>

);

}

export default BudgetProgress;