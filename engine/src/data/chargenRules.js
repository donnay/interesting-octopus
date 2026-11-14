// Official Genesis RPG Character Generation Data & Tables

export const RACES_TABLE_1 = [
  { min: 1, max: 2, name: 'Tanaian', key: 'tanaian' },
  { min: 3, max: 7, name: 'Fenbin', key: 'fenbin' },
  { min: 8, max: 15, name: 'Krane', key: 'krane' },
  { min: 16, max: 24, name: 'Vjesperé', key: 'vjespere' },
  { min: 25, max: 36, name: 'Aracnian', key: 'aracnian', hasSubRoll: true },
  { min: 37, max: 50, name: 'Eebek', key: 'eebek' },
  { min: 51, max: 64, name: 'Human', key: 'human' },
  { min: 65, max: 76, name: 'Mahendoshi', key: 'mahendoshi' },
  { min: 77, max: 85, name: 'Low Kaa', key: 'lowkaa' },
  { min: 86, max: 93, name: 'Gliff', key: 'gliff' },
  { min: 94, max: 97, name: 'Faborian', key: 'faborian' },
  { min: 98, max: 99, name: 'Sooaacoli', key: 'sooaacoli' },
  { min: 100, max: 100, name: 'Tsoegorthin', key: 'tsoegorthin' }
];

export const ARACNIAN_SUB_ROLL = [
  { min: 1, max: 50, subtype: 'Blue', key: 'aracnian_blue', name: 'Aracnian (Blue)' },
  { min: 51, max: 85, subtype: 'Green', key: 'aracnian_green', name: 'Aracnian (Green)' },
  { min: 86, max: 100, subtype: 'Brown', key: 'aracnian_brown', name: 'Aracnian (Brown)' }
];

// Table #1-2: Attributes & Dice Variance
export const ATTRIBUTE_BASES = {
  aracnian: { name: 'Aracnian', ps: 50, ag: 330, co: 130, pr: 155, varianceDice: 3 },
  aracnian_blue: { name: 'Aracnian (Blue)', ps: 50, ag: 330, co: 130, pr: 155, varianceDice: 3 },
  aracnian_green: { name: 'Aracnian (Green)', ps: 50, ag: 330, co: 130, pr: 155, varianceDice: 3 },
  aracnian_brown: { name: 'Aracnian (Brown)', ps: 50, ag: 330, co: 130, pr: 155, varianceDice: 3 },
  eebek: { name: 'Eebek', ps: 50, ag: 15, co: 255, pr: 0, varianceDice: 4 },
  faborian: { name: 'Faborian', ps: 120, ag: 145, co: 95, pr: 110, varianceDice: 6 },
  fenbin: { name: 'Fenbin', ps: 15, ag: 190, co: 125, pr: 70, varianceDice: 2 },
  gliff: { name: 'Gliff', ps: 65, ag: 10, co: 50, pr: 20, varianceDice: 4 },
  human: { name: 'Human', ps: 25, ag: 25, co: 25, pr: 25, varianceDice: 5 },
  krane: { name: 'Krane', ps: 215, ag: 5, co: 85, pr: 15, varianceDice: 4 },
  lowkaa: { name: 'Low Kaa', ps: 40, ag: 50, co: 20, pr: 30, varianceDice: 3 },
  mahendoshi: { name: 'Mahendoshi', ps: 20, ag: 45, co: 170, pr: 80, varianceDice: 4 },
  sooaacoli: { name: 'Sooaacoli', ps: 10, ag: 35, co: 5, pr: 30, varianceDice: 5 },
  tanaian: { name: 'Tanaian', ps: 165, ag: 550, co: 1175, pr: 1850, varianceDice: 0 },
  tsoegorthin: { name: 'Tsoegorthin', ps: 930, ag: 5, co: 575, pr: 15, varianceDice: 2 },
  vjespere: { name: 'Vjesperé', ps: 57, ag: 72, co: 77, pr: 64, varianceDice: 5 }
};

