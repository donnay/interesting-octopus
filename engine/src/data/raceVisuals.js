// Canonical Race & Occupation Visual Profiles for Genesis RPG Character Synthesis
// Used for Nano Banana AI Character Visualization & In-App Reference Galleries

export const RACE_VISUAL_PROFILES = {
  aracnian: {
    name: 'Aracnian',
    image: '/images/Aracnian_grey.webp',
    anatomicalImage: '/images/AracnianAnatomical.webp',
    bwImage: '/images/Aracnian_bw.webp',
    gallery: [
      { url: '/images/Aracnian_grey.webp', label: 'Aracnian Standard Profile' },
      { url: '/images/AracnianAnatomical.webp', label: 'Aracnian Skeletal / Muscular Anatomy' },
      { url: '/images/Aracnian_bw.webp', label: 'Aracnian Full Body Field Drawing' },
      { url: '/images/AracnianPirateBase.webp', label: 'Aracnian Outer Rim Station' },
      { url: '/images/ARACBLAD.webp', label: 'Aracnian Blade & Low-G Gear' }
    ],
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
    gallery: [
      { url: '/images/Eebek_grey.webp', label: 'Eebek Standing Portrait' },
      { url: '/images/EebekAnatomical.webp', label: 'Eebek Multi-Extremity Internal Anatomy' },
      { url: '/images/Eebek_bw.webp', label: 'Eebek Classical Field Sketch' },
      { url: '/images/EebekTrade.webp', label: 'Eebek Trader Caravan' },
      { url: '/images/EebekEncumbered.webp', label: 'Eebek Heavy Survival Rig' },
      { url: '/images/Eebek-eye-stalk-sm.webp', label: 'Eebek Sensory Eye-Stalk Morphology' }
    ],
    visualDescription: 'Stocky, resilient frame with 5 to 7 extremities (typically multiple arms, two or four held recessed against the torso). Thick two-fingered hands with an opposable thumb, three-toed stable feet, rugged alien facial ridges, heavy survival gear.'
  },
  faborian: {
    name: 'Faborian',
    image: '/images/Faborian_grey.webp',
    anatomicalImage: '/images/FaborianAnatomical.webp',
    bwImage: '/images/Faborian_bw.webp',
    gallery: [
      { url: '/images/Faborian_grey.webp', label: 'Faborian Artisan Profile' },
      { url: '/images/FaborianAnatomical.webp', label: 'Faborian High-Density Muscular System' },
      { url: '/images/Faborian_bw.webp', label: 'Faborian Tech-Guild Blueprint' }
    ],
    visualDescription: 'Sturdy, extremely muscular body with powerful limbs and industrial artisan demeanor. Slender neck leading to a distinctive, intelligent facial structure, rugged skin texture, industrial tech-harness and workshop tools.'
  },
  fenbin: {
    name: 'Fenbin',
    image: '/images/Fenbin_grey.webp',
    anatomicalImage: '/images/FenbinAnatomical.webp',
    bwImage: '/images/Fenbin_bw.webp',
    gallery: [
      { url: '/images/Fenbin_grey.webp', label: 'Fenbin Insectoid Profile' },
      { url: '/images/FenbinAnatomical.webp', label: 'Fenbin Exoskeletal Anatomy' },
      { url: '/images/Fenbin_bw.webp', label: 'Fenbin Inquisitive Scout Stance' }
    ],
    visualDescription: 'Small (0.9 to 1.3 meters tall), chitinous insectoid-arachnid morphology with distinctive head horns, multiple limbs/pad feet, multi-faceted eyes, compact exoskeleton, highly agile and inquisitive posture.'
  },
  gliff: {
    name: 'Gliff',
    image: '/images/Genesislogo1.webp',
    gallery: [
      { url: '/images/Genesislogo1.webp', label: 'Gliff Insignia' }
    ],
    visualDescription: 'Rare avian-adapted bipedal species with light bone structure, observant predatory gaze, leathery plumage or membrane textures, nimble digits.'
  },
  human: {
    name: 'Human',
    image: '/images/Human_grey.webp',
    anatomicalImage: '/images/HumanAnatomical.webp',
    gallery: [
      { url: '/images/Human_grey.webp', label: 'Human Explorer Portrait' },
      { url: '/images/HumanAnatomical.webp', label: 'Human Hominid Anatomy' },
      { url: '/images/Full_Explorer.webp', label: 'Human Frontier Explorer Gear' },
      { url: '/images/Full_TraderWoman.webp', label: 'Human Guild Commercial Attire' },
      { url: '/images/Full_MilitaryAeroSpaceSecurity.webp', label: 'Human AeroSpace Security Armor' }
    ],
    visualDescription: 'Standard Earth hominid (Homo sapiens), adaptable bipedal physiology, utilitarian space explorer uniforms or tactical armor suited to diverse galactic environments.'
  },
  krane: {
    name: 'Krane',
    image: '/images/Krane_grey.webp',
    anatomicalImage: '/images/KraneAnatomical.webp',
    bwImage: '/images/Krane_bw.webp',
    gallery: [
      { url: '/images/Krane_grey.webp', label: 'Krane Titan Warrior' },
      { url: '/images/KraneBattleArmour.webp', label: 'Krane Heavy Battle Armor Plate' },
      { url: '/images/KraneAnatomical.webp', label: 'Krane Massive Skeletal Framework' },
      { url: '/images/Krane_bw.webp', label: 'Krane Tribal Honor Standard' },
      { url: '/images/KRNLASFU.webp', label: 'Krane High-Energy Ordnance' },
      { url: '/images/KRN-Tank-2.webp', label: 'Krane Mechanized Armored Assault' }
    ],
    visualDescription: 'Colossal, intimidating bipedal behemoth (up to 4 meters tall, 500-900 kg). Hulking segmented heavy battle armor, formidable armored shoulder plates, massive physical strength, imposing warrior presence, tribal/military honor insignias.'
  },
  lowkaa: {
    name: 'Low Kaa',
    image: '/images/LowKaa_grey.webp',
    anatomicalImage: '/images/LowKaaAnatomical.webp',
    bwImage: '/images/LowKaa_bw.webp',
    gallery: [
      { url: '/images/LowKaa_grey.webp', label: 'Low Kaa Philosopher Profile' },
      { url: '/images/LowKaaAnatomical.webp', label: 'Low Kaa Cranial Sensor Structure' },
      { url: '/images/LowKaa_bw.webp', label: 'Low Kaa Diplomatic Field Study' }
    ],
    visualDescription: 'Slender, tall bipedal humanoid with prominent sensory organ structures on the cranial crest, contemplative philosophical demeanor, elegant high-collar traveling garments, refined posture.'
  },
  mahendoshi: {
    name: 'Mahendoshi',
    image: '/images/Mahendoshi_grey.webp',
    anatomicalImage: '/images/MahendoshiAnatomical.webp',
    bwImage: '/images/Mahendoshi_bw.webp',
    gallery: [
      { url: '/images/Mahendoshi_grey.webp', label: 'Mahendoshi Subterranean Miner' },
      { url: '/images/MahendoshiAnatomical.webp', label: 'Mahendoshi Dense Digging Anatomy' },
      { url: '/images/Mahendoshi_bw.webp', label: 'Mahendoshi Heavy Protective Rig' },
      { url: '/images/Mahendoshi_heart.webp', label: 'Mahendoshi Bio-Core Diagram' }
    ],
    visualDescription: 'Short, stout subterranean species (~0.5 meters tall, 35+ kg). Mole-like subterranean adaptations, powerful digging claws/hands, heavy protective goggles/visors, durable miner overalls, dense muscle mass.'
  },
  sooaacoli: {
    name: 'Sooaacoli',
    image: '/images/Sooaacoli_grey.webp',
    anatomicalImage: '/images/SooaacoliAnatomical.webp',
    bwImage: '/images/Sooaacoli_bw.webp',
    gallery: [
      { url: '/images/Sooaacoli_grey.webp', label: 'Sooaacoli Aquatic-Terrestrial Specialist' },
      { url: '/images/SooaacoliAnatomical.webp', label: 'Sooaacoli Fluid Circulation Organ System' },
      { url: '/images/Sooaacoli_bw.webp', label: 'Sooaacoli Field Gear' },
      { url: '/images/SOOAWEP1.webp', label: 'Sooaacoli Bio-Plasma Armament' }
    ],
    visualDescription: 'Alien aquatic-terrestrial morphology, asymmetrical or unique sensory organs, smooth sleek skin with bioluminescent moisture-sheen, streamlined contours, sleek plasma-conduit weaponry and environmental apparatus.'
  },
  tanaian: {
    name: 'Tanaian',
    image: '/images/Tanaian-grey.webp',
    anatomicalImage: '/images/TanaianAnatomical-small.webp',
    bwImage: '/images/Tanaian-core-close-up.webp',
    gallery: [
      { url: '/images/Tanaian-grey.webp', label: 'Tanaian Synthetic Lifeform' },
      { url: '/images/TanaianAnatomical-small.webp', label: 'Tanaian Biomechanical Chassis' },
      { url: '/images/Tanaian-core-close-up.webp', label: 'Tanaian Power Core Enclosure' }
    ],
    visualDescription: 'Artificially engineered biomechanical lifeform. Enormous physical constitution, crystalline or metallic chassis core, stoic and synthetic facial geometry, hyper-dense synthetic musculature, glowing core power housing.'
  },
  tsoegorthin: {
    name: 'Tsoegorthin',
    image: '/images/Genesislogo1.webp',
    gallery: [
      { url: '/images/Genesislogo1.webp', label: 'Tsoegorthin Crest' }
    ],
    visualDescription: 'Gigantic, high-mass entity possessing immense physical power (PS 930+), massive organic armored carapace, thunderous stance.'
  },
  vjespere: {
    name: 'Vjesperé',
    image: '/images/vjespere_grey.webp',
    anatomicalImage: '/images/VjespereAnatomical.webp',
    bwImage: '/images/Vjespere_bw.webp',
    gallery: [
      { url: '/images/vjespere_grey.webp', label: 'Vjesperé Hexapoid Form' },
      { url: '/images/VjespereUpright.webp', label: 'Vjesperé Upright Combat Stance' },
      { url: '/images/VjespereAnatomical.webp', label: 'Vjesperé Amphibian Skeletal Structure' },
      { url: '/images/Vjespere_bw.webp', label: 'Vjesperé Classical Specimen Log' }
    ],
    visualDescription: 'Aquatic hexapoid biped mammal-amphibian hybrid. Streamlined aquatic body, echolocation auditory lobes, sleek aerodynamic crest, secondary manipulative appendages, tactical wet-suit environmental seals.'
  }
};

