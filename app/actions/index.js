"use server";

import EmailTemplate from "@/components/payment/EmailTemplate";
import {
  createUser,
  fundUserByCredentials,
  getEventById,
  updateGoing,
  updateInterseted,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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

export async function addGogin_ids(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
  redirect("/");
}

export async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(resend);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user?.email,
      subject: `Successfully Registered for the event ${event.name}`,
      react: EmailTemplate({ message }),
    });
    console.log("Email sent successfully:", sent);
  } catch (error) {
    throw error;
  }
}
