from datetime import timedelta

from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from income.models import Income
from expense.models import Expense


def get_date_filter(range_value):
    today = timezone.localdate()

    if range_value == "7":
        return today - timedelta(days=6)

    if range_value == "30":
        return today - timedelta(days=29)

    if range_value == "month":
        return today.replace(day=1)

    if range_value == "year":
        return today.replace(month=1, day=1)

    return None


class ReportsSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        range_value = request.query_params.get("range", "all")
        start_date = get_date_filter(range_value)

        income_queryset = Income.objects.filter(user=request.user)
        expense_queryset = Expense.objects.filter(user=request.user)

        if start_date:
            income_queryset = income_queryset.filter(date__gte=start_date)
            expense_queryset = expense_queryset.filter(date__gte=start_date)

        total_income = (
            income_queryset
            .aggregate(total=Sum("amount"))
            .get("total")
            or 0
        )

        total_expense = (
            expense_queryset
            .aggregate(total=Sum("amount"))
            .get("total")
            or 0
        )

        savings = total_income - total_expense

        return Response(
            {
                "income": total_income,
                "expense": total_expense,
                "savings": savings,
                "net_worth": savings,
            }
        )


class MonthlyTrendView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        range_value = request.query_params.get("range", "all")
        start_date = get_date_filter(range_value)

        income_queryset = Income.objects.filter(user=request.user)
        expense_queryset = Expense.objects.filter(user=request.user)

        if start_date:
            income_queryset = income_queryset.filter(date__gte=start_date)
            expense_queryset = expense_queryset.filter(date__gte=start_date)

        income = (
            income_queryset
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        expense = (
            expense_queryset
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        return Response(
            {
                "income": income,
                "expense": expense,
            }
        )


class CategoryReportView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        range_value = request.query_params.get("range", "all")
        start_date = get_date_filter(range_value)

        expense_queryset = Expense.objects.filter(user=request.user)

        if start_date:
            expense_queryset = expense_queryset.filter(date__gte=start_date)

        data = (
            expense_queryset
            .values("category")
            .annotate(value=Sum("amount"))
            .order_by("-value")
        )

        return Response(data)