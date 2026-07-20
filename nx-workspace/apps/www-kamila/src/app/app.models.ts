export type Language = 'pl' | 'en';

export interface NavItem {
  labelKey: string;
  target: string;
}

export interface SenseCard {
  titleKey: string;
  bodyKey: string;
  icon: string;
  accent: string;
  glow: string;
  wash: string;
}
