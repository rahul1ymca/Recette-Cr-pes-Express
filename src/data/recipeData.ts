import { Ingredient, RecipeStep, FaqItem, NutritionItem } from '../types';

export const BASE_SERVINGS = 12; // 12 crêpes

export const INGREDIENTS_DATA: Ingredient[] = [
  {
    id: 'farine',
    nameFr: 'Farine de blé fluide (T45 ou T55)',
    nameEn: 'All-purpose or pastry wheat flour (T45/T55)',
    amountPerCrepe: 250 / BASE_SERVINGS, // 250g for 12 crepes
    unitFr: 'g',
    unitEn: 'g',
    notesFr: 'Tamisée de préférence pour une légèreté maximale',
    notesEn: 'Preferably sifted for maximum fluffiness',
    category: 'base'
  },
  {
    id: 'oeufs',
    nameFr: 'Œufs frais entiers (calibre moyen/gros)',
    nameEn: 'Fresh whole eggs (medium/large)',
    amountPerCrepe: 4 / BASE_SERVINGS, // 4 eggs for 12 crepes
    unitFr: '',
    unitEn: '',
    notesFr: 'À température ambiante (sortir 30 min avant)',
    notesEn: 'At room temperature (take out 30 min before)',
    category: 'base'
  },
  {
    id: 'lait',
    nameFr: 'Lait demi-écrémé ou lait entier',
    nameEn: 'Semi-skimmed or whole milk',
    amountPerCrepe: 500 / BASE_SERVINGS, // 500ml for 12 crepes
    unitFr: 'ml',
    unitEn: 'ml',
    notesFr: 'Légèrement tiédi ou tempéré (évite les chocs thermiques)',
    notesEn: 'Lukewarm or room temperature (prevents lumps)',
    category: 'liquide'
  },
  {
    id: 'beurre',
    nameFr: 'Beurre doux fondu (ou beurre noisette)',
    nameEn: 'Melted unsalted butter (or brown butter)',
    amountPerCrepe: 50 / BASE_SERVINGS, // 50g for 12 crepes
    unitFr: 'g',
    unitEn: 'g',
    notesFr: 'Apporte un moelleux incomparable et évite que ça colle',
    notesEn: 'Gives tenderness and keeps crepes from sticking',
    category: 'base'
  },
  {
    id: 'sel',
    nameFr: 'Sel fin',
    nameEn: 'Fine table salt',
    amountPerCrepe: 1 / BASE_SERVINGS, // 1 pinch
    unitFr: 'pincée(s)',
    unitEn: 'pinch(es)',
    notesFr: 'Essentiel pour exalter toutes les saveurs de la pâte',
    notesEn: 'Essential flavor enhancer even in sweet crepes',
    category: 'saveur'
  },
  {
    id: 'sucre',
    nameFr: 'Sucre vanillé ou sucre en poudre',
    nameEn: 'Vanilla sugar or caster sugar',
    amountPerCrepe: 15 / BASE_SERVINGS, // 1 sachet = ~10-15g
    unitFr: 'g',
    unitEn: 'g',
    notesFr: 'À omettre si vous préparez des crêpes salées',
    notesEn: 'Omit if making savory crepes',
    category: 'saveur'
  },
  {
    id: 'arome',
    nameFr: 'Parfum : extrait de vanille, rhum ambré ou fleur d\'oranger',
    nameEn: 'Flavoring: vanilla extract, dark rum, or orange blossom',
    amountPerCrepe: 15 / BASE_SERVINGS, // 1 tbsp
    unitFr: 'ml',
    unitEn: 'ml',
    notesFr: 'Optionnel mais signature des meilleures crêpes de grand-mère',
    notesEn: 'Optional classic French grandmother aroma',
    category: 'saveur'
  }
];

