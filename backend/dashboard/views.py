from calendar import month_abbr
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from income.models import Income
from expense.models import Expense
from budget.models import Budget

from .serializers import (
    RecentTransactionSerializer, 
    MonthlyChartSerializer, 
    ExpenseCategorySerializer, 
    BudgetProgressSerializer,
)


class DashboardSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total_income = (
            Income.objects.filter(user=request.user)
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )

        total_expense = (
            Expense.objects.filter(user=request.user)
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )

        total_budget = (
            Budget.objects.filter(user=request.user)
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )

        balance = total_income - total_expense

        return Response({
            "total_income": float(total_income),
            "total_expense": float(total_expense),
            "balance": float(balance),
            "savings": float(balance),
            "total_budget": float(total_budget),
        })


class RecentTransactionsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        incomes = (
            Income.objects
            .filter(user=request.user)
            .order_by("-date", "-id")
            .values(
                "id",
                "source",
                "category",
                "amount",
                "date",
            )[:10]
        )

        expenses = (
            Expense.objects
            .filter(user=request.user)
            .order_by("-date", "-id")
            .values(
                "id",
                "title",
                "category",
                "amount",
                "date",
            )[:10]
        )

        transactions = []

        for income in incomes:
            transactions.append(
                {
                    "id": income["id"],
                    "title": income["source"],
                    "category": income["category"],
                    "amount": income["amount"],
                    "type": "income",
                    "date": income["date"],
                }
            )

        for expense in expenses:
            transactions.append(
                {
                    "id": expense["id"],
                    "title": expense["title"],
                    "category": expense["category"],
                    "amount": expense["amount"],
                    "type": "expense",
                    "date": expense["date"],
                }
            )

        transactions.sort(
            key=lambda x: (x["date"], x["id"]),
            reverse=True,
        )

        transactions = transactions[:10]

        serializer = RecentTransactionSerializer(transactions, many=True)

        return Response(serializer.data)


class MonthlyChartView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        current_year = timezone.localtime().year

        income = (
            Income.objects.filter(
                user=request.user,
                date__year=current_year,
            )
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
        )

        expense = (
            Expense.objects.filter(
                user=request.user,
                date__year=current_year,
            )
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
        )

        data = {
            month_abbr[i]: {
                "month": month_abbr[i],
                "income": 0,
                "expense": 0,
            }
            for i in range(1, 13)
        }

        for item in income:
            key = item["month"].strftime("%b")
            data[key]["income"] = float(item["total"])

        for item in expense:
            key = item["month"].strftime("%b")
            data[key]["expense"] = float(item["total"])

        serializer = MonthlyChartSerializer(list(data.values()), many=True)

        return Response(serializer.data)


class ExpenseCategoryChartView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        expenses = (
            Expense.objects.filter(user=request.user)
            .values("category")
            .annotate(value=Sum("amount"))
        )

        data = []

        for item in expenses:

            data.append(
                {
                    "name": item["category"],
                    "value": item["value"],
                }
            )

        serializer = ExpenseCategorySerializer(data, many=True)

        return Response(serializer.data)


class BudgetProgressView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        now = timezone.localtime()

        current_year = now.year
        current_month = now.month

        current_month_value = (f"{current_year}-{current_month:02d}")

        budgets = Budget.objects.filter(user=request.user, month=current_month_value)

        data = []

        for budget in budgets:

            spent = (
                Expense.objects.filter(
                    user=request.user,
                    category=budget.category,
                    date__year=current_year,
                    date__month=current_month,
                )
                .aggregate(total=Sum("amount"))["total"]
                or 0
            )

            data.append(
                {
                    "category": budget.category,
                    "budget": float(budget.amount),
                    "spent": float(spent),
                }
            )

        serializer = BudgetProgressSerializer(data, many=True)

        return Response(serializer.data)