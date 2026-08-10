from rest_framework import serializers
from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = "__all__"

        read_only_fields = (
            "id",
            "user",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):

        user = self.context["request"].user

        category = attrs.get(
            "category",
            getattr(
                self.instance,
                "category",
                None,
            ),
        )

        month = attrs.get(
            "month",
            getattr(
                self.instance,
                "month",
                None,
            ),
        )

        queryset = Budget.objects.filter(user=user, category=category, month=month)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                {
                    "message": (
                        "A budget for this category "
                        "and month already exists."
                    )
                }
            )

        return attrs