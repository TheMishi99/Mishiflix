import { JWT_SECRET } from "@/app.config";
import { User } from "@/types/user-types";
import { jwtVerify } from "jose";

export function delimitString({
  phrase,
  max,
}: {
  phrase: string;
  max: number;
}) {
  const substring = phrase.substring(0, max);
  if (phrase.length < max) return phrase;
  else return substring + "...";
}

export async function decodeToken(token: string): Promise<User | null> {
  try {
    // Decodifica el token usando el secreto
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload as User;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
