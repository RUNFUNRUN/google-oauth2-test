import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { authorizationCode } = await req.json();

  const oauth2Client = new google.auth.OAuth2({
    clientId: (process.env.CLIENT_ID || "").toString(),
    clientSecret: (process.env.CLIENT_SECRET || "").toString(),
    redirectUri: (process.env.URL || "").toString() + "/callback",
  });

  const response = await oauth2Client.getToken(authorizationCode);
  return NextResponse.json(
    { tokens: response.tokens },
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
