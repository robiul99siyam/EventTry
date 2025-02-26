"use client";
import { addInterest } from "@/app/actions";
import { useAuth } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButton({
  eventId,
  interestedUserIds,
  isgoingUserId,
  fromDetails = false,
}) {
  const { auth } = useAuth();

  const InterestId = interestedUserIds?.find((id) => id === auth?.id);
  const isgoing = isgoingUserId?.find((id) => id === auth?.id);

  const [isInterest, setInterset] = useState(InterestId);
  const [going, setGoing] = useState(isgoing);
  console.log(going);
  const router = useRouter();
  async function toggleEvent() {
    if (auth) {
      addInterest(eventId, auth?.id);
      setInterset(!isInterest);
    } else {
      router.push("/login");
    }
  }

  function markGoing() {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  }
  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={toggleEvent}
        className={`w-full ${
          isInterest && "bg-indigo-600 hover:bg-indigo-800"
        }`}
      >
        Interested
      </button>
      <button
        disabled={auth && going}
        onClick={markGoing}
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
}
