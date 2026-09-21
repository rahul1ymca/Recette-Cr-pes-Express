import { useState } from 'react';
import { Minus, Plus, Check, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { INGREDIENTS_DATA, BASE_SERVINGS } from '../data/recipeData';

interface ServingsCalculatorProps {
  lang: Language;
}

export function ServingsCalculator({ lang }: ServingsCalculatorProps) {
  const [servings, setServings] = useState<number>(BASE_SERVINGS);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleDecrease = () => {
    if (servings > 4) setServings((prev) => prev - 2);
  };

  const handleIncrease = () => {
    if (servings < 48) setServings((prev) => prev + 2);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecks = () => {
    setCheckedItems({});
  };

  const formatAmount = (amountPerCrepe: number, count: number, unit: string) => {
    const total = amountPerCrepe * count;
    if (unit === 'pincée(s)' || unit === 'pinch(es)') {
      const pinches = Math.max(1, Math.round(total));
      return `${pinches}`;
    }
    if (unit === '') {
      // Eggs: round to nearest half or whole
      const eggs = Math.round(total * 10) / 10;
      return eggs % 1 === 0 ? `${eggs}` : `${eggs.toFixed(1)}`;
    }
    if (total >= 1000 && (unit === 'ml' || unit === 'g')) {
      const inKgOrL = (total / 1000).toFixed(2).replace(/\.?0+$/, '');
      return `${inKgOrL} ${unit === 'ml' ? 'L' : 'kg'}`;
    }
    return `${Math.round(total)} ${unit}`;
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div
      id="ingredients-detailles"
      className="bg-stone-50 border border-amber-200/80 rounded-2xl p-5 md:p-6 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h3 className="text-xl font-bold font-serif-display text-stone-900">
            {lang === 'fr' ? 'Ingrédients & Quantités' : 'Ingredients & Measurements'}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'fr'
              ? 'Ajustez le nombre de crêpes pour recalculer automatiquement les proportions'
              : 'Adjust the number of crepes to automatically recalculate quantities'}
          </p>
        </div>

        {/* Servings Stepper */}
        <div className="flex items-center gap-3 bg-white border border-stone-300 px-3 py-1.5 rounded-xl shadow-xs self-start sm:self-auto">
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            {lang === 'fr' ? 'Portions :' : 'Yield:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              id="servings-decrease-btn"
              type="button"
              onClick={handleDecrease}
              disabled={servings <= 4}
              className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 disabled:opacity-40 flex items-center justify-center transition"
              aria-label="Diminuer les portions"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-base text-amber-900 min-w-[5ch] text-center">
              {servings} {lang === 'fr' ? 'crêpes' : 'crepes'}
            </span>
            <button
              id="servings-increase-btn"
              type="button"
              onClick={handleIncrease}
              disabled={servings >= 48}
              className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 disabled:opacity-40 flex items-center justify-center transition"
              aria-label="Augmenter les portions"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress of checked ingredients */}
      <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
        <span>
          {lang === 'fr'
            ? `${completedCount} sur ${INGREDIENTS_DATA.length} ingrédients cochés`
            : `${completedCount} of ${INGREDIENTS_DATA.length} ingredients checked`}
        </span>
        {completedCount > 0 && (
          <button
            type="button"
            onClick={resetChecks}
            className="flex items-center gap-1 text-amber-700 hover:underline font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{lang === 'fr' ? 'Réinitialiser' : 'Reset checklist'}</span>
          </button>
        )}
      </div>

      {/* Ingredients List with checkboxes */}
      <ul className="mt-3 divide-y divide-stone-200/70">
        {INGREDIENTS_DATA.map((ing) => {
          const isChecked = !!checkedItems[ing.id];
          const name = lang === 'fr' ? ing.nameFr : ing.nameEn;
          const unit = lang === 'fr' ? ing.unitFr : ing.unitEn;
          const notes = lang === 'fr' ? ing.notesFr : ing.notesEn;
          const formattedQuantity = formatAmount(ing.amountPerCrepe, servings, unit);

          return (
            <li
              key={ing.id}
              onClick={() => toggleCheck(ing.id)}
              className={`py-3 flex items-start gap-3 cursor-pointer group rounded-xl px-2.5 transition ${
                isChecked ? 'bg-amber-50/60 opacity-60 line-through text-stone-400' : 'hover:bg-white'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition flex-shrink-0 ${
                  isChecked
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'border-stone-300 bg-white group-hover:border-amber-500'
                }`}
                aria-label={`Cocher ${name}`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className={`text-sm font-medium ${isChecked ? 'text-stone-400' : 'text-stone-800'}`}>
                    {name}
                  </span>
                  {notes && (
                    <p className="text-xs text-stone-500 font-normal mt-0.5">
                      {notes}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 self-start sm:self-auto font-mono text-sm font-bold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {formattedQuantity}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pro tip banner */}
      <div className="mt-4 p-3.5 bg-amber-100/70 border border-amber-300/80 rounded-xl flex items-start gap-3 text-xs text-amber-950">
        <span className="text-base leading-none">💡</span>
        <div>
          <strong className="font-semibold block">
            {lang === 'fr' ? 'Astuce proportion d’or (La règle 1 - 2 - 3 - 4) :' : 'The Golden Rule of Crepes (1-2-3-4 ratio):'}
          </strong>
          <span>
            {lang === 'fr'
              ? 'Pour retenir la recette sans carnet : 1 pincée de sel, 2 cuillères de sucre/beurre, 3 verres de lait (500 ml) et 4 œufs pour 250 g de farine.'
              : 'Easy mnemonic: 1 pinch of salt, 2 tbsp sugar/melted butter, 3 cups of milk (~500ml), and 4 eggs for 250g flour.'}
          </span>
        </div>
      </div>
    </div>
  );
}
