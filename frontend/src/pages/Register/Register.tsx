import { useState } from "react";
import { useRegister } from "../../api/hooks/useRegister";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import Header from "../../components/Header";
// import googlePnG from "../../assets/g-logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Footer from "../../components/Footer";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";
import { RegisterUserType } from "../../api/api";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<RegisterUserType>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    password: "",
  });

  const { mutate, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    mutate(payload);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Join EQUIBridge to discover opportunities tailored for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>

                    <Input
                      id="username"
                      placeholder="Enter your  username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={form.first_name}
                      placeholder="Enter your first name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      placeholder="Enter your last name"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      placeholder="name@example.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        placeholder="Create a strong password"
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
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters long with a mix of
                      letters, numbers, and symbols.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-equibridge-purple hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-equibridge-purple hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full 
            bg-[var(--color-purple)] hover:bg-purple-600 cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Creating account..." : "Create account"}
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

              {/* <Button
                variant="outline"
                className="text-gray-600 flex items-center justify-center cursor-pointer mx-auto"
              >
                <img
                  src={googlePnG}
                  alt="google-logo-png"
                  className="w-[20px]"
                />
                Google
              </Button> */}
              <GoogleLoginButton />
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-sm text-center text-gray-600 mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold   text-[var(--color-purple)] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
