import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { deleteExpense } from "../../services/expenseService";

import { toast } from "sonner";

function ExpenseTable({
  expense,
  refreshExpenses,
  setEditingExpense,
  search,
  category,
  sort,
}) {
  async function handleDelete(id) {
    const ok = window.confirm("Delete this expense?");

    if (!ok) return;

    try {
      await deleteExpense(id);

      await refreshExpenses();

      toast.success("Expense deleted successfully.");
    } 
    catch (err) {
      console.error(err);
      toast.error("Unable to delete expense.");
    }
  }

  let filteredExpense = [...expense];

  if (search.trim() !== "") {
    filteredExpense = filteredExpense.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  if (category !== "All") {
    filteredExpense = filteredExpense.filter(
      (item) => item.category === category
    );
  }

  filteredExpense.sort((a, b) => {
    if (sort === "Newest") {
      return new Date(b.date) - new Date(a.date);
    }

    return new Date(a.date) - new Date(b.date);
  });

return (
  <>

      <div className="hidden overflow-hidden rounded-3xl border bg-card shadow-sm md:block">

        <Table className="w-full table-fixed">

          <TableHeader>

            <TableRow className="transition-colors hover:bg-accent/40">

              <TableHead className="font-semibold">
                Title
              </TableHead>

              <TableHead className="font-semibold">
                Category
              </TableHead>

              <TableHead className="font-semibold">
                Date
              </TableHead>

              <TableHead className="w-40 text-center font-semibold">
                Amount
              </TableHead>

              <TableHead className="w-14">
                <span className="sr-only">
                  Actions
                </span>
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filteredExpense.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >

                  <div>

                    <p>
                      No expense records found.
                    </p>

                    <p className="mt-1 text-sm">
                      Try changing filters or add a new expense.
                    </p>

                  </div>

                </TableCell>

              </TableRow>

            ) : (

              filteredExpense.map((item) => (

                <TableRow key={item.id}>

                  <TableCell className="font-medium">

                    <span className="block truncate">
                      {item.title}
                    </span>

                  </TableCell>

                  <TableCell>

                    <Badge variant="secondary">
                      {item.category}
                    </Badge>

                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {item.date}
                  </TableCell>

                  <TableCell className="w-40 text-center text-red-600">
                    ₹{Number(item.amount).toLocaleString()}
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
                            setEditingExpense(item)
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

              ))

            )}

          </TableBody>

        </Table>

      </div>


      <div className="space-y-3 md:hidden">

        {filteredExpense.length === 0 ? (

          <div className="rounded-3xl border bg-card px-5 py-12 text-center shadow-sm">

            <p className="text-sm text-muted-foreground">
              No expense records found.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Try changing filters or add a new expense.
            </p>

          </div>

        ) : (

          filteredExpense.map((item) => (

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
                    {item.title}
                  </h3>

                  <div className="mt-2">

                    <Badge variant="secondary">
                      {item.category}
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
                        setEditingExpense(item)
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
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {item.date}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-xs text-muted-foreground">
                    Amount
                  </p>

                  <p className="mt-1 text-base font-semibold text-red-600">
                    ₹{Number(item.amount).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

  </>
);

}

export default ExpenseTable;