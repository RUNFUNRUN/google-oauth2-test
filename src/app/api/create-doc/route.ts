import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tokens } = await req.json();
    const oauth2Client = new google.auth.OAuth2({
      clientId: (process.env.CLIENT_ID || "").toString(),
      clientSecret: (process.env.CLIENT_SECRET || "").toString(),
      redirectUri: (process.env.URL || "").toString() + "/callback",
    });
    oauth2Client.setCredentials(tokens);

    const docs = google.docs({ version: "v1", auth: oauth2Client });
    const doc = await docs.documents.create();
    if (!doc.data.documentId) {
      throw new Error("Failed to create document.");
    }
    const documentId = doc.data.documentId;
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: "Hello World!",
            },
          },
        ],
      },
    });
    return NextResponse.json({ success: true, documentId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: JSON.stringify(error) }, { status: 500 });
  }
}
