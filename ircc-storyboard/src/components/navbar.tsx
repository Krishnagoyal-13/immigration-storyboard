"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-transparent backdrop-blur-md border-b border-border sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold text-primary">
          Immigration Assistant
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <span className="text-muted-foreground">
              Hello, {session.user?.name?.split(" ")[0]}
            </span>
            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/auth" })}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        )}

       
      </div>
    </nav>
  );
}
