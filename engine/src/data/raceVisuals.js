// Canonical Race Visual Reference Data & Image Maps for Genesis RPG Engine
// Used for AI Character Portrait Generation and Character Generator Previews

export const RACE_VISUAL_PROFILES = {
  aracnian: {
    name: 'Aracnian',
    image: '/images/Aracnian_grey.webp',
    anatomicalImage: '/images/AracnianAnatomical.webp',
    bwImage: '/images/Aracnian_bw.webp',
    visualDescription: 'Very tall (over 2.5m), slender and elongated humanoid physique adapted to low gravity (0.7G). Graceful, acrobatic, elongated limbs, sleek head structure, chitinous or smooth skin with subtle hue depending on subspecies.',
    subspeciesNotes: {
      aracnian_blue: 'Cerulean to cobalt-tinted smooth chitin, lithe frame, agile low-gravity stance.',
      aracnian_green: 'Jade to emerald tinted skin with faint biomechanical patterns, supple posture.',
      aracnian_brown: 'Earthy bronze-brown tones, resilient low-gravity musculature, keen posture.'
    }
  },
  eebek: {
    name: 'Eebek',
    image: '/images/Eebek_grey.webp',
    anatomicalImage: '/images/EebekAnatomical.webp',
    bwImage: '/images/Eebek_bw.webp',
    visualDescription: 'Stocky, resilient frame with 5 to 7 extremities (typically multiple arms, two or four held recessed against the torso). Thick two-fingered hands with an opposable thumb, three-toed stable feet, rugged alien facial ridges, heavy survival gear.'
  },
  faborian: {
    name: 'Faborian',
    image: '/images/Faborian_grey.webp',
    anatomicalImage: '/images/FaborianAnatomical.webp',
    bwImage: '/images/Faborian_bw.webp',
    visualDescription: 'Sturdy, extremely muscular body with powerful limbs and industrial artisan demeanor. Slender neck leading to a distinctive, intelligent facial structure, rugged skin texture, industrial tech-harness and workshop tools.'
  },
  fenbin: {
    name: 'Fenbin',
    image: '/images/Fenbin_grey.webp',
    anatomicalImage: '/images/FenbinAnatomical.webp',
    bwImage: '/images/Fenbin_bw.webp',
    visualDescription: 'Small (0.9 to 1.3 meters tall), chitinous insectoid-arachnid morphology with distinctive head horns, multiple limbs/pad feet, multi-faceted eyes, compact exoskeleton, highly agile and inquisitive posture.'
  },
  gliff: {
    name: 'Gliff',
    image: '/images/Genesislogo1.webp',
    visualDescription: 'Rare avian-adapted bipedal species with light bone structure, observant predatory gaze, leathery plumage or membrane textures, nimble digits.'
  },
  human: {
    name: 'Human',
    image: '/images/Human_grey.webp',
    anatomicalImage: '/images/HumanAnatomical.webp',
    visualDescription: 'Standard Earth hominid (Homo sapiens), adaptable bipedal physiology, utilitarian space explorer uniforms or tactical armor suited to diverse galactic environments.'
  },
  krane: {
    name: 'Krane',
    image: '/images/Krane_grey.webp',
    anatomicalImage: '/images/KraneAnatomical.webp',
    bwImage: '/images/Krane_bw.webp',
    visualDescription: 'Colossal, intimidating bipedal behemoth (up to 4 meters tall, 500-900 kg). Hulking segmented heavy battle armor, formidable armored shoulder plates, massive physical strength, imposing warrior presence, tribal/military honor insignias.'
  },
  lowkaa: {
    name: 'Low Kaa',
    image: '/images/LowKaa_grey.webp',
    anatomicalImage: '/images/LowKaaAnatomical.webp',
    bwImage: '/images/LowKaa_bw.webp',
    visualDescription: 'Slender, tall bipedal humanoid with prominent sensory organ structures on the cranial crest, contemplative philosophical demeanor, elegant high-collar traveling garments, refined posture.'
  },
  mahendoshi: {
    name: 'Mahendoshi',
    image: '/images/Mahendoshi_grey.webp',
    anatomicalImage: '/images/MahendoshiAnatomical.webp',
    bwImage: '/images/Mahendoshi_bw.webp',
    visualDescription: 'Short, stout subterranean species (~0.5 meters tall, 35+ kg). Mole-like subterranean adaptations, powerful digging claws/hands, heavy protective goggles/visors, durable miner overalls, dense muscle mass.'
  },
  sooaacoli: {
    name: 'Sooaacoli',
    image: '/images/Sooaacoli_grey.webp',
    anatomicalImage: '/images/SooaacoliAnatomical.webp',
    bwImage: '/images/Sooaacoli_bw.webp',
    visualDescription: 'Alien aquatic-terrestrial morphology, asymmetrical or unique sensory organs, smooth sleek skin with bioluminescent moisture-sheen, streamlined contours, sleek plasma-conduit weaponry and environmental apparatus.'
  },
  tanaian: {
    name: 'Tanaian',
    image: '/images/Tanaian-grey.webp',
    anatomicalImage: '/images/TanaianAnatomical-small.webp',
    bwImage: '/images/Tanaian-core-close-up.webp',
    visualDescription: 'Artificially engineered biomechanical lifeform. Enormous physical constitution, crystalline or metallic chassis core, stoic and synthetic facial geometry, hyper-dense synthetic musculature, glowing core power housing.'
  },
  tsoegorthin: {
    name: 'Tsoegorthin',
    image: '/images/Genesislogo1.webp',
    visualDescription: 'Gigantic, high-mass entity possessing immense physical power (PS 930+), massive organic armored carapace, thunderous stance.'
  },
  vjespere: {
    name: 'Vjesperé',
    image: '/images/vjespere_grey.webp',
    anatomicalImage: '/images/VjespereAnatomical.webp',
    bwImage: '/images/Vjespere_bw.webp',
    visualDescription: 'Aquatic hexapoid biped mammal-amphibian hybrid. Streamlined aquatic body, echolocation auditory lobes, sleek aerodynamic crest, secondary manipulative appendages, tactical wet-suit environmental seals.'
  }
};

