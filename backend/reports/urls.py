from django.urls import path

from .views import ( ReportsSummaryView, MonthlyTrendView, CategoryReportView )

urlpatterns = [
    path("summary/", ReportsSummaryView.as_view(), name="reports-summary"),
    path("monthly/", MonthlyTrendView.as_view(), name="reports-monthly"),
    path("categories/", CategoryReportView.as_view(), name="reports-categories"),
]