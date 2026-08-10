import { useEffect, useState } from "react";

import { createBudget, updateBudget } from "../../services/budgetService";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";

const budgetCategories = [
  "Food",
  "Bills",
  "Entertainment",
  "Shopping",
  "Travel",
  "Other",
];

function BudgetDialog({refreshBudget, editingBudget, setEditingBudget}) {

  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: "",
  });

  useEffect(() => {
    if (editingBudget) {
      setForm({
        category: editingBudget.category,
        amount: String(editingBudget.amount),
        month: editingBudget.month,
      });

      setOpen(true);
    }
  }, [editingBudget]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.category ||
      !form.amount ||
      !form.month
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (Number(form.amount) <= 0) {
      toast.error("Budget amount must be greater than 0.");
      return;
    }

    setSaving(true);

    const payload = {
      category: form.category,
      amount: Number(form.amount),
      month: form.month,
    };

    try {
      if (editingBudget) {
        await updateBudget(
          editingBudget.id,
          payload
        );

        toast.success(
          "Budget updated successfully."
        );
      } else {
        await createBudget(payload);

        toast.success(
          "Budget added successfully."
        );
      }

      await refreshBudget();

      setEditingBudget(null);

      setForm({
        category: "",
        amount: "",
        month: "",
      });

      setOpen(false);
    } 
    catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to save budget."
      );
    } 
    finally {
      setSaving(false);
    }
  }

return (  
  <>

      <Button
        className="h-11 w-full sm:w-auto rounded-xl px-5 shadow-sm"
        onClick={() => {
          setEditingBudget(null);

          setForm({
            category: "",
            amount: "",
            month: "",
          });

          setOpen(true);
        }}
      >
        + Add Budget
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setEditingBudget(null);

            setForm({
              category: "",
              amount: "",
              month: "",
            });
          }
        }}
      >
        <DialogContent className="w-[92vw] max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingBudget
                ? "Edit Budget"
                : "Add Budget"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
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
                {budgetCategories.map((category) => (
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
              placeholder="Budget Amount"
              value={form.amount}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
            />

            <Input
              className="h-10 rounded-xl text-sm sm:h-11"
              type="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="h-10 w-full rounded-xl text-sm sm:h-11"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingBudget
                ? "Update Budget"
                : "Save Budget"}
            </Button>
          </form>

        </DialogContent>
      </Dialog>
      
  </>
);

}


export default BudgetDialog;