// Table #1-3: Racial Averages
export const RACIAL_AVERAGES = {
  aracnian: { ps: 65, ag: 345, co: 145, pr: 170, aim: 148, brawl: 182, move: 185 },
  aracnian_blue: { ps: 65, ag: 345, co: 145, pr: 170, aim: 148, brawl: 182, move: 185 },
  aracnian_green: { ps: 65, ag: 345, co: 145, pr: 170, aim: 148, brawl: 182, move: 185 },
  aracnian_brown: { ps: 65, ag: 345, co: 145, pr: 170, aim: 148, brawl: 182, move: 185 },
  eebek: { ps: 70, ag: 35, co: 275, pr: 20, aim: 45, brawl: 100, move: 127 },
  faborian: { ps: 150, ag: 75, co: 125, pr: 140, aim: 58, brawl: 123, move: 117 },
  fenbin: { ps: 25, ag: 200, co: 135, pr: 80, aim: 100, brawl: 85, move: 120 },
  gliff: { ps: 85, ag: 30, co: 70, pr: 40, aim: 43, brawl: 56, move: 62 },
  human: { ps: 50, ag: 50, co: 50, pr: 50, aim: 50, brawl: 50, move: 50 },
  krane: { ps: 235, ag: 25, co: 105, pr: 35, aim: 42, brawl: 100, move: 122 },
  lowkaa: { ps: 55, ag: 70, co: 40, pr: 45, aim: 57, brawl: 53, move: 55 },
  mahendoshi: { ps: 40, ag: 65, co: 190, pr: 80, aim: 55, brawl: 94, move: 98 },
  sooaacoli: { ps: 35, ag: 60, co: 30, pr: 55, aim: 53, brawl: 45, move: 42 },
  tanaian: { ps: 165, ag: 550, co: 1175, pr: 1850, aim: 217, brawl: 935, move: 630 },
  tsoegorthin: { ps: 940, ag: 15, co: 585, pr: 25, aim: 38, brawl: 391, move: 513 },
  vjespere: { ps: 95, ag: 105, co: 130, pr: 60, aim: 68, brawl: 98, move: 110 }
};

// Table #1-4: Influence Adjustment by Appearance
export const INFLUENCE_TABLE_4 = [
  { min: 1, max: 1, desc: 'Hideous', mod: -25 },
  { min: 2, max: 4, desc: 'Grotesque', mod: -20 },
  { min: 5, max: 9, desc: 'Repulsive', mod: -15 },
  { min: 10, max: 18, desc: 'Ugly', mod: -10 },
  { min: 19, max: 35, desc: 'Homely', mod: -5 },
  { min: 36, max: 65, desc: 'Average', mod: 0 },
  { min: 66, max: 82, desc: 'Comely', mod: 5 },
  { min: 83, max: 91, desc: 'Good Looking', mod: 10 },
  { min: 92, max: 96, desc: 'Attractive', mod: 15 },
  { min: 97, max: 99, desc: 'Beautiful', mod: 20 },
  { min: 100, max: 100, desc: 'Stunning', mod: 25 }
];

export function getInfluenceMod(appearanceRoll) {
  const row = INFLUENCE_TABLE_4.find(r => appearanceRoll >= r.min && appearanceRoll <= r.max);
  return row || { desc: 'Average', mod: 0 };
}

