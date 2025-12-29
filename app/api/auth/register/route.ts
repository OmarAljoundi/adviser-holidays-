import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const { token, user } = await auth.api.signUpEmail({
    headers: await headers(),
    body: {
      email: "admin@admin.com",
      name: "admin",
      password: "123456789Oo*",
    },
  });

  return NextResponse.json({
    token,
    user,
  });
}
