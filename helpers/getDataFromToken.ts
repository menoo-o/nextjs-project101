import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string; // Adjust this type based on your token structure
  email: string;
  username: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;
    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
