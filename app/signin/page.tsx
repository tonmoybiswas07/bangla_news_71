"use client";
import Link from "next/link";
import { Mail, Lock, Eye, UserPlus, ChartNoAxesCombined } from "lucide-react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { authClient, signIn } from "../lib/auth-client";

export default function SigninPage() {
  const handleSignIn = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      imageUrl: string;
    };

    const { data, error } = await signIn.email({
      ...user,
      callbackURL: "/",
    });
    if (data) {
      toast.success("sign in succesfull");
      redirect("/");
    }
    if (error) {
      toast.error("User already exists. Use another email.");
    }
  };

  const googleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

   const gitHubSignIn=async()=>{
     const data = await authClient.signIn.social({
        provider: "github"
    })
  }
  return (
    <main className="flex items-center justify-center bg-white px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-300 p-8 shadow-2xl shadow-cyan-500/5">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>

          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-400 bg-gray-300 px-4 transition focus-within:border-cyan-500">
              <Mail size={19} className="text-gray-600" />

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-400 bg-gray-300 px-4 transition focus-within:border-cyan-500">
              <Lock size={19} className="text-gray-600" />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-500"
              />

              <Eye size={19} className="cursor-pointer text-gray-600" />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-400 hover:to-blue-500"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-400" />
          <span className="text-xs font-medium text-gray-600">
            OR SIGN UP WITH
          </span>
          <div className="h-px flex-1 bg-gray-400" />
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google */}
          <button
            onClick={googleSignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white px-3 py-3 text-sm font-semibold text-gray-700 transition duration-300 hover:border-blue-500 hover:bg-blue-50 active:scale-95"
          >
            Google
          </button>

          {/* GitHub */}
          <button
          onClick={gitHubSignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white px-3 py-3 text-sm font-semibold text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-gray-100 active:scale-95"
          >
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-700 hover:text-blue-900"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
