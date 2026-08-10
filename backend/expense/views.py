from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        expense = Expense.objects.filter(
            user=request.user
        ).order_by("-date")

        serializer = ExpenseSerializer(expense, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class ExpenseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):

        try:
            return Expense.objects.get(pk=pk, user=request.user)

        except Expense.DoesNotExist:
            return None

    def get(self, request, pk):

        expense = self.get_object(request, pk)

        if not expense:
            return Response(
                {
                    "error": "Expense not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ExpenseSerializer(expense)

        return Response(serializer.data)

    def put(self, request, pk):

        expense = self.get_object(request, pk)

        if not expense:
            return Response(
                {
                    "error": "Expense not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ExpenseSerializer(expense, data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):

        expense = self.get_object(request, pk)

        if not expense:
            return Response(
                {
                    "error": "Expense not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        expense.delete()

        return Response(
            {
                "message": "Expense deleted successfully"
            },
            status=status.HTTP_204_NO_CONTENT,
        )