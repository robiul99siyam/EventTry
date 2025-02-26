import { getAllEvents } from "@/db/queries";
import connectMongo from "@/services/mongodb";
import EventCard from "./EventCard";

export default async function EventList() {
  await connectMongo(); // Assuming this function connects to MongoDB
  const data = await getAllEvents();
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {/* {} */}
      <EventCard />
    </div>
  );
}
