import { format } from "date-fns";
import { notFound } from "next/navigation";
import { getRestaurantBySlug } from "@/features/reservations/service";
import { GuestNav } from "@/components/layout/nav";
import { formatMoney } from "@/lib/utils";
import { BookForm } from "@/features/booking/book-form";
import { EmptyState } from "@/components/ui/states";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) notFound();

  const events = restaurant.diningEvents;

  return (
    <div className="min-h-screen">
      <GuestNav restaurantName={restaurant.name} />
      <main className="mx-auto max-w-[40rem] px-8 py-10">
        <header className="mb-10">
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Reservations</p>
          <h1 className="mt-2 text-[length:var(--tos-text-title)] text-tos-text-strong">
            {restaurant.tagline ?? "An evening at the counter"}
          </h1>
          <p className="mt-3 text-sm text-tos-text-muted">{restaurant.description}</p>
        </header>

        {events.length === 0 ? (
          <EmptyState title="No public evenings" description="Please check again soon." />
        ) : (
          <ul className="space-y-10">
            {events.map((event) => {
              const remaining = event.capacity - event.seatsHeld - event.seatsBooked;
              return (
                <li
                  key={event.id}
                  className="border-t border-tos-border-subtle pt-8 first:border-0 first:pt-0"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-medium text-tos-text-strong">{event.title}</h2>
                    {event.subtitle ? (
                      <p className="mt-1 text-sm text-tos-text-muted">{event.subtitle}</p>
                    ) : null}
                    <p className="mt-3 text-sm text-tos-text">
                      {format(event.startsAt, "EEEE d MMMM · HH:mm")} ·{" "}
                      {formatMoney(event.priceCents, event.currency)} per guest
                    </p>
                    <p className="mt-1 text-xs text-tos-text-faint">
                      {remaining} seat{remaining === 1 ? "" : "s"} remaining · Payment held until
                      attendance
                    </p>
                    {event.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">
                        {event.description}
                      </p>
                    ) : null}
                  </div>
                  <BookForm
                    restaurantSlug={restaurant.slug}
                    eventSlug={event.slug}
                    maxParty={Math.max(1, remaining)}
                    disabled={remaining < 1}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
