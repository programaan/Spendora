from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    ProfileImageUploadView,
    VerifyEmailView,
    ForgotPasswordView,
    ResetPasswordView,
)

urlpatterns = [

    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/upload-image/", ProfileImageUploadView.as_view(), name="profile-upload-image"),
    path("verify-email/<uuid:token>/", VerifyEmailView.as_view(), name="verify-email"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/<uuid:token>/", ResetPasswordView.as_view(), name="reset-password"),

]