export const RECIPE_STEPS: RecipeStep[] = [
  {
    stepNumber: 1,
    titleFr: 'Le puits de farine et le sel',
    titleEn: 'Flour well and pinch of salt',
    descriptionFr: 'Dans un grand cul-de-poule ou saladier, versez les 250 g de farine tamisée, la pincée de sel fin et le sucre vanillé. Creusez un large puits au centre avec le dos d\'une cuillère.',
    descriptionEn: 'In a large mixing bowl, pour in 250g of sifted flour, the pinch of fine salt, and vanilla sugar. Form a wide well in the center using the back of a spoon.',
    durationFr: '2 min',
    durationEn: '2 min',
    chefTipFr: 'Tamisez la farine avec une passoire fine : cela aère la poudre et réduit de 90 % le risque de grumeaux.',
    chefTipEn: 'Sift flour through a fine sieve: this aerates the flour and eliminates 90% of lump formation.',
    iconName: 'Wheat'
  },
  {
    stepNumber: 2,
    titleFr: 'Incorporation douce des œufs',
    titleEn: 'Gentle incorporation of eggs',
    descriptionFr: 'Cassez les 4 œufs entiers directement au centre du puits. À l\'aide d\'un fouet manuel, commencez à mélanger doucement en effectuant de petits cercles au centre, en rabattant la farine petit à petit.',
    descriptionEn: 'Crack the 4 whole eggs directly into the center of the well. With a balloon whisk, gently stir in concentric circles, incorporating flour from the inner walls gradually.',
    durationFr: '2 min',
    durationEn: '2 min',
    chefTipFr: 'Ne cherchez pas à tout mélanger d\'un coup : travaillez du centre vers l\'extérieur pour créer une crème épaisse homogène.',
    chefTipEn: 'Do not rush: work from the center outward to create a thick, smooth paste without clumps.',
    iconName: 'Egg'
  },
  {
    stepNumber: 3,
    titleFr: 'Versement du lait en 3 fois',
    titleEn: 'Pouring the milk in 3 stages',
    descriptionFr: 'Versez les 500 ml de lait tiède en un filet continu, en 3 ou 4 fois consécutives. Fouettez énergiquement entre chaque ajout pour lier le liquide à la masse sans projeter.',
    descriptionEn: 'Pour the 500ml of lukewarm milk in a continuous stream across 3 or 4 additions. Whisk vigorously between each addition to seamlessly blend the liquid.',
    durationFr: '3 min',
    durationEn: '3 min',
    chefTipFr: 'Utilisez un lait légèrement tiédi (25-30°C) au micro-ondes 20 secondes : les matières grasses fusionnent instantanément sans former de boulettes.',
    chefTipEn: 'Use lukewarm milk (lukewarm to the touch, 20 sec in microwave): it blends instantly without seizing the flour.',
    iconName: 'Milk'
  },
  {
    stepNumber: 4,
    titleFr: 'Le beurre fondu et les arômes',
    titleEn: 'Melted butter & aromatic finish',
    descriptionFr: 'Ajoutez les 50 g de beurre doux préalablement fondu et tiédi, puis votre parfum fétiche (1 cuillère à soupe de rhum ambré, d\'eau de fleur d\'oranger ou de vanille). Donnez un dernier tour de fouet.',
    descriptionEn: 'Stir in the 50g of gently melted and cooled butter, followed by your favorite aroma (dark rum, orange blossom water, or vanilla). Whisk one final time until satiny.',
    durationFr: '2 min',
    durationEn: '2 min',
    chefTipFr: 'Le beurre fondu incorporé dans la pâte lubrifie les crêpes de l\'intérieur : vous n\'aurez presque plus besoin de beurrer la poêle par la suite !',
    chefTipEn: 'Melted butter inside the batter lubricates the crepes from within: no extra pan-greasing needed between each crepe!',
    iconName: 'Flame'
  },
  {
    stepNumber: 5,
    titleFr: 'Le temps de repos (Le secret du moelleux)',
    titleEn: 'Resting period (The fluffiness secret)',
    descriptionFr: 'Couvrez le saladier d\'un torchon propre ou d\'un film alimentaire et laissez reposer à température ambiante pendant 30 minutes (ou 1 heure au frais).',
    descriptionEn: 'Cover the bowl with a clean kitchen towel or cling wrap and let rest at room temperature for 30 minutes (or up to 1 hour in the fridge).',
    durationFr: '30 min (Repos)',
    durationEn: '30 min (Resting)',
    chefTipFr: 'Pendant le repos, l\'amidon de la farine s\'hydrate et le réseau de gluten se détend. Résultat : des crêpes souples qui ne se déchirent jamais au pliage.',
    chefTipEn: 'During resting, starch hydrates and gluten relaxes. The result: supple, melt-in-the-mouth crepes that never tear when flipped.',
    iconName: 'Clock'
  },
  {
    stepNumber: 6,
    titleFr: 'Cuisson dorée et le tour de main',
    titleEn: 'Golden cooking & pan swirling',
    descriptionFr: 'Faites chauffer votre poêle à feu moyen-vif. Frottez un papier absorbant imbibé d\'un soupçon d\'huile. Versez une louche moyenne (environ 50 ml) et inclinez immédiatement la poêle d\'un mouvement circulaire du poignet.',
    descriptionEn: 'Heat your non-stick skillet or crepe pan over medium-high heat. Lightly wipe with an oiled paper towel. Pour in one medium ladle (approx 50ml) and immediately tilt the pan in a smooth circular wrist motion.',
    durationFr: '1-2 min par crêpe',
    durationEn: '1-2 min per crepe',
    chefTipFr: 'Lorsque les bords se détachent et dorent (après 60 sec), glissez une spatule fine, retournez d\'un coup sec (ou faites sauter !) et cuisez 30 à 45 secondes sur l\'autre face.',
    chefTipEn: 'When edges curl and turn golden (after 60s), slide a thin spatula underneath, flip swiftly, and cook for another 30-45 seconds.',
    iconName: 'Sparkles'
  }
];

