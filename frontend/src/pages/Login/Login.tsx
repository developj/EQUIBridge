import { useState } from "react";
import { useLogin } from "../../api/hooks/useLogin";

import Footer from "../../components/Footer";
import { Separator } from "../../components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import googlePnG from "../../assets/g-logo.png";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const { mutate, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Log in to access your personalized opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="username"
                      name="username"
                      value={form.username}
                      placeholder=""
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-equibridge-purple hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[var(--color-purple)] hover hover:bg-purple-600 cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-gray-600 flex items-center justify-center cursor-pointer mx-auto"
              >
                <img
                  src={googlePnG}
                  alt="google-logo-png"
                  className="w-[20px]"
                />
                Google
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-sm text-center text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-equibridge-purple hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
    // <form onSubmit={handleSubmit} className={styles.form}>
    //   <h2>Login</h2>
    //   <input name="username" onChange={handleChange} placeholder="Username" required />
    //   <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
    //   <button type="submit" disabled={isPending}>
    //     {isPending ? 'Logging in...' : 'Login'}
    //   </button>
    // </form>
  );
}
