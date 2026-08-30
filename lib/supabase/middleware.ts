import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const isCmsRoute = pathname.startsWith("/cms");
    const isLoginRoute = pathname === "/cms/login";

    if (isCmsRoute && !isLoginRoute && !user) {
        const url = request.nextUrl.clone();
        url.pathname = "/cms/login";
        return NextResponse.redirect(url);
    }

    if (isLoginRoute && user) {
        const url = request.nextUrl.clone();
        url.pathname = "/cms";
        return NextResponse.redirect(url);
    }

    if (isCmsRoute) {
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    return response;
}