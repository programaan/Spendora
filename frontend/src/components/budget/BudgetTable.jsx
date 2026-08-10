import { Badge } from "@/components/ui/badge";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { deleteBudget } from "../../services/budgetService";

import { toast } from "sonner";

function BudgetTable({
  budget,
  expense,
  refreshBudget,
  setEditingBudget,
  search,
  category,
  sort,
}) {
  async function handleDelete(id) {
    const ok = window.confirm("Delete this budget?");

    if (!ok) return;

    try {
      await deleteBudget(id);

      await refreshBudget();

      toast.success("Budget deleted successfully.");
    } 
    catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete budget."
      );
    }
  }

  let filteredBudget = [...budget];


  if (search.trim() !== "") {
    filteredBudget = filteredBudget.filter((item) =>
      item.category
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }


  if (category !== "All") {
    filteredBudget = filteredBudget.filter(
      (item) => item.category === category
    );
  }


  filteredBudget.sort((a, b) => {
    if (sort === "Newest") {
      return new Date(b.month) - new Date(a.month);
    }

    return new Date(a.month) - new Date(b.month);
  });

return (
  <>

      <div className="hidden overflow-hidden rounded-3xl border bg-card shadow-sm md:block">

        <Table className="w-full table-fixed">

          <TableHeader>

            <TableRow className="transition-colors hover:bg-accent/40">

              <TableHead className="font-semibold">
                Category
              </TableHead>

              <TableHead className="font-semibold">
                Budget
              </TableHead>

              <TableHead className="font-semibold">
                Month
              </TableHead>

              <TableHead className="w-40 text-center font-semibold">
                Status
              </TableHead>

              <TableHead className="w-14">
                <span className="sr-only">
                  Actions
                </span>
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filteredBudget.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >

                  <div>

                    <p>
                      No budget records found.
                    </p>

                    <p className="mt-1 text-sm">
                      Try changing filters or add a new budget.
                    </p>

                  </div>

                </TableCell>

              </TableRow>

            ) : (

              filteredBudget.map((item) => {

                const spent = expense
                  .filter(
                    (e) =>
                      e.category === item.category &&
                      e.date.slice(0, 7) === item.month
                  )
                  .reduce(
                    (sum, e) =>
                      sum + Number(e.amount),
                    0
                  );

                const budgetAmount =
                  Number(item.amount);

                const percentage =
                  budgetAmount === 0
                    ? 0
                    : (spent / budgetAmount) * 100;

                let status = "Under Budget";

                let badgeColor =
                  "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";

                if (percentage > 100) {
                  status = "Over Budget";

                  badgeColor =
                    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
                } else if (percentage >= 80) {
                  status = "Near Limit";

                  badgeColor =
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
                }

                return (

                  <TableRow key={item.id}>

                    <TableCell className="font-medium">
                      <span className="block truncate">
                        {item.category}
                      </span>
                    </TableCell>

                    <TableCell>

                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        ₹{budgetAmount.toLocaleString()}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Spent ₹{spent.toLocaleString()}
                      </p>

                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {item.month}
                    </TableCell>

                    <TableCell className="w-40 text-center">

                      <Badge className={badgeColor}>
                        {status}
                      </Badge>

                    </TableCell>

                    <TableCell className="w-14 text-center">

                      <DropdownMenu>

                        <DropdownMenuTrigger asChild>

                          <button
                            type="button"
                            aria-label="Open actions menu"
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              transition
                              hover:bg-accent
                            "
                          >
                            <MoreHorizontal size={18} />
                          </button>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          sideOffset={6}
                        >

                          <DropdownMenuItem
                            onClick={() =>
                              setEditingBudget(item)
                            }
                          >

                            <Pencil
                              size={16}
                              className="mr-2"
                            />

                            Edit

                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >

                            <Trash2
                              size={16}
                              className="mr-2"
                            />

                            Delete

                          </DropdownMenuItem>

                        </DropdownMenuContent>

                      </DropdownMenu>

                    </TableCell>

                  </TableRow>

                );
              })

            )}

          </TableBody>

        </Table>

      </div>


      <div className="space-y-3 md:hidden">

        {filteredBudget.length === 0 ? (

          <div className="rounded-3xl border bg-card px-5 py-12 text-center shadow-sm">

            <p className="text-sm text-muted-foreground">
              No budget records found.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Try changing filters or add a new budget.
            </p>

          </div>

        ) : (

          filteredBudget.map((item) => {

            const spent = expense
              .filter(
                (e) =>
                  e.category === item.category &&
                  e.date.slice(0, 7) === item.month
              )
              .reduce(
                (sum, e) =>
                  sum + Number(e.amount),
                0
              );

            const budgetAmount =
              Number(item.amount);

            const percentage =
              budgetAmount === 0
                ? 0
                : (spent / budgetAmount) * 100;

            let status = "Under Budget";

            let badgeColor =
              "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";

            if (percentage > 100) {
                  status = "Over Budget";

                  badgeColor =
                    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
                } else if (percentage >= 80) {
                  status = "Near Limit";

                  badgeColor =
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
                }

            return (

              <div
                key={item.id}
                className="
                  rounded-3xl
                  border
                  bg-card
                  p-4
                  shadow-sm
                "
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="truncate font-semibold">
                      {item.category}
                    </h3>

                    <div className="mt-2">

                      <Badge className={badgeColor}>
                        {status}
                      </Badge>

                    </div>

                  </div>

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <button
                        type="button"
                        aria-label="Open actions menu"
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition
                          hover:bg-accent
                        "
                      >

                        <MoreHorizontal size={18} />

                      </button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      sideOffset={6}
                    >

                      <DropdownMenuItem
                        onClick={() =>
                          setEditingBudget(item)
                        }
                      >

                        <Pencil
                          size={16}
                          className="mr-2"
                        />

                        Edit

                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >

                        <Trash2
                          size={16}
                          className="mr-2"
                        />

                        Delete

                      </DropdownMenuItem>

                    </DropdownMenuContent>

                  </DropdownMenu>

                </div>

                <div className="mt-4 flex items-end justify-between border-t pt-3">

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Budget
                    </p>

                    <p className="mt-1 text-base font-semibold text-blue-600 dark:text-blue-400">
                      ₹{budgetAmount.toLocaleString()}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Spent ₹{spent.toLocaleString()}
                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-xs text-muted-foreground">
                      Month
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {item.month}
                    </p>

                  </div>

                </div>

              </div>

            );
          })

        )}

      </div>

  </>
);

}


export default BudgetTable;