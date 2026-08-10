import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { verifyEmail } from "../services/authService";

import { toast } from "sonner";

function VerifyEmail() {

    const { token } = useParams();

    const navigate = useNavigate();

    const started = useRef(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (started.current) {
            return;
        }

        started.current = true;

        const verify = async () => {

            if (!token) {
                toast.error("Invalid verification link.");
                setLoading(false);
                return;
            }

            try {

                const data = await verifyEmail(token);

                toast.success(
                    data.message ||
                    "Email verified successfully."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            } 
            catch (err) {

                const message =
                    err.response?.data?.error ||
                    "Unable to verify email.";

                toast.error(message);

                setLoading(false);
            }
        };

        verify();

    }, [token, navigate]);

return (

    <div className="flex min-h-screen items-center justify-center">

        <div className="text-center">

            {loading ? (
                <>
                    <h1 className="text-2xl font-bold">
                        Verifying Email...
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Please wait while we verify your email.
                    </p>
                </>
            ) : (
                <h1 className="text-2xl font-bold">
                    Email Verification
                </h1>
            )}

            </div>

        </div>
        
    );

}

export default VerifyEmail;