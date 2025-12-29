"use client";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import React, { useEffect } from "react";

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const hasUser = !!session;

  useEffect(() => {
    if (isPending) return;

    if (!hasUser) {
      const callbackUrl = encodeURIComponent(
        pathname + (pathname.split("?")[1] ? `?${pathname.split("?")[1]}` : "")
      );
      router.push(`/login?callback=${callbackUrl}`);
    }
  }, [isPending, hasUser, router, pathname]);

  return <React.Fragment>{children}</React.Fragment>;
}
