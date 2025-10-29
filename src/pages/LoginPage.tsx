import { useState } from "react";

import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log("Login with:", form);
  };

  return (
    <div className="bg-[#111827] min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1F2937] text-white shadow-2xl shadow-purple-900/30 border border-gray-700 rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-0">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-purple-500/10 ring-1 ring-purple-400/20">
              <LogIn className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-purple-400 tracking-wide">
            Welcome Back
          </CardTitle>
          <p className="text-gray-400 text-sm">Login to continue your work</p>
        </CardHeader>

        <CardContent className="mt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="pl-10 bg-gray-800 text-gray-100 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40 rounded-lg"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2 text-gray-400 w-5 h-5" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-gray-800 text-gray-100 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40 rounded-lg"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2 text-gray-400 hover:text-purple-400 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold text-white rounded-lg py-2 shadow-md hover:shadow-purple-500/20"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