export const SECRETS_ANTI_GRUMEAUX = [
  {
    titleFr: 'Le lait tiède plutôt que glacé',
    titleEn: 'Lukewarm milk instead of fridge-cold',
    descFr: 'Le lait froid fige le beurre fondu et provoque des micro-agglomérats d\'amidon. Faites-le tiédir 25 secondes au micro-ondes avant de verser.',
    descEn: 'Ice-cold milk seizes melted butter and locks dry flour granules. Warm it for 25 seconds in the microwave before pouring.'
  },
  {
    titleFr: 'L\'ajout du liquide en 3 temps',
    titleEn: 'Adding liquid in 3 distinct stages',
    descFr: 'Commencez toujours par former une pâte compacte et lisse avec un tiers du lait. Une fois la masse sans aucun grumeau, détendez-la avec le reste du lait.',
    descEn: 'Always start with a smooth, thick paste using one third of the milk. Once completely lump-free, thin it down with the remainder.'
  },
  {
    titleFr: 'L\'astuce express au Blender',
    titleEn: 'The 30-second Blender express trick',
    descFr: 'Envie d\'aller encore plus vite ? Mettez tous les liquides au fond de votre blender (œufs, lait, beurre fondu), ajoutez la farine et le sel par-dessus, puis mixez 30 secondes à vitesse maximale !',
    descEn: 'In a rush? Put liquids at the bottom of a blender (eggs, milk, melted butter), top with flour and salt, and blend on high for 30 seconds!'
  }
];

