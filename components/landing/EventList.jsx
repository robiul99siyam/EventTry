import { getAllEvents } from "@/db/queries";
import connectMongo from "@/services/mongodb";
import EventCard from "./EventCard";

export default async function EventList({ query }) {
  await connectMongo(); // Assuming this function connects to MongoDB
  const AllEvents = await getAllEvents({ query });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {/* {} */}

      {AllEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
