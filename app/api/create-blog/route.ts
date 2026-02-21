"use server";

import { NextResponse } from "next/server";

export async function POST() {
  console.log("hello");
  return NextResponse.json({ message: "Blog created successfully" });
}
