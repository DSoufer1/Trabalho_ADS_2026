import { Category, Status } from '../types/report';

export interface CategoryMeta {
  value: Category;
  label: string;
  icon: string;
  color: string;
}

export interface StatusMeta {
  value: Status;
  label: string;
  color: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { value: 'iluminacao', label: 'Iluminação pública', icon: '💡', color: '#F4A100' },
  { value: 'buraco', label: 'Buraco na via', icon: '🕳️', color: '#8B5E3C' },
  { value: 'dengue', label: 'Foco de dengue', icon: '🦟', color: '#C0392B' },
];

export const STATUSES: StatusMeta[] = [
  { value: 'aberto', label: 'Aberto', color: '#C0392B' },
  { value: 'andamento', label: 'Em andamento', color: '#E67E22' },
  { value: 'resolvido', label: 'Resolvido', color: '#1E8449' },
];

export function categoryMeta(value: Category): CategoryMeta {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[0];
}

export function statusMeta(value: Status): StatusMeta {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}
