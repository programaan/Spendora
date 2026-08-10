from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Budget
from .serializers import BudgetSerializer


class BudgetListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        budget = Budget.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = BudgetSerializer(budget, many=True, context={"request": request})

        return Response(serializer.data)

    def post(self, request):

        serializer = BudgetSerializer(data=request.data, context={"request": request})

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


class BudgetDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):

        try:
            return Budget.objects.get(pk=pk, user=request.user)

        except Budget.DoesNotExist:
            return None

    def get(self, request, pk):

        budget = self.get_object(request, pk)

        if not budget:
            return Response(
                {
                    "error": "Budget not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BudgetSerializer(budget, context={"request": request})

        return Response(serializer.data)

    def put(self, request, pk):

        budget = self.get_object(request, pk)

        if not budget:
            return Response(
                {
                    "error": "Budget not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BudgetSerializer(budget, data=request.data, context={"request": request})

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):

        budget = self.get_object(request, pk)

        if not budget:
            return Response(
                {
                    "error": "Budget not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        budget.delete()

        return Response(
            {
                "message": "Budget deleted successfully"
            },
            status=status.HTTP_204_NO_CONTENT,
        )