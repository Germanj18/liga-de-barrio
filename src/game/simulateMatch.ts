import { tactics } from '../data/tactics';
import { calculatePlayerTeamStats, calculateRivalStats } from './calculateTeamStats';
import { calculateRewards } from './rewards';
import type { MatchEvent, MatchResult, Player, Rival, TacticId, TeamStats } from './types';

const eventMinutes = [3, 5, 7, 9, 11, 14, 16, 18, 20];

const funnyEvents = [
  'La pelota se fue por arriba del alambrado y todos miran al mismo culpable.',
  'Discusion corta por una falta. Se sigue jugando, como corresponde.',
  'El arbitro dijo ultima jugada, pero nadie le cree demasiado.',
  'Uno del rival pide aire. El ritmo del partido esta picante.',
];

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function chance(percent: number): boolean {
  return Math.random() * 100 < percent;
}

function goalChance(attack: number, defense: number, energy: number): number {
  const diff = attack - defense;
  const diffBonus = Math.max(-18, Math.min(22, diff * 0.8));
  const energyBonus = energy >= 65 ? 6 : energy < 45 ? -8 : 0;
  return Math.max(12, Math.min(72, 35 + diffBonus + energyBonus));
}

function pickUserPlayer(players: Player[], attacking: boolean): Player {
  const sorted = [...players].sort((a, b) => {
    const aValue = attacking ? a.attack + a.technique : a.defense + a.mentality;
    const bValue = attacking ? b.attack + b.technique : b.defense + b.mentality;
    return bValue - aValue;
  });

  return randomFrom(sorted.slice(0, 3));
}

function maybeSkillEvent(player: Player, minute: number): MatchEvent | null {
  const rarityBonus = {
    'Común': 8,
    Picante: 12,
    'Crack de Barrio': 16,
    'Leyenda del Potrero': 20,
    'Mítico': 25,
  }[player.rarity];

  const lateBonus = minute >= 15 ? 5 : 0;

  if (!chance(rarityBonus + lateBonus)) return null;

  return {
    minute,
    type: 'skill',
    text: `Se activo ${player.skillName}: ${player.nickname} cambio el ritmo de la jugada.`,
  };
}

function createAttackEvent(params: {
  minute: number;
  userStats: TeamStats;
  rivalStats: TeamStats;
  players: Player[];
  userAttacks: boolean;
}): MatchEvent[] {
  const { minute, userStats, rivalStats, players, userAttacks } = params;
  const events: MatchEvent[] = [];

  if (userAttacks) {
    const player = pickUserPlayer(players, true);
    const skill = maybeSkillEvent(player, minute);
    if (skill) events.push(skill);

    const percent = goalChance(userStats.attack + (skill ? 8 : 0), rivalStats.defense, userStats.energy);

    if (chance(percent)) {
      events.push({
        minute,
        type: 'goal',
        goalFor: 'user',
        text: `${player.nickname} encontro el espacio y la mando a guardar. Gol de tu equipo.`,
      });
    } else {
      events.push({
        minute,
        type: 'chance',
        text: `${player.nickname} tuvo una clara, pero el rival aguanto justo a tiempo.`,
      });
    }

    return events;
  }

  const percent = goalChance(rivalStats.attack, userStats.defense, rivalStats.energy);
  const defender = pickUserPlayer(players, false);
  const skill = maybeSkillEvent(defender, minute);
  if (skill) events.push(skill);

  if (skill && chance(55)) {
    events.push({
      minute,
      type: 'save',
      text: `${defender.nickname} aparecio en el momento justo y salvo una jugada complicada.`,
    });
    return events;
  }

  if (chance(percent)) {
    events.push({
      minute,
      type: 'goal',
      goalFor: 'rival',
      text: 'El rival encontro un hueco y desconto con un remate cruzado.',
    });
  } else {
    events.push({
      minute,
      type: 'save',
      text: 'Tu equipo resistio el ataque rival y despejo el peligro.',
    });
  }

  return events;
}

export function simulateMatch(players: Player[], rival: Rival, tacticId: TacticId): MatchResult {
  const tactic = tactics.find((item) => item.id === tacticId) ?? tactics[0];
  const rivalTactic = tactics.find((item) => item.id === rival.tacticId) ?? tactics[0];
  const userStats = calculatePlayerTeamStats(players, tactic);
  const rivalStats = calculateRivalStats(rival, rivalTactic);

  const events: MatchEvent[] = [];
  let userGoals = 0;
  let rivalGoals = 0;

  for (const minute of eventMinutes) {
    if (chance(18)) {
      events.push({ minute, type: 'funny', text: randomFrom(funnyEvents) });
      continue;
    }

    const userMomentum = userStats.attack + userStats.technique + userStats.mentality;
    const rivalMomentum = rivalStats.attack + rivalStats.technique + rivalStats.mentality;
    const userAttacks = chance((userMomentum / (userMomentum + rivalMomentum)) * 100);

    const newEvents = createAttackEvent({
      minute,
      userStats,
      rivalStats,
      players,
      userAttacks,
    });

    for (const event of newEvents) {
      if (event.goalFor === 'user') userGoals += 1;
      if (event.goalFor === 'rival') rivalGoals += 1;
      events.push(event);
    }
  }

  const rewards = calculateRewards(userGoals, rivalGoals, events);

  return {
    userGoals,
    rivalGoals,
    events,
    ...rewards,
  };
}
