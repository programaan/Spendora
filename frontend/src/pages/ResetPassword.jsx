import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../services/authService";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Helmet } from "react-helmet-async";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({password: "", confirm_password: ""});

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }

    if (!form.password) {
      toast.error("Password is required.");
      return;
    }

    if (form.password.length < 8) {
      toast.error(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      form.password !== form.confirm_password
    ) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(
        token,
        form.password,
        form.confirm_password
      );

      toast.success(
        data.message ||
          "Password reset successful."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } 
    catch (err) {
      const message =
        err.response?.data?.password?.[0] ||
        err.response?.data?.confirm_password?.[0] ||
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to reset password.";

      toast.error(message);
    } 
    finally {
      setLoading(false);
    }
  }

return (
  <>

    <Helmet>
      <title>Reset Password | Spendora</title>
      <meta
        name="description"
        content="Choose a new password for your Spendora account."
      />
    </Helmet>
    
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl">

        <CardContent className="p-5 sm:p-8">

          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter your new password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            <div className="space-y-2">

              <Input
                type="password"
                name="password"
                placeholder="New Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                className="h-10 rounded-xl text-sm sm:h-11"
                required
              />
            </div>

            <div className="space-y-2">

              <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                value={form.confirm_password}
                onChange={handleChange}
                className="h-10 rounded-xl text-sm sm:h-11"
                required
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-sm sm:h-12"
              disabled={loading}
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </Button>
          </form>

        </CardContent>

      </Card>
    </div>

  </>
);

}

export default ResetPassword;