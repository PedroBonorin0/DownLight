"use client";
import { Loading } from "./Icons/Loading";

interface Props {
  refetch: () => Promise<unknown>;
  loading: boolean;
}

export function RefetchButton({ loading, refetch }: Props) {
  return (
    <button
      type="button"
      onClick={() => refetch()}
      disabled={loading}
      className="mb-2 ml-2 rounded-full p-1 hover:cursor-pointer hover:bg-gray-100 disabled:animate-spin disabled:hover:cursor-not-allowed"
    >
      <Loading className=" h-4 w-4 text-gray-600" />
    </button>
  );
}
