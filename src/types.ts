export type Language = 'fr' | 'en';

export interface Ingredient {
  id: string;
  nameFr: string;
  nameEn: string;
  amountPerCrepe: number; // base per 1 crepe
  unitFr: string;
  unitEn: string;
  notesFr?: string;
  notesEn?: string;
  category: 'base' | 'liquide' | 'saveur';
}

export interface RecipeStep {
  stepNumber: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  durationFr: string;
  durationEn: string;
  chefTipFr?: string;
  chefTipEn?: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
}

export interface NutritionItem {
  labelFr: string;
  labelEn: string;
  value: string;
  dailyValue?: string;
}