// Table #1-5: Damage Points per Body Segment (Base numbers)
// AR EE FA FE GL HU KR LO MA SO TA TS VJ
export const DAMAGE_POINTS_TABLE_5 = {
  upperHead:  { ar: 24, ee: 6, fa: 16, fe: 13, gl: 13, hu: 14, kr: 21, lo: 11, ma: 10, so: 8, ta: 33, ts: 70, vj: 15, name: 'Upper Head' },
  lowerHead:  { ar: 27, ee: 7, fa: 18, fe: 14, gl: 14, hu: 16, kr: 24, lo: 13, ma: 11, so: 12, ta: 39, ts: 83, vj: 18, name: 'Lower Head' },
  upperNeck:  { ar: 6, ee: 8, fa: 6, fe: 4, gl: 10, hu: 4, kr: 0, lo: 3, ma: 3, so: 0, ta: 9, ts: 61, vj: 5, name: 'Upper Neck' },
  lowerNeck:  { ar: 6, ee: 9, fa: 6, fe: 4, gl: 12, hu: 4, kr: 0, lo: 3, ma: 3, so: 0, ta: 9, ts: 69, vj: 5, name: 'Lower Neck' },
  upperTorso: { ar: 39, ee: 26, fa: 32, fe: 25, gl: 31, hu: 28, kr: 52, lo: 22, ma: 20, so: 35, ta: 66, ts: 118, vj: 30, name: 'Upper Torso' },
  middleTorso:{ ar: 32, ee: 24, fa: 25, fe: 21, gl: 24, hu: 23, kr: 46, lo: 18, ma: 16, so: 33, ta: 54, ts: 132, vj: 27, name: 'Middle Torso' },
  centralTorso:{ ar: 28, ee: 18, fa: 22, fe: 18, gl: 23, hu: 20, kr: 40, lo: 16, ma: 14, so: 31, ta: 48, ts: 150, vj: 23, name: 'Central Torso' },
  lowerTorso: { ar: 30, ee: 20, fa: 24, fe: 33, gl: 25, hu: 22, kr: 43, lo: 18, ma: 16, so: 33, ta: 50, ts: 164, vj: 25, name: 'Lower Torso' },
  tail:       { ar: 0, ee: 0, fa: 16, fe: 0, gl: 8, hu: 0, kr: 0, lo: 0, ma: 0, so: 0, ta: 0, ts: 10, vj: 60, name: 'Tail' },
  upperArm:   { ar: 22, ee: 14, fa: 18, fe: 14, gl: 8, hu: 16, kr: 32, lo: 13, ma: 11, so: 11, ta: 39, ts: 46, vj: 17, name: 'Upper Arm (ea)' },
  lowerArm:   { ar: 15, ee: 9, fa: 12, fe: 10, gl: 6, hu: 11, kr: 22, lo: 9, ma: 8, so: 9, ta: 27, ts: 41, vj: 18, name: 'Lower Arm (ea)' },
  hand:       { ar: 8, ee: 6, fa: 6, fe: 6, gl: 3, hu: 6, kr: 12, lo: 6, ma: 4, so: 7, ta: 18, ts: 18, vj: 7, name: 'Hand (ea)' },
  upperLeg:   { ar: 44, ee: 28, fa: 34, fe: 28, gl: 38, hu: 32, kr: 64, lo: 26, ma: 22, so: 24, ta: 78, ts: 80, vj: 0, name: 'Upper Leg (ea)' },
  lowerLeg:   { ar: 22, ee: 14, fa: 18, fe: 14, gl: 16, hu: 16, kr: 32, lo: 13, ma: 18, so: 12, ta: 39, ts: 48, vj: 0, name: 'Lower Leg (ea)' },
  foot:       { ar: 5, ee: 6, fa: 7, fe: 5, gl: 10, hu: 6, kr: 14, lo: 7, ma: 4, so: 10, ta: 21, ts: 22, vj: 0, name: 'Foot (ea)' }
};

export const RACE_CODE_MAP = {
  aracnian: 'ar', aracnian_blue: 'ar', aracnian_green: 'ar', aracnian_brown: 'ar',
  eebek: 'ee', faborian: 'fa', fenbin: 'fe', gliff: 'gl', human: 'hu',
  krane: 'kr', lowkaa: 'lo', mahendoshi: 'ma', sooaacoli: 'so', tanaian: 'ta',
  tsoegorthin: 'ts', vjespere: 'vj'
};