export const TOPPINGS_DATA = [
  {
    categoryFr: 'Les Classiques Incontournables',
    categoryEn: 'Timeless French Classics',
    items: [
      { nameFr: 'Beurre et Sucre roux de canne', nameEn: 'Salted Butter & Cane Sugar', descFr: 'Simple, croustillant sur les bords et nostalgique.', descEn: 'Simple, crisp at the edges and deeply comforting.' },
      { nameFr: 'Citron pressé & Sucre glace', nameEn: 'Fresh Lemon Juice & Icing Sugar', descFr: 'Le grand classique acidulé des crêperies bretonnes.', descEn: 'The zesty and light crêperie favorite.' },
      { nameFr: 'Pâte à tartiner chocolat noisette', nameEn: 'Chocolate Hazelnut Spread & Toasted Hazelnuts', descFr: 'Gourmande avec des éclats de noisettes torréfiées.', descEn: 'Rich, gooey and beloved by all ages.' }
    ]
  },
  {
    categoryFr: 'Pour les Gourmets',
    categoryEn: 'Artisanal & Gourmet Toppings',
    items: [
      { nameFr: 'Caramel au beurre salé de Guérande maison', nameEn: 'Homemade Salted Butter Caramel', descFr: 'Onctueux et chaud avec une pointe de fleur de sel.', descEn: 'Creamy, warm with a punch of fleur de sel.' },
      { nameFr: 'Suzette flambée au Grand Marnier', nameEn: 'Crêpe Suzette Flambée (Grand Marnier)', descFr: 'Sirop d\'orange caramélisé et zeste fin flambé.', descEn: 'Caramelized orange butter syrup, flambéed tableside.' },
      { nameFr: 'Pommes caramélisées & cannelle', nameEn: 'Caramelized Apples & Ceylon Cinnamon', descFr: 'Pommes fondantes rissolées dans du beurre salé.', descEn: 'Melt-in-your-mouth apples sautéed in golden butter.' }
    ]
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'anti-grumeaux',
    questionFr: 'Comment faire une recette facile de pâte à crêpes garantie sans grumeaux ?',
    questionEn: 'How to make an easy crepe batter guaranteed 100% lump-free?',
    answerFr: 'Le secret réside dans l\'incorporation progressive : versez toujours le lait tiède en 3 fois sur le mélange farine/œufs, en fouettant vigoureusement au centre. Si malgré tout quelques grumeaux apparaissent, pas de panique : passez un simple coup de mixeur plongeant ou passez la pâte au travers d\'une passoire fine (chinois).',
    answerEn: 'The secret is phased incorporation: always pour lukewarm milk in 3 stages over the flour-egg mixture, whisking from the center. If lumps ever appear, simply blend with an immersion stick blender for 15 seconds or strain through a fine mesh sieve.'
  },
  {
    id: 'temps-repos',
    questionFr: 'Le temps de repos de la pâte à crêpes est-il indispensable ?',
    questionEn: 'Is resting the crepe batter truly mandatory?',
    answerFr: 'Le repos de 30 minutes permet aux molécules d\'amidon de gonfler et au gluten de se détendre. C\'est ce qui confère aux crêpes leur texture soyeuse et élastique, évitant qu\'elles ne se cassent à la cuisson. Si vous êtes vraiment très pressé, utilisez du lait tiède (35°C) : la chaleur accélère l\'hydratation de la farine et vous pouvez cuire immédiatement.',
    answerEn: 'Resting for 30 minutes lets the starch grains expand and relaxes the gluten strands. This gives the crepes their silky, supple texture so they won\'t crack during flipping. In a rush? Use warm milk (around 35°C / 95°F) which accelerates flour hydration and lets you cook immediately.'
  },
  {
    id: 'beurre-huile',
    questionFr: 'Vaut-il mieux utiliser du beurre ou de l\'huile dans la pâte ?',
    questionEn: 'Is it better to use butter or oil in the batter?',
    answerFr: 'Le beurre fondu apporte une saveur de noisette incomparable et un goût pâtissier traditionnel. L\'huile neutre (tournesol ou pépins de raisin) assure quant à elle des crêpes qui restent encore plus souples une fois refroidies. Le compromis idéal : 40 g de beurre fondu pour le parfum + 1 cuillère à soupe d\'huile.',
    answerEn: 'Melted butter brings that authentic nutty flavor and rich aroma. Neutral oil (sunflower or grapeseed) keeps crepes exceptionally soft even when cooled down. The chef\'s secret compromise: 40g of browned butter for taste + 1 tablespoon of oil for flexibility.'
  },
  {
    id: 'crepes-salees',
    questionFr: 'Puis-je utiliser cette même pâte pour faire des crêpes salées ?',
    questionEn: 'Can I use this same batter recipe for savory crepes?',
    answerFr: 'Oui, absolument ! Il suffit simplement de supprimer le sucre vanillé et le parfum (rhum/fleur d\'oranger), et d\'ajouter un tour de moulin à poivre noir ainsi qu\'une pincée d\'herbes de Provence ou de ciboulette ciselée si vous le souhaitez. Vous obtiendrez de délicieuses crêpes salées à garnir de jambon, fromage emmental râpé et œuf miroir.',
    answerEn: 'Yes, absolutely! Simply omit the vanilla sugar and sweet flavorings (rum/orange blossom), and add a grind of black pepper and a pinch of dried thyme or fresh chives. You get perfect savory crepes ready for ham, melted Gruyère or Emmental cheese, and a sunny-side-up egg.'
  },
  {
    id: 'conservation',
    questionFr: 'Combien de temps conserver la pâte à crêpes et les crêpes cuites ?',
    questionEn: 'How long can I store raw batter and cooked crepes?',
    answerFr: 'La pâte crue se conserve 24 à 48 heures au réfrigérateur dans une bouteille fermée ou un pichet filmé. Les crêpes déjà cuites se gardent jusqu\'à 3 jours empilées sur une assiette enveloppée de film étirable, ou jusqu\'à 2 mois au congélateur séparées par des feuilles de papier sulfurisé.',
    answerEn: 'Raw batter keeps for 24 to 48 hours in the refrigerator tightly covered or stored in an airtight bottle. Cooked crepes stay fresh and soft for up to 3 days stacked on a plate covered with plastic wrap, or up to 2 months frozen with parchment paper between each crepe.'
  }
];

export const NUTRITION_DATA: NutritionItem[] = [
  { labelFr: 'Calories', labelEn: 'Calories', value: '115 kcal', dailyValue: '6%' },
  { labelFr: 'Glucides', labelEn: 'Carbohydrates', value: '16 g', dailyValue: '5%' },
  { labelFr: 'Protéines', labelEn: 'Protein', value: '4.2 g', dailyValue: '8%' },
  { labelFr: 'Lipides', labelEn: 'Fat', value: '3.8 g', dailyValue: '5%' },
  { labelFr: 'Sucres', labelEn: 'Sugars', value: '2.1 g', dailyValue: '2%' },
  { labelFr: 'Sodium', labelEn: 'Sodium', value: '65 mg', dailyValue: '3%' }
];
