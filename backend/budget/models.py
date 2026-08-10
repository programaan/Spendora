from django.db import models
from django.conf import settings


class Budget(models.Model):

    CATEGORY_CHOICES = [
        ("Food", "Food"),
        ("Bills", "Bills"),
        ("Entertainment", "Entertainment"),
        ("Shopping", "Shopping"),
        ("Travel", "Travel"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="budgets")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    month = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "user",
                    "category",
                    "month",
                ],
                name="unique_user_budget_category_month",
            ),
        ]

    def __str__(self):
        return f"{self.category} - ₹{self.amount}"