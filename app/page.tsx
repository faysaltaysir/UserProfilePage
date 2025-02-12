"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-[850px] p-8 text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tighter">
          Welcome to <span className="text-primary">SecureApp</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          A modern, secure authentication system built with Next.js, Tailwind CSS, and shadcn/ui.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/login")} variant="outline" size="lg">
            Login
          </Button>
          <Button onClick={() => router.push("/register")} size="lg">
            Register <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}