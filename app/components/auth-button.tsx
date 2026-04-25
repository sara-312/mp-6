"use client";

import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
  signedIn: boolean;
};

export function AuthButton({ signedIn }: AuthButtonProps) {
  if (signedIn) {
    return (
      <button
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800"
      onClick={() => signIn("github")}
      type="button"
    >
      Sign in with GitHub
    </button>
  );
}
