export type Position = 'ARQ' | 'DEF' | 'MED' | 'DEL' | 'COM';

export type Rarity = 'Común' | 'Picante' | 'Crack de Barrio' | 'Leyenda del Potrero' | 'Mítico';

export type TacticId = 'press' | 'counter' | 'possession' | 'long_ball' | 'defend';

export type Player = {
  id: string;
  name: string;
  nickname: string;
  position: Position;
  rarity: Rarity;
  attack: number;
  defense: number;
  technique: number;
  energy: number;
  mentality: number;
  charisma: number;
  skillName: string;
  skillDescription: string;
  quote: string;
};

export type Tactic = {
  id: TacticId;
  name: string;
  description: string;
  attackBonus: number;
  defenseBonus: number;
  techniqueBonus: number;
  mentalityBonus: number;
  energyPenalty: number;
};

export type Rival = {
  id: string;
  name: string;
  difficulty: 'baja' | 'media' | 'alta';
  style: string;
  attack: number;
  defense: number;
  technique: number;
  energy: number;
  mentality: number;
  charisma: number;
  tacticId: TacticId;
};

export type TeamStats = {
  attack: number;
  defense: number;
  technique: number;
  energy: number;
  mentality: number;
  charisma: number;
};

export type MatchEvent = {
  minute: number;
  text: string;
  type: 'goal' | 'save' | 'chance' | 'funny' | 'skill' | 'mistake' | 'control';
  goalFor?: 'user' | 'rival';
};

export type MatchResult = {
  userGoals: number;
  rivalGoals: number;
  events: MatchEvent[];
  coins: number;
  xp: number;
  moraleChange: 'sube' | 'igual' | 'baja';
  summary: string;
};
