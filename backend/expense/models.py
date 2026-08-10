from django.db import models
from django.conf import settings


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ("Food", "Food"),
        ("Bills", "Bills"),
        ("Entertainment", "Entertainment"),
        ("Shopping", "Shopping"),
        ("Travel", "Travel"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="expenses")
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "-created_at"]

        indexes = [
            models.Index(fields=["user", "-date", "-id"]),
        ]

    def __str__(self):
        return f"{self.title} - ₹{self.amount}"