import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2({
    clientId: (process.env.CLIENT_ID || "").toString(),
    clientSecret: (process.env.CLIENT_SECRET || "").toString(),
    redirectUri: (process.env.URL || "").toString() + "/callback",
  });

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: (process.env.SCOPE || "").toString(),
  });

  return NextResponse.json({ authorizeUrl }, { status: 200 });
}
