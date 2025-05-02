import { JWT_SECRET, NODE_ENV } from "@/app.config";
import { connectToDatabase } from "@/database/db.config";
import UserModel from "@/database/models/User.model";
import { hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
    avatar?: string;
  };
  const { username, password, avatar } = body;
  if (!username || !password || !avatar)
    return NextResponse.json(
      { message: "Username, password and avatar are required" },
      { status: 400 }
    );
  await connectToDatabase();
  const newUser = (
    await UserModel.create({
      avatar,
      username,
      password: hashSync(password, 12),
    })
  ).toJSON();
  const response = NextResponse.json({ user: newUser });
  const token = sign(newUser, JWT_SECRET, { expiresIn: 1000 * 60 * 60 * 24 });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  return response;
}
