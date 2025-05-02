import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json(
      { message: "Token not provided" },
      { status: 401 }
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("token");
  return response;
}
