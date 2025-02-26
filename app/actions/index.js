"use server";

import {
  createUser,
  fundUserByCredentials,
  updateGoing,
  updateInterseted,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerFormAction(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  console.log(created);
  redirect("/login");
}

export async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await fundUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

export async function addInterest(eventId, authId) {
  try {
    await updateInterseted(eventId, authId);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
}

export async function addGogin_ids(eventId, auth) {
  try {
    await updateGoing(eventId, auth?.id);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
  redirect("/");
}
