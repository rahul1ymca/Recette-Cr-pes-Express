import { Globe, UtensilsCrossed, ArrowDown, Printer } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
}

export function Header({ lang, onToggleLang }: HeaderProps) {
  const scrollToRecipe = () => {
    const el = document.getElementById('fiche-recette');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-amber-200/70 sticky top-1 z-40 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <a href="#" className="font-serif-display font-bold text-lg text-stone-900 leading-tight block hover:text-amber-700 transition">
              L'Atelier des Crêpes
            </a>
            <span className="text-[11px] font-medium text-amber-800 tracking-wide block">
              {lang === 'fr' ? 'Blog Culinaire Traditionnel' : 'Traditional French Pastry Blog'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Jump to recipe button */}
          <button
            id="jump-to-recipe-btn"
            type="button"
            onClick={scrollToRecipe}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition"
          >
            <ArrowDown className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'fr' ? 'Aller à la recette' : 'Jump to recipe'}</span>
          </button>

          {/* Print button */}
          <button
            id="header-print-btn"
            type="button"
            onClick={() => window.print()}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            title="Imprimer la recette"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Imprimer' : 'Print'}</span>
          </button>

          {/* Language Switch Toggle FR <-> EN */}
          <button
            id="lang-toggle-btn"
            type="button"
            onClick={onToggleLang}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
            aria-label="Changer de langue"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="tracking-wider uppercase">
              {lang === 'fr' ? 'FR ➔ EN' : 'EN ➔ FR'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