// Canonical Visual & Gear Reference Data for Occupations (Table #1-14)
export const OCCUPATION_VISUAL_PROFILES = {
  bounty_hunter: {
    name: 'Bounty Hunter / Assassin',
    gallery: [
      { url: '/images/WomanAndSphereGun.webp', label: 'Hunter with Target Tracking Weapon' },
      { url: '/images/Full_Pirate.webp', label: 'Armored Outer Rim Bounty Hunter' }
    ],
    visualDescription: 'Concealed weaponry, long-range tracking optics, modular stealth cloak, reinforced kinetic plates, scanner bracers, weathered combat harness.'
  },
  chaendler_chchien: {
    name: "Chaendler (Ch'chien Wa Bow)",
    gallery: [
      { url: '/images/HistoryChaendler.webp', label: "Chaendler Diplomatic Merchant" },
      { url: '/images/Full_Trader.webp', label: "Frontier Mercantile Factor" }
    ],
    visualDescription: "Intricate embroidered guild robes, ornate ledger scrolls, data-chits, jewel-inlaid ceremonial staff, distinguished aristocratic trading sash."
  },
  chaendler_jjaro: {
    name: 'Chaendler (JJaro Guildsman)',
    gallery: [
      { url: '/images/Jjaro.webp', label: 'JJaro Corporate Guild Factor' },
      { url: '/images/Full_TraderWoman.webp', label: 'Guild Commercial Envoy' }
    ],
    visualDescription: 'High-tech corporate business tunic, holographic inventory pad, biometric merchant seals, diplomatic security sidearm.'
  },
  chaendler_stevin: {
    name: 'Chaendler (Stevin Guildsman)',
    gallery: [
      { url: '/images/Stevin.webp', label: 'Stevin Guild Logistics Broker' },
      { url: '/images/BusinessWoman.webp', label: 'Interstellar Trade Executive' }
    ],
    visualDescription: 'Practical commercial duster, manifest tablet, multi-pocket currency belt, durable starport traveling boots.'
  },
  chaendler_free: {
    name: 'Chaendler (Free)',
    gallery: [
      { url: '/images/EebekTrade.webp', label: 'Free Trader Cargo Bazaar' },
      { url: '/images/Full_Trader.webp', label: 'Independent Merchant Spacer' }
    ],
    visualDescription: 'Mismatched salvaged frontier clothes, utility satchels, trade-weight scale, pocket scanner, rugged spacer gear.'
  },
  explorer_prospector: {
    name: 'Explorer (Prospector)',
    gallery: [
      { url: '/images/Full_Explorer.webp', label: 'Planetary Prospector Gear' },
      { url: '/images/EebekEncumbered.webp', label: 'Heavy Mineral Assay Rig' }
    ],
    visualDescription: 'Heavy-duty mineral scanner, sample collection cylinders, reinforced geo-hazard suit, rugged backpack with planetary survey antennae.'
  },
  explorer_scout: {
    name: 'Explorer (Scout)',
    gallery: [
      { url: '/images/Full_Explorer.webp', label: 'Frontier Reconnaissance Scout' },
      { url: '/images/Adventures.webp', label: 'Uncharted World Expedition' }
    ],
    visualDescription: 'Lightweight survival duster, all-weather rebreather mask, high-gain directional transceiver, field survival knife, rugged trail boots.'
  },
  investigator_ccop: {
    name: 'Investigator (CCOP Field Agent)',
    gallery: [
      { url: '/images/Full_MilitaryAeroSpaceSecurity.webp', label: 'CCOP Law Enforcement Tactical Agent' }
    ],
    visualDescription: 'Official planetary police duster with CCOP enforcement insignia, stun-pistol holster, cryptographic datapad, tactical ballistic vest.'
  },
  investigator_corp: {
    name: 'Investigator (Corporate Spy)',
    gallery: [
      { url: '/images/BusinessWoman.webp', label: 'Corporate Intelligence Operative' }
    ],
    visualDescription: 'Tailored sleek corporate blazer with concealed cybernetic wiretaps, polarized ocular lenses, covert dataspike stylus.'
  },
  investigator_free: {
    name: 'Investigator (Freelancer)',
    gallery: [
      { url: '/images/Full_Explorer.webp', label: 'Private Investigator Spacer' }
    ],
    visualDescription: 'Crumpled trench-style overcoat, optical zoom monocle, personal defense blaster, pocket sound recorder, worn leather notebook.'
  },
  investigator_journo: {
    name: 'Investigator (Journalist)',
    gallery: [
      { url: '/images/BusinessWoman.webp', label: 'HoloNet Investigative Journalist' }
    ],
    visualDescription: 'HoloNet press credentials, miniature drone camera collar, press satchel, voice-recorder stylus, light protective vest.'
  },
  mercenary: {
    name: 'Mercenary',
    gallery: [
      { url: '/images/KraneBattleArmour.webp', label: 'Heavy Armored Combat Mercenary' },
      { url: '/images/Full_MilitaryAeroSpaceSecurity.webp', label: 'Mercenary Contractor' }
    ],
    visualDescription: 'Battle-scarred composite body armor, heavy slugthrower or blaster rifle slung across back, tactical combat webbing, bandolier of power cells.'
  },
  militiaman: {
    name: 'Militiaman',
    gallery: [
      { url: '/images/Full_MilitaryAeroSpaceSecurity.webp', label: 'Colonial Planetary Militia Uniform' }
    ],
    visualDescription: 'Standard colonial militia fatigue tunic, planetary defense crest patch, standard-issue pulse carbine, utility combat belt.'
  },
  pirate_chock: {
    name: 'Pirate / Smuggler (Chock)',
    gallery: [
      { url: '/images/Full_Pirate.webp', label: 'Void Corsair Raider' },
      { url: '/images/AracnianPirateBase.webp', label: 'Smuggler Haven Outpost' }
    ],
    visualDescription: 'Intimidating spiked leather-tech armor, high-energy cutlass or thermal pistol, cybernetic eye patch, smuggled contraband pouches.'
  },
  pirate_gannal: {
    name: 'Pirate / Smuggler (Gannal)',
    gallery: [
      { url: '/images/Full_Pirate.webp', label: 'Gannal Syndicate Smuggler' }
    ],
    visualDescription: 'Concealed cargo vest with false seams, scrambler keys, magnetic grapple gun, rugged dark spacer jacket.'
  },
  pirate_marikann: {
    name: 'Pirate / Smuggler (Marikann)',
    gallery: [
      { url: '/images/Full_Pirate.webp', label: 'Marikann Freebooter' }
    ],
    visualDescription: 'Flashy piratical regalia, dual holster rig, modified plasma pistols, lucky alien tooth necklace, scavenged officer boots.'
  },
  pirate_rogue: {
    name: 'Pirate / Smuggler (Rogue)',
    gallery: [
      { url: '/images/Full_Pirate.webp', label: 'Independent Void Rogue' }
    ],
    visualDescription: 'Scavenged armor plates over an oil-stained flight suit, quick-draw holster, electronic bypass tools.'
  },
  spacer: {
    name: 'Spacer',
    gallery: [
      { url: '/images/Tech-ThermalSuit.webp', label: 'Standard Environmental Spacer Suit' },
      { url: '/images/Full_Explorer.webp', label: 'Void Station Crew' }
    ],
    visualDescription: 'Durable pressurizable vacuum coveralls, magnetic grapple boots, hydro-spanner in thigh holster, life-support monitor harness on chest.'
  },
  specialist_medic: {
    name: 'Specialist (Medic)',
    gallery: [
      { url: '/images/Wehavethebiotechnology.webp', label: 'Bio-Surgical Field Specialist' }
    ],
    visualDescription: 'Sterile white or bioluminescent medical smock over flight suit, diagnostic bio-scanner HUD, portable dermal regenerator, trauma med-kit.'
  },
  specialist_tech: {
    name: 'Specialist (Tech)',
    gallery: [
      { url: '/images/Tech-ThermalSuit.webp', label: 'Hazardous Engineering Specialist' },
      { url: '/images/FaborianAnatomical.webp', label: 'Master Cyber-Artisan Tech' }
    ],
    visualDescription: 'Multi-spectrum optical goggles, utility tool vest packed with diagnostic probes and solder pens, optical datalink fiber ports, insulated gloves.'
  }
};

