import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/database/models/User.model";
import { connectToDatabase } from "@/database/db.config";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "@/app.config";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };
  const { username, password } = body;
  if (!username)
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  if (!password)
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  await connectToDatabase();
  const userFound = await UserModel.findOne({ username }).lean();
  if (!userFound)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  if (!compareSync(password, userFound.password))
    return NextResponse.json(
      { message: "Password incorrect" },
      { status: 401 }
    );

  await connectToDatabase();
  const response = NextResponse.json({ user: userFound });
  const token = sign(userFound, JWT_SECRET, { expiresIn: 1000 * 60 * 60 * 24 });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  return response;
}
