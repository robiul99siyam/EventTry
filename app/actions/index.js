"use server";

import { createUser } from "@/db/queries";
import { redirect } from "next/navigation";

export async function registerFormAction(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  console.log(created);
  redirect("/login");
}
