import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2({
    clientId: (process.env.NEXT_PUBLIC_CLIENT_ID || "").toString(),
    clientSecret: (process.env.NEXT_PUBLIC_CLIENT_SECRET || "").toString(),
    redirectUri: (process.env.NEXT_PUBLIC_URL || "").toString() + "/callback",
  });

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/drive",
  });

  return NextResponse.json({ authorizeUrl }, { status: 200 });
}
