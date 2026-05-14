import type { Player } from '../game/types';

export function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{player.position}</p>
          <h3 className="mt-1 text-lg font-black text-white">{player.nickname}</h3>
          <p className="mt-1 text-sm text-slate-300">{player.rarity}</p>
        </div>
        <div className="rounded-xl bg-emerald-400/20 px-3 py-2 text-center">
          <p className="text-xs text-emerald-100">TEC</p>
          <p className="text-xl font-black text-emerald-200">{player.technique}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-xl bg-slate-950/40 p-2">
          <p className="text-slate-400">ATQ</p>
          <p className="font-bold">{player.attack}</p>
        </div>
        <div className="rounded-xl bg-slate-950/40 p-2">
          <p className="text-slate-400">DEF</p>
          <p className="font-bold">{player.defense}</p>
        </div>
        <div className="rounded-xl bg-slate-950/40 p-2">
          <p className="text-slate-400">ENE</p>
          <p className="font-bold">{player.energy}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-950/40 p-3">
        <p className="text-sm font-bold text-amber-200">{player.skillName}</p>
        <p className="mt-1 text-sm text-slate-300">{player.skillDescription}</p>
      </div>
    </article>
  );
}
