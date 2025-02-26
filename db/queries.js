// import eventModel from "@/models/events-models";

import { Events } from "@/models/events-models";
import { User } from "@/models/users-models";
import connectMongo from "@/services/mongodb";
import { repleaceId, repleaceIdObject } from "@/utils";

export async function getAllEvents() {
  try {
    await connectMongo();
    const events = await Events.find().lean();
    return repleaceId(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function getEventById(eventId) {
  const event = await Events.findById(eventId).lean();
  return repleaceIdObject(event);
}

export async function createUser(user) {
  return await User.create(user);
}
