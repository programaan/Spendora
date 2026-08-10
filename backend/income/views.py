from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Income
from .serializers import IncomeSerializer


class IncomeListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        income = Income.objects.filter(
            user=request.user
        ).order_by("-date")

        serializer = IncomeSerializer(income, many=True,)

        return Response(serializer.data)

    def post(self, request):

        serializer = IncomeSerializer(data=request.data)

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


class IncomeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):

        try:
            return Income.objects.get(pk=pk, user=request.user)

        except Income.DoesNotExist:
            return None

    def get(self, request, pk):

        income = self.get_object(request, pk)

        if not income:
            return Response(
                {
                    "error": "Income not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = IncomeSerializer(income)

        return Response(serializer.data)

    def put(self, request, pk):

        income = self.get_object(request, pk)

        if not income:
            return Response(
                {
                    "error": "Income not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = IncomeSerializer(income, data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):

        income = self.get_object(request, pk)

        if not income:
            return Response(
                {
                    "error": "Income not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        income.delete()

        return Response(
            {
                "message": "Income deleted successfully"
            },
            status=status.HTTP_204_NO_CONTENT,
        )