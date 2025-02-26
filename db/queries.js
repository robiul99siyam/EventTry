// import eventModel from "@/models/events-models";

import { Events } from "@/models/events-models";
import connectMongo from "@/services/mongodb";

export async function getAllEvents() {
  try {
    await connectMongo();
    const events = await Events.find().lean();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
