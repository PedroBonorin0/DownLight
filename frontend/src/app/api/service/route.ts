import { backend } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = req.body;

  const res = await backend.post("services", data);

  return NextResponse.json(res);
}
