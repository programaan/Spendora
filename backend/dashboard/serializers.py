from rest_framework import serializers


class RecentTransactionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    category = serializers.CharField()
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    type = serializers.CharField()
    date = serializers.DateField()


class MonthlyChartSerializer(serializers.Serializer):
    month = serializers.CharField()
    income = serializers.DecimalField(max_digits=12, decimal_places=2)
    expense = serializers.DecimalField(max_digits=12, decimal_places=2)


class ExpenseCategorySerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.DecimalField(max_digits=12, decimal_places=2)


class BudgetProgressSerializer(serializers.Serializer):
    category = serializers.CharField()
    budget = serializers.DecimalField(max_digits=12, decimal_places=2)
    spent = serializers.DecimalField(max_digits=12, decimal_places=2)