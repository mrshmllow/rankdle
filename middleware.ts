import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const approver = session?.user.app_metadata["approver"] as
    | boolean
    | undefined;

  const paths = ["/submit"];

  if (
    (!session && paths.some((path) => req.nextUrl.pathname.startsWith(path))) ||
    (req.nextUrl.pathname.startsWith("/approve") && !approver)
  ) {
    // Auth condition not met, redirect
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/account/login";

    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
