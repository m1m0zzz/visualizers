import type { NextRequest } from "next/server"
import { NextResponse, userAgent } from "next/server"

export default function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  const qApp = nextUrl.searchParams.get("app")
  const { device } = userAgent(request)
  const isDesktop = device.type == "desktop" || device.type == undefined

  console.log(nextUrl.pathname)
  console.log("match!", `"${nextUrl.searchParams.toString()}"`, device.type)

  if (nextUrl.pathname == "/garden-weeds/notice") {
    return NextResponse.next()
  }

  if (isDesktop) {
    if (qApp) {
      nextUrl.searchParams.delete("app")
      return NextResponse.redirect(nextUrl)
    } else {
      return NextResponse.next()
    }
  } else {
    if (qApp == "mobile") {
      return NextResponse.next()
    } else {
      console.log("routing mobile")
      nextUrl.pathname = "/garden-weeds/notice"
      return NextResponse.rewrite(nextUrl)
    }
  }
}

export const config = {
  matcher: "/garden-weeds/:path*",
}
