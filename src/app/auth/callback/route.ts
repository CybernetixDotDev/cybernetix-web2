import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  // Use a plain response (not NextResponse.next()) to attach cookies
  const cookieProxy = new NextResponse(null, { status: 200 });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieProxy.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieProxy.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  if (code) {
    // Exchange the OAuth (or magic-link) code for a session; sets sb-* cookies on cookieProxy
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Single, clean redirect to target (no query string), preserving cookies we just set
  const redirectUrl = new URL(next, url.origin);
  return NextResponse.redirect(redirectUrl, { headers: cookieProxy.headers });
}
