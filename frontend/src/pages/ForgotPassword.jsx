import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../services/authService";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";

import { Helmet } from "react-helmet-async";


function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const data = await forgotPassword(email.trim());

      toast.success(
        data.message ||
          "Password reset link has been sent to your email."
      );

      setEmail("");
    } 
    catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to send reset email.";

      toast.error(message);
    } 
    finally {
      setLoading(false);
    }
  }

return (
  <>

    <Helmet>
      <title>Forgot Password | Spendora</title>
      <meta
        name="description"
        content="Reset your Spendora account password."
      />
    </Helmet>
    
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl">

        <CardContent className="p-5 sm:p-8">

          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Forgot Password
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-2">

              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-10 rounded-xl text-sm sm:h-11"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl text-sm sm:h-12"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center sm:mt-8">
            <Link
              to="/login"
              className="text-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </CardContent>

      </Card>
    </div>

  </>
);

}

export default ForgotPassword;