import type { MatchEvent } from '../game/types';

export function MatchEvents({ events }: { events: MatchEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-slate-300">
        Elegí una táctica y jugá el primer partido.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div key={`${event.minute}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">Min {event.minute}</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{event.text}</p>
        </div>
      ))}
    </div>
  );
}
