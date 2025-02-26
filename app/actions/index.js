"use server";

import { createUser, fundUserByCredentials } from "@/db/queries";
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
    if (found) {
      redirect("/");
      return true;
    } else {
      throw new Error("Invalid email or password");
    }
    return found;
  } catch (error) {
    throw error;
  }
}
