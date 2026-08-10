import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, getProfile } from "../services/authService";
import { useUser } from "../context/UserContext";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Helmet } from "react-helmet-async";

function Login() {

  const { setUser } = useUser();

  const navigate = useNavigate();

  const [form, setForm] = useState({email: "", password: ""});

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

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);

      const profile = await getProfile();

      setUser(profile);

      toast.success("Login successful!");

      navigate("/");
    } 
    catch (err) {
      const message =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Invalid email or password.";

      toast.error(message);
    } 
    finally {
      setLoading(false);
    }
  }

return (
  <>

      <Helmet>
        <title>Login | Spendora</title>
        <meta
          name="description"
          content="Login to your Spendora account."
        />
      </Helmet>
    
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl">

        <CardContent className="p-5 sm:p-8">

          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Login to your Spendora account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
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
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className="h-10 rounded-xl text-sm sm:h-11"
                required
              />
            </div>

            <div className="flex justify-end pt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="h-11 w-full rounded-xl text-sm sm:h-12"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </div>

        </CardContent>

      </Card>
    </div>
    
  </>
);

}

export default Login;