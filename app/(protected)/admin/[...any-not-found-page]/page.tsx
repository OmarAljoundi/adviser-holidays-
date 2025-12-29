"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { LinearBackground } from "../liner-bg";

export default function NotFound() {
  return (
    <ContentWrapper breadcrumbs={[]}>
      <LinearBackground className="text-foreground">
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="relative mb-4">
            <svg
              className="animate-spin-slow h-48 w-48 text-muted-foreground/20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
              />
              <path
                d="M50 10 C 50 10, 90 50, 50 90"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-extrabold tracking-tighter text-primary">
                404
              </span>
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Oops! Page Not Found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The page you&apos;re looking for seems to have wandered off into the
            digital wilderness.
          </p>
          <Link href="/admin">
            <Button size="lg" className="gap-2">
              Return Home
            </Button>
          </Link>
        </div>
      </LinearBackground>
    </ContentWrapper>
  );
}
