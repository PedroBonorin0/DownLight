"use client"; // Error components must be Client Components

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (error.message === "401") {
      signOut();
    }
  }, [error]);

  return (
    <div>
      {error.message === "401" ? (
        <h2>Não autorizado!</h2>
      ) : (
        <h2>Ocorreu um erro!</h2>
      )}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
