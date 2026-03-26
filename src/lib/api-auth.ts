import { NextRequest, NextResponse } from "next/server";

/**
 * Verify admin API requests using a Bearer token.
 * Set ADMIN_API_SECRET in your .env (server-side only).
 * Returns a 401 response if unauthorized, or null if authorized.
 */
export function verifyAdmin(request: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  const auth = request.headers.get("authorization");
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // authorized
}
