import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function exportPDF(income, expense, budget) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Finance Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    14,
    28
  );

  doc.setFontSize(14);
  doc.text("Income", 14, 40);

  autoTable(doc, {
    startY: 45,
    head: [["Source", "Category", "Amount", "Date"]],
    body: income.map((item) => [
      item.source,
      item.category,
      `₹${item.amount}`,
      item.date,
    ]),
  });

  doc.setFontSize(14);
  doc.text(
    "Expenses",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Title", "Category", "Amount", "Date"]],
    body: expense.map((item) => [
      item.title,
      item.category,
      `₹${item.amount}`,
      item.date,
    ]),
  });


  doc.setFontSize(14);
  doc.text(
    "Budgets",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Category", "Budget", "Month"]],
    body: budget.map((item) => [
      item.category,
      `₹${item.amount}`,
      item.month,
    ]),
  });

  doc.save("Finance_Report.pdf");
}

export default exportPDF;
