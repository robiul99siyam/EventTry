// import eventModel from "@/models/events-models";

import { Events } from "@/models/events-models";
import { User } from "@/models/users-models";
import { replaceId, replaceIdObject } from "@/utils";
import mongoose from "mongoose";

export async function getAllEvents({ query }) {
  try {
    let events = [];
    if (query) {
      const regex = new RegExp(query, "i");
      events = await Events.find({ name: { $regex: regex } }).lean();
    } else {
      events = await Events.find().lean();
    }
    return JSON.parse(JSON.stringify(replaceId(events)));
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function getEventById(eventId) {
  try {
    const event = await Events.findById(eventId).lean();
    return JSON.parse(JSON.stringify(replaceIdObject(event))); // Force plain object
  } catch (error) {
    console.error("Error fetching event:", error);
  }
}

export async function createUser(user) {
  return await User.create(user);
}

export async function fundUserByCredentials(credentials) {
  const user = await User.findOne(credentials).lean();
  if (user) {
    return replaceIdObject(user);
  } else {
    return null;
  }
}

export async function updateInterseted(eventId, authId) {
  const event = await Events.findById(eventId);

  if (event) {
    const fundUserId = await event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (fundUserId) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
  }
}

export async function updateGoing(eventId, authId) {
  const event = await Events.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
}
