import EventDetails from "@/components/details/EventDetails";
import EventVenu from "@/components/details/EventVenu";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params: { id } }) {
  const eventInfo = await getEventById(id);

  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl],
    },
  };
}

export default async function EventDetailsPage({ params: { id } }) {
  const eventDetails = await getEventById(id);

  return (
    <div>
      <HeroSection eventInfo={eventDetails} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails eventDetails={eventDetails} />
          <EventVenu eventDetails={eventDetails} />
        </div>
      </section>
    </div>
  );
}