// Table #1-6: Background Skill Points by Race
export const BACKGROUND_SKILLS_TABLE_6 = {
  aracnian_blue:  { com: 10, lang: 15, nontech: 10, sci: 18, socio: 5, tech: 12 },
  aracnian_green: { com: 12, lang: 10, nontech: 23, sci: 12, socio: 8, tech: 5 },
  aracnian_brown: { com: 21, lang: 12, nontech: 25, sci: 4, socio: 4, tech: 4 },
  aracnian:       { com: 10, lang: 15, nontech: 10, sci: 18, socio: 5, tech: 12 },
  eebek:          { com: 8,  lang: 5,  nontech: 7,  sci: 16, socio: 25, tech: 9 },
  faborian:       { com: 22, lang: 15, nontech: 20, sci: 3,  socio: 5, tech: 5 },
  fenbin:         { com: 4,  lang: 9,  nontech: 25, sci: 11, socio: 16, tech: 5 },
  gliff:          { com: 14, lang: 8,  nontech: 12, sci: 7,  socio: 4, tech: 25 },
  human:          { com: 10, lang: 14, nontech: 6,  sci: 15, socio: 10, tech: 15 },
  krane:          { com: 25, lang: 3,  nontech: 5,  sci: 10, socio: 5, tech: 17 },
  lowkaa:         { com: 10, lang: 25, nontech: 8,  sci: 5,  socio: 15, tech: 7 },
  mahendoshi:     { com: 12, lang: 20, nontech: 4,  sci: 10, socio: 6, tech: 18 },
  sooaacoli:      { com: 13, lang: 12, nontech: 15, sci: 9,  socio: 10, tech: 11 },
  tanaian:        { com: 12, lang: 1,  nontech: 3,  sci: 25, socio: 5, tech: 24 },
  tsoegorthin:    { com: 25, lang: 5,  nontech: 22, sci: 5,  socio: 3, tech: 10 },
  vjespere:       { com: 5,  lang: 10, nontech: 25, sci: 9,  socio: 15, tech: 6 }
};

// Table #1-10: Average Mass (kg)
export const MASS_TABLE_10 = {
  aracnian_blue:  { male: 71, female: 76 },
  aracnian_green: { male: 85, female: 91 },
  aracnian_brown: { male: 93, female: 100 },
  aracnian:       { male: 71, female: 76 },
  eebek:          { male: 78, female: 72 },
  faborian:       { male: 117, female: 86 },
  fenbin:         { male: 36, female: 34 },
  gliff:          { male: 86, female: 77 },
  human:          { male: 82, female: 69 },
  krane:          { male: 421, female: 373 },
  lowkaa:         { male: 73, female: 58 },
  mahendoshi:     { male: 48, female: 45 },
  sooaacoli:      { male: 55, female: 53 },
  tanaian:        { male: 194, female: 194 },
  tsoegorthin:    { male: 930, female: 930 },
  vjespere:       { male: 137, female: 125 }
};

// Table #1-12: Average Height (meters)
export const HEIGHT_TABLE_12 = {
  aracnian_blue:  { male: 1.96, female: 2.10 },
  aracnian_green: { male: 2.08, female: 2.23 },
  aracnian_brown: { male: 2.27, female: 2.48 },
  aracnian:       { male: 1.96, female: 2.10 },
  eebek:          { male: 1.53, female: 1.53 },
  faborian:       { male: 2.02, female: 1.77 },
  fenbin:         { male: 0.94, female: 0.91 },
  gliff:          { male: 1.42, female: 1.30 },
  human:          { male: 1.84, female: 1.71 },
  krane:          { male: 3.05, female: 2.89 },
  lowkaa:         { male: 1.74, female: 1.63 },
  mahendoshi:     { male: 0.60, female: 0.53 },
  sooaacoli:      { male: 1.12, female: 1.01 },
  tanaian:        { male: 2.40, female: 2.40 },
  tsoegorthin:    { male: 4.18, female: 4.18 },
  vjespere:       { male: 2.73, female: 2.55 }
};

