import uuid

from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from .utils import send_verification_email

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
        )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "Email already exists."}
            )

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        username = (
            validated_data["email"].split("@")[0]
            + "_"
            + uuid.uuid4().hex[:6]
        )

        user = User.objects.create_user(
            username=username,
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get(
                "first_name",
                "",
            ),
            last_name=validated_data.get(
                "last_name",
                "",
            ),
        )

        user.email_verified = False
        user.is_active = True
        user.verification_token = uuid.uuid4()

        user.save()
        send_verification_email(user)

        return user



class EmailLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        email = attrs["email"]
        password = attrs["password"]

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.email_verified:
            raise serializers.ValidationError(
                "Please verify your email first."
            )

        authenticated_user = authenticate(
            username=user.username,
            password=password,
        )

        if authenticated_user is None:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        attrs["user"] = authenticated_user

        return attrs



class ProfileSerializer(serializers.ModelSerializer):

    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "profile_image",
        ]

        read_only_fields = [
            "email",
            "username",
        ]

    def get_profile_image(self, obj):

        if obj.profile_image:
            return obj.profile_image.url

        return None



class ForgotPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField()

    def validate(self, attrs):

        email = attrs["email"]

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                {
                    "email": "No account found with this email."
                }
            )

        attrs["user"] = user

        return attrs



class ResetPasswordSerializer(serializers.Serializer):

    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "password": "Passwords do not match."
                }
            )

        return attrs