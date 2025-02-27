import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import { Suspense } from "react";

export default function Home({ searchParams: { query } }) {
  return (
    <div className="mt">
      <section className="container">
        <Header />

        <Suspense
          key={query}
          fallback={<h1 className="text-center">loading data...</h1>}
        >
          <EventList query={query} />
        </Suspense>
      </section>
    </div>
  );
}