// Table #1-13: Starting Age
export const STARTING_AGE_TABLE_13 = {
  aracnian:    { base: 20, dice: 1, sides: 10, typical: 25 },
  aracnian_blue: { base: 20, dice: 1, sides: 10, typical: 25 },
  aracnian_green:{ base: 20, dice: 1, sides: 10, typical: 25 },
  aracnian_brown:{ base: 20, dice: 1, sides: 10, typical: 25 },
  eebek:       { base: 22, dice: 2, sides: 10, typical: 35 },
  faborian:    { base: 7,  dice: 1, sides: 5,  typical: 13 }, // 1/2:10sd is d5
  fenbin:      { base: 31, dice: 2, sides: 10, typical: 42 },
  gliff:       { base: 0,  dice: 1, sides: 10, typical: 8 },
  human:       { base: 11, dice: 1, sides: 10, typical: 19 },
  krane:       { base: 6,  dice: 1, sides: 10, typical: 14 },
  lowkaa:      { base: 8,  dice: 1, sides: 10, typical: 16 },
  mahendoshi:  { base: 18, dice: 1, sides: 10, typical: 26 },
  sooaacoli:   { base: 14, dice: 1, sides: 10, typical: 22 },
  tanaian:     { base: 0,  dice: 1, sides: 5,  typical: 6 },
  tsoegorthin: { base: 3,  dice: 1, sides: 5,  typical: 9 },
  vjespere:    { base: 9,  dice: 1, sides: 10, typical: 17 }
};

// Table #1-14: Occupations & Starting Wealth (in Dits Đ)
export const OCCUPATIONS_TABLE_14 = [
  { id: 'bounty_hunter', name: 'Bounty Hunter / Assassin', mult: 225, dice: 1, sides: 1000 },
  { id: 'chaendler_chchien', name: "Chaendler (Ch'chien Wa Bow)", mult: 600, dice: 1, sides: 1000 },
  { id: 'chaendler_jjaro', name: 'Chaendler (JJaro Guildsman)', mult: 525, dice: 1, sides: 1000 },
  { id: 'chaendler_stevin', name: 'Chaendler (Stevin Guildsman)', mult: 450, dice: 1, sides: 1000 },
  { id: 'chaendler_free', name: 'Chaendler (Free)', mult: 375, dice: 1, sides: 1000 },
  { id: 'explorer_prospector', name: 'Explorer (Prospector)', mult: 300, dice: 1, sides: 1000 },
  { id: 'explorer_scout', name: 'Explorer (Scout)', mult: 475, dice: 1, sides: 1000 },
  { id: 'investigator_ccop', name: 'Investigator (CCOP Field Agent)', mult: 550, dice: 1, sides: 1000 },
  { id: 'investigator_corp', name: 'Investigator (Corporate Spy)', mult: 575, dice: 1, sides: 1000 },
  { id: 'investigator_free', name: 'Investigator (Freelancer)', mult: 400, dice: 1, sides: 1000 },
  { id: 'investigator_journo', name: 'Investigator (Journalist)', mult: 500, dice: 1, sides: 1000 },
  { id: 'mercenary', name: 'Mercenary', mult: 325, dice: 1, sides: 1000 },
  { id: 'militiaman', name: 'Militiaman', mult: 575, dice: 1, sides: 1000 },
  { id: 'pirate_chock', name: 'Pirate / Smuggler (Chock)', mult: 400, dice: 1, sides: 1000 },
  { id: 'pirate_gannal', name: 'Pirate / Smuggler (Gannal)', mult: 325, dice: 1, sides: 1000 },
  { id: 'pirate_marikann', name: 'Pirate / Smuggler (Marikann)', mult: 250, dice: 1, sides: 1000 },
  { id: 'pirate_rogue', name: 'Pirate / Smuggler (Rogue)', mult: 150, dice: 1, sides: 1000 },
  { id: 'spacer', name: 'Spacer', mult: 450, dice: 1, sides: 1000 },
  { id: 'specialist_medic', name: 'Specialist (Medic)', mult: 750, dice: 1, sides: 1000 },
  { id: 'specialist_tech', name: 'Specialist (Tech)', mult: 700, dice: 1, sides: 1000 }
];

// Helper dice rolling functions
export function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDice(count, sides) {
  const rolls = [];
  let sum = 0;
  for (let i = 0; i < count; i++) {
    const val = rollDie(sides);
    rolls.push(val);
    sum += val;
  }
  return { rolls, sum };
}

