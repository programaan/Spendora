import { useState, useEffect } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createIncome, updateIncome } from "../../services/incomeService";

import { toast } from "sonner";

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment",
  "Business",
  "Other",
];

function IncomeDialog({
  editingIncome,
  setEditingIncome,
  refreshIncome,
}) {
  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    source: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (editingIncome) {
      setForm({
        source: editingIncome.source,
        category: editingIncome.category,
        amount: String(editingIncome.amount),
        date: editingIncome.date,
      });

      setOpen(true);
    }
  }, [editingIncome]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm({
      source: "",
      category: "",
      amount: "",
      date: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.source.trim() ||
      !form.category.trim() ||
      !form.date ||
      !form.amount
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (Number(form.amount) <= 0) {
      toast.error("Amount must be greater than 0.");
      return;
    }

    setSaving(true);

    const payload = {
      source: form.source.trim(),
      category: form.category.trim(),
      amount: Number(form.amount),
      date: form.date,
    };

    try {
      if (editingIncome) {
        await updateIncome(editingIncome.id, payload);

        toast.success("Income updated successfully.");
      } else {
        await createIncome(payload);

        toast.success("Income added successfully.");
      }

      await refreshIncome();

      resetForm();

      setEditingIncome(null);

      setOpen(false);
    } 
    catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to save income."
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
          setEditingIncome(null);
          resetForm();
          setOpen(true);
        }}
      >
        + Add Income
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setEditingIncome(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="w-[92vw] max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingIncome
                ? "Edit Income"
                : "Add Income"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              className="h-10 rounded-xl text-sm sm:h-11"
              name="source"
              placeholder="Income Source"
              value={form.source}
              onChange={handleChange}
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
                {incomeCategories.map((category) => (
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
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingIncome
                ? "Update Income"
                : "Save Income"}
            </Button>
          </form>

        </DialogContent>
      </Dialog>
      
  </>
);

}

export default IncomeDialog;