/**
 * Builds an AI image prompt combining canonical racial visual traits, race reference art,
 * physical characteristics, occupation, user narrative, and an alien spaceport world.
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
  const normalizedRaceKey = (raceKey || 'human').toLowerCase().replace(/_.*$/, '');
  const raceProfile = RACE_VISUAL_PROFILES[normalizedRaceKey] || RACE_VISUAL_PROFILES.human;
  const subNote = raceProfile.subspeciesNotes && raceProfile.subspeciesNotes[raceKey] ? raceProfile.subspeciesNotes[raceKey] : '';

  // Match occupation profile
  const occKey = vitals?.occupationId || '';
  const occProfile = OCCUPATION_VISUAL_PROFILES[occKey] || Object.values(OCCUPATION_VISUAL_PROFILES).find(o => o.name === vitals?.occupationName);

  const details = [];

  // Core Art Style & Medium
  details.push(`Genesis RPG tabletop character portrait, detailed retro-futuristic sci-fi digital art, vibrant full color comic illustration.`);

  // Full-body Character Specifications
  details.push(`Main Subject: Full-body standing character view.`);
  details.push(`Species / Race: ${raceName || raceProfile.name}.`);
  if (subNote) details.push(`Racial characteristics: ${subNote}`);
  details.push(`Anatomical morphology: ${raceProfile.visualDescription}`);

  // Vitals & Demographics
  if (sex) details.push(`Gender: ${sex}.`);
  if (vitals?.age) details.push(`Age: ${vitals.age} standard galactic years.`);
  if (vitals?.height) details.push(`Height: ${vitals.height} meters tall.`);
  if (vitals?.mass) details.push(`Weight / Mass: ${vitals.mass} kilograms.`);
  if (vitals?.occupationName) {
    details.push(`Occupation / Role: ${vitals.occupationName}.`);
  }
  if (occProfile?.visualDescription) {
    details.push(`Occupation gear & attire: ${occProfile.visualDescription}`);
  }

  // Physical Attributes nuances
  if (attributes) {
    if (attributes.ps > 150) details.push('Exceedingly massive physical build with high muscle density.');
    if (attributes.ag > 200) details.push('Hyper-agile, flexible, low-gravity acrobat posture.');
    if (attributes.it > 70) details.push('Analytical, calculating expression, tactical scanner glance.');
  }

  // Canonical Reference Art Grounding
  const raceImgLabels = raceProfile.gallery ? raceProfile.gallery.map(g => g.label).join(', ') : '';
  if (raceImgLabels) {
    details.push(`Official canonical race reference art styles: [${raceImgLabels}].`);
  }

  // User narrative
  if (narrative && narrative.trim().length > 0) {
    details.push(`Backstory & personal character narrative: "${narrative.trim().replace(/"/g, "'")}".`);
  }

  // Mandatory Rich Alien Spaceport World Environment
  details.push(`Environment & Setting: Placed in a vibrant full-colour alien world landscape under atmospheric twin moons and strange skies.`);
  details.push(`Background Scene: Bustling intergalactic spaceport with sci-fi architecture, sprawling futuristic modular buildings, starship landing pads with docked space vessels.`);
  details.push(`Crowd & Inhabitants: Diverse background alien races, spacers, traders, and extraterrestrial pedestrians wandering in the background.`);
  details.push(`Lighting & Mood: Warm cinematic golden hour lighting, rich vibrant colors, high quality sci-fi world-building, authentic to Genesis RPG canonical universe.`);

  return details.join(' ');
}

/**
 * Generates an AI portrait URL for the given prompt using the Nano Banana image model.
 * Nano Banana (gemini-nano-banana / Google image architecture) provides high-efficiency,
 * fine-grained character consistency and prompt adherence.
 * Uses 512x1024 or 576x1024 vertical portrait aspect ratio for full-body view.
 */
export function generateAiPortraitUrl(prompt, seed = null) {
  const cleanPrompt = encodeURIComponent(prompt.slice(0, 1800));
  const portraitSeed = seed !== null ? seed : Math.floor(Math.random() * 1000000);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=1024&model=nano-banana&seed=${portraitSeed}&nologo=true`;
}
