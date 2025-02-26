import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    <div className="mt">
      <section className="container">
        <Header />
        <EventList />
      </section>
    </div>
  );
}
