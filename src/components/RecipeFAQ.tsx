import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { FAQS_DATA } from '../data/recipeData';

interface RecipeFAQProps {
  lang: Language;
}

export function RecipeFAQ({ lang }: RecipeFAQProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'anti-grumeaux': true, // first item open by default
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq-questions" className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-stone-900">
            {lang === 'fr' ? 'Foire Aux Questions sur la Pâte à Crêpes' : 'Frequently Asked Questions about Crepes'}
          </h2>
          <p className="text-sm text-stone-600">
            {lang === 'fr'
              ? 'Toutes les réponses pour réussir des crêpes parfaites du premier coup'
              : 'All the expert answers to master french crepes on your first try'}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {FAQS_DATA.map((item) => {
          const isOpen = !!openIds[item.id];
          const question = lang === 'fr' ? item.questionFr : item.questionEn;
          const answer = lang === 'fr' ? item.answerFr : item.answerEn;

          return (
            <div
              key={item.id}
              className="border border-stone-200 bg-white rounded-2xl overflow-hidden transition-shadow shadow-xs hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4 font-semibold text-stone-900 transition hover:bg-stone-50"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg leading-snug">{question}</span>
                <span
                  className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-amber-100 text-amber-800' : 'text-stone-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 md:px-5 text-sm md:text-base text-stone-700 leading-relaxed border-t border-stone-100 pt-3">
                  <p>{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
