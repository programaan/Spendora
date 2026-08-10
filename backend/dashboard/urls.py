from django.urls import path

from .views import (
    DashboardSummaryView,
    RecentTransactionsView,
    MonthlyChartView,
    ExpenseCategoryChartView,
    BudgetProgressView
)

urlpatterns = [
    path("summary/", DashboardSummaryView.as_view(), name="dashboard-summary"),
    path("recent-transactions/", RecentTransactionsView.as_view(), name="recent-transactions"),
    path("monthly-chart/", MonthlyChartView.as_view(), name="monthly-chart"),
    path("expense-category-chart/", ExpenseCategoryChartView.as_view(), name="expense-category-chart"),
    path("budget-progress/", BudgetProgressView.as_view(), name="budget-progress"),
]