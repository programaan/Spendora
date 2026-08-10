import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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

    if (!form.first_name.trim()) {
      toast.error("First name is required.");
      return;
    }

    if (!form.last_name.trim()) {
      toast.error("Last name is required.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!form.password) {
      toast.error("Password is required.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        password: form.password,
        confirm_password: form.confirm_password,
      });

      toast.success(
        "Account created successfully! Please verify your email before logging in."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } 
    catch (err) {
      const message =
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.confirm_password?.[0] ||
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Registration failed.";

      toast.error(message);
    } 
    finally {
      setLoading(false);
    }
  }

return (
  <>

    <Helmet>
      <title>Register | Spendora</title>
      <meta
        name="description"
        content="Create a new Spendora account."
      />
    </Helmet>
    
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-lg rounded-3xl shadow-xl">

        <CardContent className="p-5 sm:p-8">

          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Join Spendora and manage your finances.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">

                <Input
                  name="first_name"
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="h-10 rounded-xl text-sm sm:h-11"
                  required
                />
              </div>

              <div className="space-y-2">

                <Input
                  name="last_name"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="h-10 rounded-xl text-sm sm:h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">

              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="h-10 rounded-xl text-sm sm:h-11"
                required
              />
            </div>

            <div className="space-y-2">

              <Input
                type="password"
                name="password"
                placeholder="Password"
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
              className="h-11 w-full rounded-xl text-sm sm:h-12"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </Button>

          </form>

          <div className="mt-5 text-center text-sm sm:mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>

        </CardContent>

      </Card>
    </div>

  </>
);

}

export default Register;