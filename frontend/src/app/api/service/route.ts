import { backend } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = req.body;
  console.log(data);
  const res = await backend.post("services", data);
  console.log(res);
  return NextResponse.json(res);
}