/**
 * Builds an AI image prompt combining canonical racial visual traits, race reference art,
 * physical characteristics, occupation, and user narrative backstory.
 */
export function buildCharacterPortraitPrompt({
  name,
  sex,
  raceKey,
  raceName,
  vitals,
  attributes,
  narrative
}) {
  const normalizedKey = (raceKey || 'human').toLowerCase().replace(/_.*$/, '');
  const profile = RACE_VISUAL_PROFILES[normalizedKey] || RACE_VISUAL_PROFILES.human;
  const subNote = profile.subspeciesNotes && profile.subspeciesNotes[raceKey] ? profile.subspeciesNotes[raceKey] : '';

  const details = [];
  details.push(`Genesis RPG tabletop character portrait, detailed digital painting, retro-futuristic sci-fi art style.`);
  details.push(`Species / Race: ${raceName || profile.name}.`);
  if (subNote) details.push(`Subspecies notes: ${subNote}`);
  details.push(`Canonical anatomy: ${profile.visualDescription}`);
  
  if (sex) details.push(`Gender: ${sex}.`);
  if (vitals?.age) details.push(`Age: ${vitals.age} years old.`);
  if (vitals?.height) details.push(`Height: ${vitals.height}m.`);
  if (vitals?.occupationName) details.push(`Occupation / Role: ${vitals.occupationName}.`);

  if (attributes) {
    if (attributes.ps > 150) details.push('Exceedingly massive physical build, high muscle density.');
    if (attributes.ag > 200) details.push('Hyper-agile, flexible, low-gravity acrobat posture.');
    if (attributes.it > 70) details.push('Analytical, calculating expression, cyber-tactical interface glance.');
  }

  if (narrative && narrative.trim().length > 0) {
    details.push(`Player narrative & personal backstory: "${narrative.trim().replace(/"/g, "'")}".`);
  }

  details.push(`Atmosphere: High quality character concept art, dramatic cinematic rim lighting, sci-fi spaceship interior or alien outpost background, authentic to official Genesis RPG canonical race artwork.`);

  return details.join(' ');
}

/**
 * Generates an AI portrait URL for the given prompt using the Nano Banana image model.
 * Nano Banana (gemini-nano-banana / Google image architecture) provides high-efficiency,
 * fine-grained character consistency and prompt adherence.
 * Includes seed randomization to ensure unique portraits each run.
 */
export function generateAiPortraitUrl(prompt, seed = null) {
  const cleanPrompt = encodeURIComponent(prompt.slice(0, 1500));
  const portraitSeed = seed !== null ? seed : Math.floor(Math.random() * 1000000);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&model=nano-banana&seed=${portraitSeed}&nologo=true`;
}
