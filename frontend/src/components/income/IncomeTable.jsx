import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { deleteIncome } from "../../services/incomeService";

import { toast } from "sonner";

function IncomeTable({
  income,
  refreshIncome,
  setEditingIncome,
  search,
  category,
  sort,
}) {
  async function handleDelete(id) {
    const ok = window.confirm("Delete this income?");

    if (!ok) return;

    try {
      await deleteIncome(id);

      await refreshIncome();

      toast.success("Income deleted successfully.");
    } 
    catch (err) {
      console.error(err);

      toast.error("Unable to delete income.");
    }
  }

  let filteredIncome = [...income];

  if (search.trim() !== "") {
    filteredIncome = filteredIncome.filter(
      (item) =>
        item.source
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  if (category !== "All Categories") {
    filteredIncome = filteredIncome.filter(
      (item) => item.category === category
    );
  }

  filteredIncome.sort((a, b) => {
    if (sort === "Newest First") {
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
                Source
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

            {filteredIncome.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >

                  <div>
                    <p>
                      No income records found.
                    </p>

                    <p className="mt-1 text-sm">
                      Try changing filters or add a new income.
                    </p>
                  </div>

                </TableCell>

              </TableRow>

            ) : (

              filteredIncome.map((item) => (

                <TableRow key={item.id}>

                  <TableCell className="font-medium">
                    <span className="block truncate">
                      {item.source}
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

                  <TableCell className="w-40 text-center text-green-600">
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
                            setEditingIncome(item)
                          }
                        >

                          <Pencil
                            className="mr-2"
                            size={16}
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
                            className="mr-2"
                            size={16}
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

        {filteredIncome.length === 0 ? (

          <div className="rounded-3xl border bg-card px-5 py-12 text-center shadow-sm">

            <p className="text-sm text-muted-foreground">
              No income records found.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Try changing filters or add a new income.
            </p>

          </div>

        ) : (

          filteredIncome.map((item) => (

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
                    {item.source}
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
                        setEditingIncome(item)
                      }
                    >

                      <Pencil
                        className="mr-2"
                        size={16}
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
                        className="mr-2"
                        size={16}
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

                  <p className="mt-1 text-base font-semibold text-green-600">
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

export default IncomeTable;