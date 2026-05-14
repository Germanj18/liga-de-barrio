import type { Tactic, TacticId } from '../game/types';

export function TacticSelector({
  tactics,
  selectedTactic,
  onChange,
}: {
  tactics: Tactic[];
  selectedTactic: TacticId;
  onChange: (value: TacticId) => void;
}) {
  const tactic = tactics.find((item) => item.id === selectedTactic);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg shadow-black/20">
      <label className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200" htmlFor="tactic">
        Táctica
      </label>
      <select
        id="tactic"
        value={selectedTactic}
        onChange={(event) => onChange(event.target.value as TacticId)}
        className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none ring-emerald-300 transition focus:ring-2"
      >
        {tactics.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {tactic ? <p className="mt-3 text-sm text-slate-300">{tactic.description}</p> : null}
    </div>
  );
}
