from django.contrib import admin
from .models import Income


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    
    list_display = ("source", "category", "amount", "date", "user")
    list_filter = ("category", "date")
    search_fields = ("source", "user__username")