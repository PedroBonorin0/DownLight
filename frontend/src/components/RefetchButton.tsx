"use client";
import { Loading } from "./Icons/Loading";

interface Props {
  refetch: () => Promise<unknown>;
  loading: boolean;
}

export function RefetchButton({ loading, refetch }: Props) {
  return (
    <button type="button" onClick={() => refetch()} disabled={loading}>
      <Loading
        className={`mb-2 ml-2 h-4 w-4 text-gray-600 hover:cursor-pointer hover:text-black ${
          loading && "animate-spin hover:cursor-not-allowed "
        }`}
      />
    </button>
  );
}
