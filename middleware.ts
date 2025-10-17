// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Only runs for /dashboard (see matcher below)
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  // Refresh cookies if needed
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/join";
    redirectUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl, { headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ["/dashboard"],
};
