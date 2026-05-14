# Liga de Barrio

Prototipo inicial de **Liga de Barrio**, un juego de fútbol 5 de barrio con simulación rápida, colección de jugadores, tácticas y humor de potrero.

## Qué incluye esta versión

- Proyecto Next.js con TypeScript y Tailwind CSS.
- Pantalla principal responsive.
- Cinco titulares iniciales.
- Tres rivales ficticios.
- Selector de táctica.
- Motor de simulación de partido.
- Eventos minuto a minuto.
- Resultado final, monedas, XP y cambio de moral.

## Loop probado

1. Ver tu club y titulares.
2. Elegir una táctica.
3. Jugar un partido simulado.
4. Leer el relato minuto a minuto.
5. Ver resultado final.
6. Ganar monedas y experiencia.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Después abrí:

```bash
http://localhost:3000
```

## Estructura principal

```txt
app/
  page.tsx
  layout.tsx
  globals.css
src/
  components/
    MatchSimulator.tsx
    MatchEvents.tsx
    PlayerCard.tsx
    TacticSelector.tsx
  data/
    players.ts
    rivals.ts
    tactics.ts
  game/
    calculateTeamStats.ts
    rewards.ts
    simulateMatch.ts
    types.ts
```

## Próximos pasos sugeridos

1. Permitir elegir rival.
2. Agregar más jugadores.
3. Crear sistema de sobres.
4. Guardar monedas y XP.
5. Agregar Supabase para usuarios y progreso.
6. Crear una primera liga con tabla de posiciones.

## Estado

Versión inicial sin base de datos, login ni persistencia. Todo corre con datos fijos en memoria para validar si el corazón del juego es divertido.
