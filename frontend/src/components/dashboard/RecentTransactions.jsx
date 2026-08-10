import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { getRecentTransactions } from "../../services/dashboardService";

function RecentTransactions() {

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchTransactions() {

      try {

        const data = await getRecentTransactions();

        setTransactions(data);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    }

    fetchTransactions();

  }, []);

return (

    <Card className="rounded-3xl border bg-card shadow-sm">

      <CardHeader className="pb-2">

        <CardTitle className="text-lg font-semibold">

          Recent Transactions

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        {loading ? (

          <p className="text-muted-foreground">

            Loading...

          </p>

        ) : transactions.length === 0 ? (

          <p className="text-muted-foreground">

            No transactions found.

          </p>

        ) : (

          transactions.map((item) => (

            <div
              key={`${item.type}-${item.id}`}
              className="
                flex
                items-center
                justify-between
                gap-3
                rounded-2xl
                p-3
                transition-all
                duration-200
                hover:bg-accent
              "
            >

              <div className="flex min-w-0 items-center gap-4">

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    ${
                      item.type === "income"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                    }
                  `}
                >

                  {item.type === "income" ? (

                    <ArrowUpRight size={20} />

                  ) : (

                    <ArrowDownRight size={20} />

                  )}

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold truncate">

                    {item.title}

                  </h4>

                  <p className="text-xs md:text-sm text-muted-foreground">

                    {item.category}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`text-sm md:text-base font-semibold ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {item.type === "income"
                    ? "+"
                    : "-"}

                  ₹{Number(item.amount).toLocaleString()}

                </p>

                <p className="text-xs text-muted-foreground">

                  {item.date}

                </p>

              </div>

            </div>

          ))

        )}

      </CardContent>

    </Card>

);

}

export default RecentTransactions;