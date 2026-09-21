import { useState, useMemo } from 'react';
import {
  Clock,
  Users,
  ChefHat,
  Star,
  CheckCircle2,
  Flame,
  Award,
  Sparkles,
  ArrowUp,
  Bookmark,
  Heart,
  HelpCircle,
  Wheat,
  Egg,
  Milk,
  RotateCw
} from 'lucide-react';

import { Language } from './types';
import {
  RECIPE_STEPS,
  SECRETS_ANTI_GRUMEAUX,
  TOPPINGS_DATA,
  NUTRITION_DATA,
  INGREDIENTS_DATA
} from './data/recipeData';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { ShareButtons } from './components/ShareButtons';
import { ServingsCalculator } from './components/ServingsCalculator';
import { KitchenTimer } from './components/KitchenTimer';
import { RecipeFAQ } from './components/RecipeFAQ';
import { AudioPlayerTTS } from './components/AudioPlayerTTS';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [savedFavorite, setSavedFavorite] = useState(false);

  const toggleLanguage = () => {
    const nextLang = lang === 'fr' ? 'en' : 'fr';
    setLang(nextLang);
    // Update document HTML lang attribute dynamically
    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLang;
    }
  };

  // Compile speech sections for native browser Web Speech API Text-to-Speech
  const speechSections = useMemo(() => {
    if (lang === 'fr') {
      return [
        {
          id: 'fiche-recette',
          title: 'Introduction et fiche recette',
          text: 'Recette facile de pâte à crêpes traditionnelle française, inratable, rapide et sans grumeaux. Temps de préparation : 10 minutes. Cuisson : 15 minutes. Note de 4,9 sur 5 par plus de 1400 gourmands.'
        },
        {
          id: 'secrets-anti-grumeaux',
          title: 'Les secrets pour une pâte sans grumeaux',
          text: 'Secret numéro un : utilisez toujours du lait tiède plutôt que glacé. Secret numéro deux : incorporez le lait en trois fois en fouettant doucement au centre. Secret numéro trois : si vous êtes pressé, utilisez le blender pendant 30 secondes.'
        },
        {
          id: 'ingredients-detailles',
          title: 'Les ingrédients clés',
          text: `Pour 12 crêpes moelleuses : ${INGREDIENTS_DATA.map(i => `${i.amountPerCrepe * 12} ${i.unitFr} de ${i.nameFr}`).join(', ')}.`
        },
        ...RECIPE_STEPS.map(step => ({
          id: 'etapes-preparation',
          title: `Étape ${step.stepNumber} : ${step.titleFr}`,
          text: `${step.descriptionFr} Astuce de chef : ${step.chefTipFr || ''}`
        })),
        {
          id: 'repos-de-la-pate',
          title: 'Le temps de repos',
          text: 'Laisser reposer la pâte 30 minutes permet aux grains d’amidon de gonfler et au gluten de se détendre pour des crêpes qui ne se déchirent pas.'
        },
        {
          id: 'technique-cuisson',
          title: 'Technique de cuisson',
          text: 'Chauffez bien votre poêle ou crêpière, graissez légèrement au papier essuie-tout huilé, versez une louche et faites tourner le poignet. Cuisez une minute puis retournez.'
        }
      ];
    } else {
      return [
        {
          id: 'fiche-recette',
          title: 'Introduction and recipe overview',
          text: 'Easy French crepe batter recipe, foolproof, fluffy and guaranteed lump-free. Prep time: 10 minutes. Cook time: 15 minutes. Rated 4.9 out of 5 by over 1400 cooks.'
        },
        {
          id: 'secrets-anti-grumeaux',
          title: 'Secrets for lump-free crepe batter',
          text: 'Secret one: always use lukewarm milk instead of fridge-cold. Secret two: pour milk in 3 stages, whisking from the center. Secret three: express blender trick for 30 seconds.'
        },
        {
          id: 'ingredients-detailles',
          title: 'Key ingredients',
          text: `For 12 crepes: ${INGREDIENTS_DATA.map(i => `${i.amountPerCrepe * 12} ${i.unitEn} ${i.nameEn}`).join(', ')}.`
        },
        ...RECIPE_STEPS.map(step => ({
          id: 'etapes-preparation',
          title: `Step ${step.stepNumber}: ${step.titleEn}`,
          text: `${step.descriptionEn} Chef tip: ${step.chefTipEn || ''}`
        })),
        {
          id: 'repos-de-la-pate',
          title: 'Resting the batter',
          text: 'Resting the batter for 30 minutes relaxes the gluten network and creates tender, tear-proof crepes.'
        },
        {
          id: 'technique-cuisson',
          title: 'Cooking technique',
          text: 'Heat your non-stick skillet over medium-high, wipe lightly with oil, pour one ladle and swirl swiftly with your wrist. Cook for 60 seconds, flip and cook 30 seconds.'
        }
      ];
    }
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-800">
      {/* 1. Fixed Reading Progress Bar at the very top */}
      <ReadingProgressBar />

      {/* 2. Sticky Header with Brand and Language toggle */}
      <Header lang={lang} onToggleLang={toggleLanguage} />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex-1 w-full">
        {/* Article Header & SEO Meta Info */}
        <article className="space-y-8">
          {/* Breadcrumb & Categories */}
          <nav aria-label="Fil d'Ariane" className="text-xs text-stone-500 flex items-center gap-2 flex-wrap">
            <a href="#" className="hover:text-amber-800 hover:underline">
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </a>
            <span>/</span>
            <a href="#" className="hover:text-amber-800 hover:underline">
              {lang === 'fr' ? 'Pâtisserie Française' : 'French Pastries'}
            </a>
            <span>/</span>
            <span className="text-amber-900 font-semibold">
              {lang === 'fr' ? 'Pâte à Crêpes Facile' : 'Easy Crepe Batter'}
            </span>
          </nav>

          {/* Main Headings */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
                {lang === 'fr' ? 'Recette Inratable' : 'Foolproof Recipe'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                {lang === 'fr' ? 'Chandeleur & Goûter' : 'Tea Time & Dessert'}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'fr' ? 'Sans Grumeaux' : 'Lump-Free Guarantee'}
              </span>
            </div>

            {/* H1 Primary Target Keyword */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-display text-stone-950 tracking-tight leading-[1.18]">
              {lang === 'fr'
                ? 'Recette Facile Pâte à Crêpes : Inratable, Moelleuse et Rapide'
                : 'Easy Crepe Batter Recipe: Foolproof, Fluffy and Quick'}
            </h1>

            {/* Sub-hook with LSI keywords */}
            <p className="text-lg md:text-xl text-stone-600 font-normal leading-relaxed">
              {lang === 'fr'
                ? 'La vraie recette traditionnelle de pâte à crêpes maison : seulement 10 minutes de préparation, des ingrédients du placard et les 3 astuces infaillibles de grand-mère pour une texture soyeuse garantie sans aucun grumeau.'
                : 'The authentic traditional French crepe batter: only 10 minutes of prep, everyday pantry staples, and 3 proven chef secrets for a silky, melt-in-your-mouth texture with zero lumps.'}
            </p>

            {/* Author, Date, Rating & Save button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center font-serif-display text-base">
                  👨‍🍳
                </div>
                <div>
                  <p className="font-semibold text-stone-900">
                    {lang === 'fr' ? 'Par Chef Aurélien' : 'By Chef Aurélien'}
                  </p>
                  <p className="text-xs text-stone-500">
                    {lang === 'fr' ? 'Publié le 2 Février 2026 • Mis à jour' : 'Published Feb 2, 2026 • Updated'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-900">4.9/5</span>
                  <span className="text-stone-500 text-xs">(1 420 {lang === 'fr' ? 'avis' : 'reviews'})</span>
                </div>

                {/* Bookmark Favorite */}
                <button
                  type="button"
                  onClick={() => setSavedFavorite(!savedFavorite)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                    savedFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${savedFavorite ? 'fill-current text-rose-600' : ''}`} />
                  <span>{savedFavorite ? (lang === 'fr' ? 'Enregistré' : 'Saved') : (lang === 'fr' ? 'Enregistrer' : 'Save')}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Social Share Buttons */}
          <ShareButtons lang={lang} />

          {/* Featured Hero Media */}
          <div className="relative rounded-3xl overflow-hidden shadow-md border border-amber-200/80 bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80"
              alt={lang === 'fr' ? 'Recette facile pâte à crêpes dorées et moelleuses faites maison' : 'Easy homemade French crepes stacked golden and tender'}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                  {lang === 'fr' ? 'Fait maison' : 'Homemade Classic'}
                </span>
                <p className="text-sm sm:text-base font-medium drop-shadow-sm text-stone-100">
                  {lang === 'fr' ? 'Crêpes fines, souples et parfumées à la vanille ou au rhum' : 'Fine, supple crepes lightly scented with vanilla and brown butter'}
                </p>
              </div>
              <span className="text-xs bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20 text-stone-300">
                12-15 crêpes
              </span>
            </div>
          </div>

          {/* Audio Player: Browser Web Speech API TTS Feature */}
          <div className="no-print">
            <AudioPlayerTTS lang={lang} sections={speechSections} />
          </div>

          {/* Layout Grid: Table of Contents + Recipe Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Sidebar: Table of Contents & Quick Summary (4 cols on lg) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 order-2 lg:order-1">
              <TableOfContents lang={lang} />

              {/* Nutrition Card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <h4 className="font-bold text-sm text-stone-900 font-serif-display pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>{lang === 'fr' ? 'Valeurs Nutritionnelles' : 'Nutrition Facts'}</span>
                  <span className="text-[11px] font-normal text-stone-500 font-sans">
                    {lang === 'fr' ? 'Par crêpe' : 'Per crepe'}
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {NUTRITION_DATA.map((nut, idx) => (
                    <div key={idx} className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      <span className="text-xs text-stone-500 block">
                        {lang === 'fr' ? nut.labelFr : nut.labelEn}
                      </span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="font-bold text-stone-900 text-sm">{nut.value}</span>
                        {nut.dailyValue && (
                          <span className="text-[10px] text-amber-800 font-semibold">{nut.dailyValue}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Highlight Card */}
              <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-amber-50 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <ChefHat className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Le mot du Chef' : 'Chef’s Note'}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-100/90 italic">
                  {lang === 'fr'
                    ? '« La pâte à crêpes est le premier gâteau que l’on apprend enfant. En respectant le lait tiède et l’ajout en trois temps, vous réussirez à tous les coups sans salir le mixeur. »'
                    : '“Crepe batter is the first recipe most of us learn as kids. Stick to lukewarm milk and phase it in three times, and you’ll achieve perfection every single round without ever touching a blender.”'}
                </p>
              </div>
            </aside>

            {/* Right: Main Article Sections (8 cols on lg) */}
            <main className="lg:col-span-8 space-y-10 order-1 lg:order-2">
              {/* SECTION 1: #fiche-recette */}
              <section id="fiche-recette" className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {lang === 'fr' ? 'Fiche Synthèse Rapide' : 'Quick Reference Card'}
                    </span>
                    <h2 className="text-2xl font-bold font-serif-display text-stone-950 mt-0.5">
                      {lang === 'fr' ? 'La Pâte à Crêpes Parfaite en un Coup d’Œil' : 'Perfect Crepes at a Glance'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {lang === 'fr' ? 'Difficulté : Très Facile' : 'Skill Level: Easy'}
                    </span>
                  </div>
                </div>

                {/* Metrics 4-grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl">
                    <Clock className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      {lang === 'fr' ? 'Préparation' : 'Prep Time'}
                    </span>
                    <strong className="text-base font-bold text-stone-900">10 min</strong>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl">
                    <Flame className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      {lang === 'fr' ? 'Cuisson' : 'Cook Time'}
                    </span>
                    <strong className="text-base font-bold text-stone-900">15 min</strong>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl">
                    <RotateCw className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      {lang === 'fr' ? 'Repos' : 'Resting'}
                    </span>
                    <strong className="text-base font-bold text-stone-900">30 min</strong>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl">
                    <Users className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      {lang === 'fr' ? 'Rendement' : 'Yield'}
                    </span>
                    <strong className="text-base font-bold text-stone-900">12-15 crêpes</strong>
                  </div>
                </div>

                <div className="text-sm text-stone-700 leading-relaxed space-y-3">
                  <p>
                    {lang === 'fr'
                      ? 'Que ce soit pour le goûter des enfants, un brunch du dimanche ou la traditionnelle Chandeleur, cette recette facile de pâte à crêpes est la référence absolue de la cuisine française. Réalisée avec seulement de la farine, des œufs frais, du bon lait et une touche de beurre fondu, elle garantit des crêpes d’une finesse et d’une souplesse incomparables.'
                      : 'Whether for an afternoon snack, Sunday brunch, or the festive French Chandeleur, this easy crepe batter recipe stands as the gold standard of French home cooking. Prepared with simple pantry staples—flour, farm eggs, whole milk, and melted butter—it promises delicate, golden, and incredibly pliable crepes every time.'}
                  </p>
                </div>
              </section>

              {/* SECTION 2: #secrets-anti-grumeaux */}
              <section id="secrets-anti-grumeaux" className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-stone-900">
                      {lang === 'fr' ? 'Les 3 Secrets Infaillibles d’une Pâte Sans Grumeaux' : 'The 3 Proven Secrets for a Lump-Free Batter'}
                    </h2>
                    <p className="text-sm text-stone-600">
                      {lang === 'fr'
                        ? 'Finis les grumeaux qui ruinent la texture : appliquez ces 3 règles d’or'
                        : 'Say goodbye to pesky clumps with these 3 essential pastry techniques'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {SECRETS_ANTI_GRUMEAUX.map((sec, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs hover:border-amber-400 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center mb-3">
                        {idx + 1}
                      </div>
                      <h3 className="font-bold text-stone-900 text-base mb-1">
                        {lang === 'fr' ? sec.titleFr : sec.titleEn}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {lang === 'fr' ? sec.descFr : sec.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3: #ingredients-detailles (Interactive Calculator) */}
              <section className="space-y-4">
                <ServingsCalculator lang={lang} />
              </section>

              {/* SECTION 4: #materiel-recommande */}
              <section id="materiel-recommande" className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                <h2 className="text-2xl font-bold font-serif-display text-stone-900">
                  {lang === 'fr' ? 'Le Matériel Recommandé Pour un Résultat Pro' : 'Recommended Equipment for Best Results'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-700">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-xl">🍳</span>
                    <div>
                      <strong className="font-semibold text-stone-900 block">
                        {lang === 'fr' ? 'Une poêle crêpière antiadhésive (24 à 28 cm)' : 'Non-stick crepe pan (9 to 11 inches)'}
                      </strong>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {lang === 'fr' ? 'Les bords bas facilitent le passage de la spatule.' : 'Low rims make flipping and sliding seamless.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-xl">🥣</span>
                    <div>
                      <strong className="font-semibold text-stone-900 block">
                        {lang === 'fr' ? 'Un grand cul-de-poule et fouet ballon' : 'Large mixing bowl and wire whisk'}
                      </strong>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {lang === 'fr' ? 'Permet d’aérer la pâte vigoureusement sans éclabousser.' : 'Allows thorough aeration without splashing.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-xl">🥄</span>
                    <div>
                      <strong className="font-semibold text-stone-900 block">
                        {lang === 'fr' ? 'Une louche doseuse (environ 50 ml)' : 'Standard measuring ladle (~50 ml)'}
                      </strong>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {lang === 'fr' ? 'Assure une épaisseur régulière sur toutes les crêpes.' : 'Guarantees uniform thickness across every crepe.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-xl">🪵</span>
                    <div>
                      <strong className="font-semibold text-stone-900 block">
                        {lang === 'fr' ? 'Une spatule longue en bois ou silicone' : 'Long thin wooden or silicone spatula'}
                      </strong>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {lang === 'fr' ? 'Pour décoller délicatement les bords sans rayer la poêle.' : 'Gently releases edges without scratching non-stick coating.'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 5: #etapes-preparation */}
              <section id="etapes-preparation" className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-stone-900">
                      {lang === 'fr' ? 'Préparation Pas à Pas de la Pâte à Crêpes' : 'Step-by-Step Crepe Batter Preparation'}
                    </h2>
                    <p className="text-sm text-stone-600">
                      {lang === 'fr'
                        ? 'Suivez chaque étape détaillée pour un résultat digne d’une crêperie bretonne'
                        : 'Follow each precise step for a professional crêperie finish'}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {RECIPE_STEPS.map((step) => {
                    const title = lang === 'fr' ? step.titleFr : step.titleEn;
                    const desc = lang === 'fr' ? step.descriptionFr : step.descriptionEn;
                    const duration = lang === 'fr' ? step.durationFr : step.durationEn;
                    const tip = lang === 'fr' ? step.chefTipFr : step.chefTipEn;

                    return (
                      <div
                        key={step.stepNumber}
                        className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden group hover:border-amber-300 transition"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white font-extrabold text-base flex items-center justify-center flex-shrink-0 shadow-xs">
                            {step.stepNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                              <h3 className="text-lg sm:text-xl font-bold font-serif-display text-stone-950">
                                {title}
                              </h3>
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-600" />
                                {duration}
                              </span>
                            </div>

                            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                              {desc}
                            </p>

                            {tip && (
                              <div className="mt-3.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
                                <span className="text-sm font-bold text-amber-700 flex-shrink-0">💡</span>
                                <div>
                                  <strong className="font-semibold">
                                    {lang === 'fr' ? 'Astuce de Chef : ' : 'Chef Tip: '}
                                  </strong>
                                  <span>{tip}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 6: #repos-de-la-pate (with Timer) */}
              <section id="repos-de-la-pate" className="space-y-6">
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-serif-display text-stone-900">
                        {lang === 'fr' ? 'Pourquoi Laisser Reposer la Pâte ?' : 'Why Rest the Crepe Batter?'}
                      </h2>
                      <p className="text-sm text-stone-500">
                        {lang === 'fr' ? 'L’explication scientifique du moelleux' : 'The culinary science of tenderness'}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-stone-700 leading-relaxed space-y-3">
                    <p>
                      {lang === 'fr'
                        ? 'Beaucoup de recettes prétendent que le repos est inutile, mais la science pâtissière prouve le contraire ! Lorsque vous mélangez la farine au liquide, les protéines de gluten forment un maillage élastique. Sans temps de repos, vos crêpes risquent d’être caoutchouteuses et de se rétracter à la cuisson.'
                        : 'Many quick recipes claim resting is optional, but culinary science shows otherwise! When flour meets liquid, gluten proteins create an elastic web. Without resting, crepes can end up rubbery and shrink when heated in the pan.'}
                    </p>
                    <p>
                      {lang === 'fr'
                        ? 'En laissant reposer la pâte 30 minutes à température ambiante, le gluten se détend et les grains d’amidon s’imbibent d’eau. Résultat : une texture soyeuse, ultra fine et fondante en bouche.'
                        : 'A 30-minute rest at room temperature allows gluten to relax and starch granules to swell evenly. You get silky, paper-thin crepes that melt on the palate.'}
                    </p>
                  </div>

                  {/* Kitchen Timer Tool */}
                  <div className="pt-2">
                    <KitchenTimer lang={lang} />
                  </div>
                </div>
              </section>

              {/* SECTION 7: #technique-cuisson */}
              <section id="technique-cuisson" className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-5">
                <h2 className="text-2xl font-bold font-serif-display text-stone-900">
                  {lang === 'fr' ? 'La Technique de Cuisson & L’Art de Faire Sauter' : 'Cooking Technique & The Art of The Flip'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      {lang === 'fr' ? '1. La bonne température' : '1. Proper pan temperature'}
                    </span>
                    <h3 className="font-bold text-stone-900 text-base">
                      {lang === 'fr' ? 'Le test de la goutte d’eau' : 'The water droplet test'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'fr'
                        ? 'La poêle doit être bien chaude mais non fumante. Jetez quelques gouttes d’eau : si elles crépitent et glissent en billes, la poêle est à la température idéale.'
                        : 'The skillet should be hot but not smoking. Flick a drop of water: if it sizzles and dances as beads, the heat is spot on.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      {lang === 'fr' ? '2. Le tour de main' : '2. Swirl & spread motion'}
                    </span>
                    <h3 className="font-bold text-stone-900 text-base">
                      {lang === 'fr' ? 'Le mouvement circulaire fluide' : 'The fluid wrist swirl'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'fr'
                        ? 'Versez la louche d’un trait au centre tout en faisant pivoter la poêle d’un geste rapide du poignet pour napper uniformément toute la surface.'
                        : 'Pour the ladle directly into the center while tilting and swirling the pan in a swift circular wrist motion to spread the batter into a wafer-thin layer.'}
                    </p>
                  </div>
                </div>

                {/* Cultural anecdote: flipping with a gold coin */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                  <span className="text-xl">🪙</span>
                  <div>
                    <strong className="font-semibold text-stone-900 block mb-0.5">
                      {lang === 'fr' ? 'La tradition de la pièce d’or à la Chandeleur :' : 'The Chandeleur Gold Coin Tradition:'}
                    </strong>
                    <span>
                      {lang === 'fr'
                        ? 'En France, la tradition veut que l’on fasse sauter la première crêpe de la main droite en tenant une pièce de monnaie dans la main gauche. Si la crêpe atterrit bien à plat dans la poêle, cela assure prospérité et bonheur pour toute l’année !'
                        : 'French tradition says you should flip your first crepe with your right hand while holding a gold coin in your left. If the crepe lands flat, your family will enjoy good fortune and prosperity all year long!'}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 8: #idees-garnitures */}
              <section id="idees-garnitures" className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-stone-900">
                      {lang === 'fr' ? 'Idées de Garnitures Incontournables' : 'Irresistible Topping Ideas'}
                    </h2>
                    <p className="text-sm text-stone-600">
                      {lang === 'fr' ? 'Du grand classique rétro aux accords les plus gourmets' : 'From timeless classics to modern gourmet twists'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {TOPPINGS_DATA.map((group, gIdx) => (
                    <div key={gIdx} className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs space-y-3">
                      <h3 className="font-bold text-stone-900 text-base font-serif-display pb-2 border-b border-stone-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>{lang === 'fr' ? group.categoryFr : group.categoryEn}</span>
                      </h3>
                      <div className="space-y-3">
                        {group.items.map((item, iIdx) => (
                          <div key={iIdx} className="text-xs">
                            <span className="font-semibold text-stone-800 text-sm block">
                              {lang === 'fr' ? item.nameFr : item.nameEn}
                            </span>
                            <span className="text-stone-500">
                              {lang === 'fr' ? item.descFr : item.descEn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 9: #conservation-astuces */}
              <section id="conservation-astuces" className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                <h2 className="text-2xl font-bold font-serif-display text-stone-900">
                  {lang === 'fr' ? 'Conservation & Préparation à l’Avance' : 'Storage & Make-Ahead Tips'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-700">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <strong className="font-semibold text-stone-900 block mb-1">
                      {lang === 'fr' ? 'La pâte crue au réfrigérateur' : 'Raw batter in fridge'}
                    </strong>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'fr'
                        ? 'Versez la pâte dans une bouteille en verre propre fermée. Elle se garde 24 à 48 heures au frais. Avant de l’utiliser, secouez bien et ajoutez 2 c. à soupe de lait si elle s’est épaissie.'
                        : 'Store batter in a clean capped bottle or covered pitcher for up to 48 hours. Shake well before cooking, adding 2 tbsp of milk if it thickened.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <strong className="font-semibold text-stone-900 block mb-1">
                      {lang === 'fr' ? 'Les crêpes cuites moelleuses' : 'Cooked crepes storage'}
                    </strong>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'fr'
                        ? 'Empilez les crêpes tièdes sur une assiette et recouvrez immédiatement de film étirable pour emprisonner la vapeur : elles resteront ultra souples jusqu’au lendemain.'
                        : 'Stack warm crepes on a plate and cover tightly with cling wrap to trap gentle steam: they will stay exceptionally soft until the next day.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 10: #faq-questions */}
              <RecipeFAQ lang={lang} />

              {/* Bottom Social Share Bar */}
              <div className="pt-6">
                <ShareButtons lang={lang} />
              </div>
            </main>
          </div>
        </article>
      </div>

      {/* Footer with SEO mentions, Copyright, and Back to top */}
      <footer className="bg-stone-900 text-stone-400 mt-16 pt-12 pb-8 border-t border-stone-800 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <span className="font-serif-display text-lg font-bold text-white block">
                L'Atelier des Crêpes
              </span>
              <p className="text-stone-400 text-xs mt-1">
                {lang === 'fr'
                  ? 'Recette facile de pâte à crêpes traditionnelle, rapide et inratable.'
                  : 'Easy authentic French crepe batter recipe, quick and foolproof.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition"
              >
                <ArrowUp className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
            <p>
              © {new Date().getFullYear()} L'Atelier des Crêpes. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <p>
              {lang === 'fr'
                ? 'Cuisiné avec passion • Recette testée et approuvée'
                : 'Baked with passion • Tested and approved traditional recipe'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
