import uuid
from datetime import timedelta
from django.utils import timezone

from rest_framework import generics, status, parsers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import ( AllowAny, IsAuthenticated )
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    EmailLoginSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)

from .utils import send_password_reset_email
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = EmailLoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileImageUploadView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        user = request.user
        image = request.FILES.get("profile_image")

        if not image:
            return Response(
                {
                    "error": "No image uploaded."
                },
                status=400,
            )

        user.profile_image = image
        user.save()

        return Response(
            {
                "profile_image": user.profile_image.url,
                "message": "Profile image updated successfully.",
            }
        )


class VerifyEmailView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, token):

        try:
            user = User.objects.get(verification_token=token)

        except User.DoesNotExist:

            return Response(
                {
                    "error": "Invalid verification link."
                },
                status=400,
            )

        user.email_verified = True
        user.verification_token = None

        user.save()

        return Response(
            {
                "message": "Email verified successfully."
            }
        )



class ForgotPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ForgotPasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        user.password_reset_token = uuid.uuid4()
        user.password_reset_created = timezone.now()

        user.save(
            update_fields=[
                "password_reset_token",
                "password_reset_created",
            ]
        )

        send_password_reset_email(user)

        return Response(
            {
                "message": "Password reset email sent successfully."
            },
            status=status.HTTP_200_OK,
        )


class ResetPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request, token):

        try:
            user = User.objects.get(password_reset_token=token)

        except User.DoesNotExist:
            return Response(
                {
                    "error": "Invalid or expired password reset link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            not user.password_reset_created
            or timezone.now()
            > user.password_reset_created
            + timedelta(minutes=30)
        ):
            user.password_reset_token = None
            user.password_reset_created = None

            user.save(
                update_fields=[
                    "password_reset_token",
                    "password_reset_created",
                ]
            )

            return Response(
                {
                    "error": "Password reset link has expired."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ResetPasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user.set_password(serializer.validated_data["password"])

        user.password_reset_token = None
        user.password_reset_created = None

        user.save(
            update_fields=[
                "password",
                "password_reset_token",
                "password_reset_created",
            ]
        )

        return Response(
            {
                "message": "Password reset successfully."
            },
            status=status.HTTP_200_OK,
        )