"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
          <p className="text-gray-600 mb-8">
            Please login or sign up to continue.
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => router.push("/login")} className="w-full">
              Login
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              variant="outline"
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
