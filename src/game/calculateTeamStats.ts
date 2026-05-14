import type { Player, Rival, Tactic, TeamStats } from './types';

const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

export function calculatePlayerTeamStats(players: Player[], tactic: Tactic): TeamStats {
  const goalkeeper = players.find((player) => player.position === 'ARQ');
  const goalkeeperDefense = goalkeeper?.defense ?? average(players.map((player) => player.defense));

  const attackBase = average(players.map((player) => player.attack));
  const defenseBase = average(players.map((player) => player.defense));
  const techniqueBase = average(players.map((player) => player.technique));
  const energyBase = average(players.map((player) => player.energy));
  const mentalityBase = average(players.map((player) => player.mentality));
  const charismaBase = average(players.map((player) => player.charisma));

  return {
    attack: Math.round(attackBase * 0.45 + techniqueBase * 0.25 + energyBase * 0.15 + tactic.attackBonus + 4),
    defense: Math.round(defenseBase * 0.45 + mentalityBase * 0.2 + goalkeeperDefense * 0.15 + energyBase * 0.1 + tactic.defenseBonus + 4),
    technique: Math.round(techniqueBase + tactic.techniqueBonus),
    energy: Math.round(energyBase - tactic.energyPenalty),
    mentality: Math.round(mentalityBase + tactic.mentalityBonus),
    charisma: Math.round(charismaBase),
  };
}

export function calculateRivalStats(rival: Rival, tactic: Tactic): TeamStats {
  return {
    attack: Math.round(rival.attack + tactic.attackBonus),
    defense: Math.round(rival.defense + tactic.defenseBonus),
    technique: Math.round(rival.technique + tactic.techniqueBonus),
    energy: Math.round(rival.energy - tactic.energyPenalty),
    mentality: Math.round(rival.mentality + tactic.mentalityBonus),
    charisma: Math.round(rival.charisma),
  };
}
