import EventDetails from "@/components/details/EventDetails";
import EventVenu from "@/components/details/EventVenu";
import HeroSection from "@/components/details/HeroSection";

export default function DetailsPage() {
  return (
    <div>
      <HeroSection />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails />
          <EventVenu />
        </div>
      </section>
    </div>
  );
}
