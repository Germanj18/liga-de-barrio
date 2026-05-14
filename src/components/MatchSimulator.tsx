'use client';

import { useMemo, useState } from 'react';
import { rivals } from '../data/rivals';
import { startingPlayers } from '../data/players';
import { tactics } from '../data/tactics';
import { simulateMatch } from '../game/simulateMatch';
import type { MatchResult, TacticId } from '../game/types';
import { MatchEvents } from './MatchEvents';
import { PlayerCard } from './PlayerCard';
import { TacticSelector } from './TacticSelector';

export function MatchSimulator() {
  const [selectedTactic, setSelectedTactic] = useState<TacticId>('counter');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [matchNumber, setMatchNumber] = useState(0);

  const rival = rivals[matchNumber % rivals.length];

  const record = useMemo(() => {
    if (!result) return null;
    if (result.userGoals > result.rivalGoals) return 'Victoria';
    if (result.userGoals === result.rivalGoals) return 'Empate';
    return 'Derrota';
  }, [result]);

  function playMatch() {
    const nextResult = simulateMatch(startingPlayers, rival, selectedTactic);
    setResult(nextResult);
    setMatchNumber((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#14532d,#0f172a_45%,#020617_100%)] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-200">Prototipo v0.1</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Liga de Barrio</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
                Armá tu club de fútbol 5, elegí la táctica y jugá un partido rápido contra equipos del potrero.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-100">Próximo rival</p>
              <h2 className="mt-2 text-2xl font-black">{rival.name}</h2>
              <p className="mt-2 text-sm text-emerald-100">Dificultad: {rival.difficulty}</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{rival.style}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <TacticSelector tactics={tactics} selectedTactic={selectedTactic} onChange={setSelectedTactic} />

            <button
              type="button"
              onClick={playMatch}
              className="w-full rounded-2xl bg-emerald-400 px-6 py-4 text-lg font-black text-slate-950 shadow-xl shadow-emerald-950/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Jugar partido
            </button>

            {result ? (
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">Resultado</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">Los Descontrolados FC</p>
                    <p className="text-5xl font-black">{result.userGoals}</p>
                  </div>
                  <p className="pb-2 text-2xl font-black text-slate-400">-</p>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">{rivals[(matchNumber - 1 + rivals.length) % rivals.length].name}</p>
                    <p className="text-5xl font-black">{result.rivalGoals}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-slate-950/50 p-4">
                  <p className="text-xl font-black text-amber-200">{record}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{result.summary}</p>
                  <p className="mt-3 text-sm font-bold text-emerald-200">
                    +{result.coins} monedas · +{result.xp} XP · Moral {result.moraleChange}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/20">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">Relato del partido</p>
            <div className="mt-4">
              <MatchEvents events={result?.events ?? []} />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">Titulares</p>
              <h2 className="mt-2 text-2xl font-black">Los Descontrolados FC</h2>
            </div>
            <p className="hidden text-sm text-slate-300 md:block">Primer plantel fijo para validar el motor.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {startingPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
