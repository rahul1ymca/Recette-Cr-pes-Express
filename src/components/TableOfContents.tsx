import React, { useState, useEffect } from 'react';
import { List, ChevronRight, BookOpen } from 'lucide-react';
import { Language } from '../types';

interface TocItem {
  id: string;
  titleFr: string;
  titleEn: string;
  badgeFr?: string;
  badgeEn?: string;
}

const TOC_ITEMS: TocItem[] = [
  { id: 'fiche-recette', titleFr: 'Fiche Rapide & Ingrédients Clés', titleEn: 'Quick Recipe Card & Key Ingredients', badgeFr: '10 min', badgeEn: '10 min' },
  { id: 'secrets-anti-grumeaux', titleFr: 'Les 3 Secrets Sans Grumeaux', titleEn: '3 Secrets for Lump-Free Batter', badgeFr: 'Essentiel', badgeEn: 'Crucial' },
  { id: 'ingredients-detailles', titleFr: 'Calculateur d\'Ingrédients & Portions', titleEn: 'Ingredients & Servings Scaler', badgeFr: 'Interactif', badgeEn: 'Interactive' },
  { id: 'materiel-recommande', titleFr: 'Le Matériel Recommandé', titleEn: 'Recommended Equipment' },
  { id: 'etapes-preparation', titleFr: 'Étapes de Préparation Pas à Pas', titleEn: 'Step-by-Step Instructions', badgeFr: 'Guide', badgeEn: 'Guide' },
  { id: 'repos-de-la-pate', titleFr: 'Pourquoi Reposer la Pâte ? (+ Chrono)', titleEn: 'Why Rest Batter? (+ Timer)', badgeFr: 'Chrono', badgeEn: 'Timer' },
  { id: 'technique-cuisson', titleFr: 'Cuisson Parfaite & Tour de Main', titleEn: 'Perfect Cooking & Pan Flips' },
  { id: 'idees-garnitures', titleFr: 'Idées de Garnitures Gourmandes', titleEn: 'Delicious Topping Ideas' },
  { id: 'conservation-astuces', titleFr: 'Conservation & Congélation', titleEn: 'Storage & Make-Ahead' },
  { id: 'faq-questions', titleFr: 'Questions Fréquentes (FAQ)', titleEn: 'Frequently Asked Questions', badgeFr: 'FAQ', badgeEn: 'FAQ' }
];

interface TableOfContentsProps {
  lang: Language;
}

export function TableOfContents({ lang }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('fiche-recette');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-80px 0% -60% 0%', threshold: 0 }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      id="table-of-contents"
      aria-label={lang === 'fr' ? 'Sommaire de l’article' : 'Table of contents'}
      className="bg-stone-50/90 border border-stone-200/80 rounded-2xl p-5 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
          <List className="w-5 h-5 text-amber-600" />
          <span>{lang === 'fr' ? 'Sommaire de la Recette' : 'Table of Contents'}</span>
        </div>
        <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          {lang === 'fr' ? '~4 min de lecture' : '~4 min read'}
        </span>
      </div>

      <ul className="space-y-1 text-sm font-medium">
        {TOC_ITEMS.map((item, index) => {
          const isActive = activeId === item.id;
          const title = lang === 'fr' ? item.titleFr : item.titleEn;
          const badge = lang === 'fr' ? item.badgeFr : item.badgeEn;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 group ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-950 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transition ${
                      isActive
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-200 text-stone-600 group-hover:bg-amber-200 group-hover:text-amber-900'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate">{title}</span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                        isActive
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-200/80 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-900'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-amber-800 translate-x-0.5' : 'text-stone-400 opacity-50 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
