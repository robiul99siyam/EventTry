import { getAllEvents } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(_request) {
  try {
    const data = await getAllEvents();
    console.log("API Response Data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
