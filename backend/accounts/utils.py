from mailjet_rest import Client
from django.conf import settings


api = Client(
    auth=(
        settings.MAILJET_API_KEY,
        settings.MAILJET_SECRET_KEY,
    ),
    version="v3.1",
)


def send_verification_email(user):

    verification_link = (
        f"{settings.FRONTEND_URL}/verify-email/"
        f"{user.verification_token}/"
    )

    data = {
        "Messages": [
            {
                "From": {
                    "Email": settings.MAILJET_FROM_EMAIL,
                    "Name": "Spendora",
                },
                "To": [
                    {
                        "Email": user.email,
                        "Name": user.first_name or user.username,
                    }
                ],
                "Subject": "Verify your Spendora account",

                "HTMLPart": f"""
                <div
                    style="
                        font-family:Arial;
                        max-width:600px;
                        margin:auto;
                        padding:30px;
                    "
                >

                    <h2>
                        Welcome to Spendora 🎉
                    </h2>

                    <p>

                        Hi
                        <b>
                            {user.first_name or user.username}
                        </b>,

                    </p>

                    <p>

                        Thank you for creating your account.

                    </p>

                    <p>

                        Please verify your email by clicking
                        the button below.

                    </p>

                    <br>

                    <a
                        href="{verification_link}"
                        style="
                            background:#2563eb;
                            color:white;
                            padding:14px 30px;
                            text-decoration:none;
                            border-radius:8px;
                            font-weight:bold;
                        "
                    >
                        Verify Email
                    </a>

                    <br><br>

                    <p>

                        Or copy this link into your browser:

                    </p>

                    <p>

                        {verification_link}

                    </p>

                    <hr>

                    <small>

                        If you didn't create this account,
                        simply ignore this email.

                    </small>

                </div>
                """,
            }
        ]
    }

    api.send.create(data=data)



def send_password_reset_email(user):

    reset_link = (
        f"{settings.FRONTEND_URL}/reset-password/"
        f"{user.password_reset_token}/"
    )

    data = {
        "Messages": [
            {
                "From": {
                    "Email": settings.MAILJET_FROM_EMAIL,
                    "Name": "Spendora",
                },
                "To": [
                    {
                        "Email": user.email,
                        "Name": user.first_name or user.username,
                    }
                ],
                "Subject": "Reset your Spendora password",

                "HTMLPart": f"""
                <div
                    style="
                        font-family:Arial;
                        max-width:600px;
                        margin:auto;
                        padding:30px;
                    "
                >

                    <h2>
                        Reset your Spendora password 🔐
                    </h2>

                    <p>
                        Hi
                        <b>
                            {user.first_name or user.username}
                        </b>,
                    </p>

                    <p>
                        We received a request to reset
                        your Spendora account password.
                    </p>

                    <p>
                        Click the button below to create
                        a new password.
                    </p>

                    <br>

                    <a
                        href="{reset_link}"
                        style="
                            background:#2563eb;
                            color:white;
                            padding:14px 30px;
                            text-decoration:none;
                            border-radius:8px;
                            font-weight:bold;
                        "
                    >
                        Reset Password
                    </a>

                    <br><br>

                    <p>
                        Or copy this link into your browser:
                    </p>

                    <p>
                        {reset_link}
                    </p>

                    <hr>

                    <small>
                        This password reset link will expire
                        after 30 minutes.
                    </small>

                    <br><br>

                    <small>
                        If you didn't request a password reset,
                        simply ignore this email.
                    </small>

                </div>
                """,
            }
        ]
    }

    api.send.create(data=data)