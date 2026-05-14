import type { Rival } from '../game/types';

export const rivals: Rival[] = [
  {
    id: 'deportivo-resaca',
    name: 'Deportivo Resaca',
    difficulty: 'media',
    style: 'Equipo tecnico con poca energia al final.',
    attack: 62,
    defense: 56,
    technique: 66,
    energy: 50,
    mentality: 58,
    charisma: 70,
    tacticId: 'possession',
  },
  {
    id: 'real-barrio',
    name: 'Real Barrio FC',
    difficulty: 'baja',
    style: 'Ataca mucho y deja espacios atras.',
    attack: 58,
    defense: 46,
    technique: 55,
    energy: 48,
    mentality: 52,
    charisma: 80,
    tacticId: 'long_ball',
  },
  {
    id: 'los-que-nunca-bajan',
    name: 'Los Que Nunca Bajan',
    difficulty: 'alta',
    style: 'Presionan todo el partido.',
    attack: 65,
    defense: 72,
    technique: 58,
    energy: 84,
    mentality: 78,
    charisma: 50,
    tacticId: 'press',
  }
];
