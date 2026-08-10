import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function exportExcel(income, expense, budget) {

  const incomeSheet = income.map((item) => ({
    Source: item.source,
    Category: item.category,
    Amount: item.amount,
    Date: item.date,
  }));

  const expenseSheet = expense.map((item) => ({
    Title: item.title,
    Category: item.category,
    Amount: item.amount,
    Date: item.date,
  }));

  const budgetSheet = budget.map((item) => ({
    Category: item.category,
    Budget: item.amount,
    Month: item.month,
  }));

  const workbook = XLSX.utils.book_new();

  const incomeWS = XLSX.utils.json_to_sheet(incomeSheet);
  const expenseWS = XLSX.utils.json_to_sheet(expenseSheet);
  const budgetWS = XLSX.utils.json_to_sheet(budgetSheet);

  XLSX.utils.book_append_sheet(
    workbook,
    incomeWS,
    "Income"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    expenseWS,
    "Expenses"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    budgetWS,
    "Budgets"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(file, "Finance_Report.xlsx");
}

export default exportExcel;