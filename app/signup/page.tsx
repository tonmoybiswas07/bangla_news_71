"use client";
import Link from "next/link";
import { User, Mail, Lock, Upload, Eye, UserPlus } from "lucide-react";

import { authClient, signUp } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const handleSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      imageUrl: string;
    };
    console.log(user);

    const { data, error } = await signUp.email({
      ...user,
      callbackURL: "/",
    });
    if (data) {
      toast.success("sign up succesfull");
      redirect("/");
    }
    if (error) {
      toast.error("User already exists. Use another email.");
    }
  };

  const googleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const gitHubSignUp=async()=>{
     const data = await authClient.signIn.social({
        provider: "github"
    })
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-300 p-8 shadow-2xl shadow-cyan-500/5">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold">Sign Up</h1>

          <p className="mt-2 text-sm text-gray-400">
            Join us and get started today.
          </p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Profile Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Profile Image URL
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-300 px-4 transition focus-within:border-cyan-400">
              <Upload size={19} className="text-gray-400" />

              <input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-300  px-4 transition focus-within:border-cyan-400">
              <User size={19} className="text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-300  px-4 transition focus-within:border-cyan-400">
              <Mail size={19} className="text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-300  px-4 transition focus-within:border-cyan-400">
              <Lock size={19} className="text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-500"
              />
              <Eye size={19} className="text-gray-400" />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-400 hover:to-blue-500"
          >
            Create Account
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
            onClick={googleSignUp}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white px-3 py-3 text-sm font-semibold text-gray-700 transition duration-300 hover:border-blue-500 hover:bg-blue-50 active:scale-95"
          >
            Google
          </button>

          {/* GitHub */}
          <button
          onClick={gitHubSignUp}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white px-3 py-3 text-sm font-semibold text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-gray-100 active:scale-95"
          >
            GitHub
          </button>
        </div>
        ```
        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
