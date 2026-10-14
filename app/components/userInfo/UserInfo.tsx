
"use client";

import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import {
  UserRound,
  Mail,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut=async()=>{
    await authClient.signOut();
    toast.success("Sign Out successfull")
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md">

          {/* User Profile */}
          <div className="flex min-w-0 items-center gap-3 px-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-md shadow-blue-500/20">
              <UserRound size={23} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800">
                {user.name || "Welcome User"}
              </p>

              <div className="flex items-center gap-1.5">
                <Mail size={13} className="shrink-0 text-gray-400" />
                <p className="max-w-[160px] truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-9 w-px bg-gray-200" />

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="group flex shrink-0 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95"
          >
            <LogOut
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Sign In */}
          <Link
            href="/signin"
            className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95"
          >
            <LogIn
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            সাইন ইন
          </Link>

          {/* Sign Up */}
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg active:scale-95"
          >
            <UserPlus
              size={17}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
