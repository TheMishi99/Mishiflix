import { NODE_ENV } from "@/app.config";
import { ApiUserResponse } from "@/types/api-types";
import { decodeToken } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json(
      { message: "Token not provided" },
      { status: 401 }
    );
  const userLogged = await decodeToken(token);
  if (!userLogged)
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  
  const apiUserResponse: ApiUserResponse = { user: userLogged };
  const response = NextResponse.json(apiUserResponse);
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  return response;
}
