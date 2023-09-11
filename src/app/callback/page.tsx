"use client";

import axios from "axios";
import { Credentials } from "google-auth-library";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [codeState, setCodeState] = useState<string | null>(null);
  const [tokensState, setTokensState] = useState<Credentials | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const code = searchParams.get("code");
      if (!code) return;
      setCodeState(code);
      const res = await axios.post("/api/get-google-auth-token", {
        authorizationCode: code,
      });
      const { tokens } = res.data;
      setTokensState(tokens);
    })();
  }, [searchParams]);

  const handleCreateFile = async () => {
    try {
      if (!tokensState) {
        throw new Error("Tokens are not available.");
      }
      const response = await axios.post("/api/create-doc", {
        tokens: tokensState,
      });
      if (response.data.success) {
        setDocumentId(response.data.documentId);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <main>
      <p>Hello World!</p>
      <p>code: {codeState}</p>
      <p>tokens: {JSON.stringify(tokensState)}</p>
      <button onClick={handleCreateFile}>Create a file</button>
      {documentId && <p>Document Created! ID: {documentId}</p>}
    </main>
  );
}
