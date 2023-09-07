"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [codeState, setCodeState] = useState<string | null>(null);
  const [tokensState, setTokensState] = useState<Credential | null>(null);

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
  }, [searchParams.get("code")]);

  return (
    <main>
      <p>Hello World!</p>
      <p>code: {codeState}</p>
      <p>tokens: {JSON.stringify(tokensState)}</p>
    </main>
  );
}
