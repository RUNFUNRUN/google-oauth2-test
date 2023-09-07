"use client";

import axios from "axios";

export default function Home() {
  const handleAuth = async () => {
    const response = await axios.get("/api/generate-google-oauth-url");
    const { authorizeUrl } = response.data;

    window.open(authorizeUrl, "_blank");
  };
  return (
    <main>
      <div className="text-center">
        <p>test</p>
        <button onClick={handleAuth}>auth</button>
      </div>
    </main>
  );
}
