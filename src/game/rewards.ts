import type { MatchEvent } from './types';

export function calculateRewards(userGoals: number, rivalGoals: number, events: MatchEvent[]) {
  const skillEvents = events.filter((event) => event.type === 'skill').length;

  if (userGoals > rivalGoals) {
    const cleanSheetBonus = rivalGoals === 0 ? 15 : 0;
    const bigWinBonus = userGoals - rivalGoals >= 3 ? 20 : 0;

    return {
      coins: 100 + cleanSheetBonus + bigWinBonus,
      xp: 50 + skillEvents * 10,
      moraleChange: 'sube' as const,
      summary: 'Se ganó con garra. El barrio empieza a hablar de tu equipo.',
    };
  }

  if (userGoals === rivalGoals) {
    return {
      coins: 50,
      xp: 25 + skillEvents * 5,
      moraleChange: 'igual' as const,
      summary: 'Empate trabajado. No fue lindo, pero suma.',
    };
  }

  return {
    coins: 25,
    xp: 10 + skillEvents * 5,
    moraleChange: 'baja' as const,
    summary: 'Derrota dura. Hay que ajustar la táctica y volver a la cancha.',
  };
}
