import { useEffect, useState } from "react";

import { createExpense, updateExpense } from "../../services/expenseService";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";

const expenseCategories = [
  "Food",
  "Bills",
  "Entertainment",
  "Shopping",
  "Travel",
  "Other",
];

function ExpenseDialog({
  refreshExpenses,
  editingExpense,
  setEditingExpense,
}) {

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        category: editingExpense.category,
        amount: String(editingExpense.amount),
        date: editingExpense.date,
      });

      setOpen(true);
    }
  }, [editingExpense]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

async function handleSubmit(e) {

  e.preventDefault();

  if (
    !form.title.trim() ||
    !form.category ||
    !form.amount ||
    !form.date
  ) {
    toast.error("Please fill all fields.");
    return;
  }

  if (Number(form.amount) <= 0) {
    toast.error("Amount must be greater than 0.");
    return;
  }

  setLoading(true);

  const payload = {
    title: form.title.trim(),
    category: form.category,
    amount: Number(form.amount),
    date: form.date,
  };

  try {
    if (editingExpense) {
      await updateExpense(editingExpense.id, payload);

      toast.success("Expense updated successfully.");
    } else {
      await createExpense(payload);

      toast.success("Expense added successfully.");
    }

    await refreshExpenses();

    setEditingExpense(null);

    setForm({
      title: "",
      category: "",
      amount: "",
      date: "",
    });

    setOpen(false);
  }

  catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to save expense."
    );

  }

  finally {
    setLoading(false);
  }

}

return ( 
  <>

      <Button
        className="h-11 w-full sm:w-auto rounded-xl px-5 shadow-sm"
        onClick={() => {
          setEditingExpense(null);

          setForm({
            title: "",
            category: "",
            amount: "",
            date: "",
          });

          setOpen(true);
        }}
      >
        + Add Expense
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setEditingExpense(null);

            setForm({
              title: "",
              category: "",
              amount: "",
              date: "",
            });
          }
        }}
      >
        <DialogContent className="w-[92vw] max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </DialogTitle>
          </DialogHeader>


          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              className="h-10 rounded-xl text-sm sm:h-11"
              placeholder="Expense Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  category: value,
                })
              }
            >
              <SelectTrigger className="h-10 w-full rounded-xl text-sm sm:h-11">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                align="start"
                sideOffset={4}
                alignItemWithTrigger={false}
                className="min-w-[var(--radix-select-trigger-width)]"
              >
                {expenseCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              className="h-10 rounded-xl text-sm sm:h-11"
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
            />

            <Input
              className="h-10 rounded-xl text-sm sm:h-11"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="h-10 w-full rounded-xl text-sm sm:h-11"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingExpense
                  ? "Update Expense"
                  : "Save Expense"}
            </Button>

          </form>

        </DialogContent>

      </Dialog>

  </>
);

}

export default ExpenseDialog;