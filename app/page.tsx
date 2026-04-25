/* eslint-disable @next/next/no-img-element */
import { AuthButton } from "@/app/components/auth-button";
import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type HomeProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  OAuthSignin: "GitHub sign in could not start. Please try again.",
  OAuthCallback: "GitHub sign in could not finish. Please try again.",
  Configuration: "Missing OAuth environment variables.",
};

export default async function Home({ searchParams }: HomeProps) {
  const host = (await headers()).get("host") ?? "";

  if (host.startsWith("localhost:")) {
    redirect("http://127.0.0.1:3000");
  }

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-950">
      <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            CS391 OAuth Assignment
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Simple GitHub OAuth</h1>
        </div>

        {error ? (
          <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessages[error] ?? "Something went wrong during sign in."}
          </p>
        ) : null}

        {user ? (
          <div>
            <div className="flex items-center gap-4 rounded-md border border-slate-200 p-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.name ?? "GitHub user"} profile picture`}
                  className="h-20 w-20 rounded-full border border-slate-200"
                />
              ) : null}
              <div>
                <p className="text-sm text-slate-500">Signed in as</p>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>
            </div>
            <AuthButton signedIn />
          </div>
        ) : (
          <AuthButton signedIn={false} />
        )}
      </section>
    </main>
  );
}
