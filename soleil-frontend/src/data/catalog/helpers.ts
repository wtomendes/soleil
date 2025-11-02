import type { CatalogBuilder } from './types';

export const normalizePath = (path: string) => path.replace(/\\/g, '/');

export const normalizeSlug = (value: string) => {
  const cleaned = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return cleaned || value.trim().toLowerCase();
};

export const slugFromPath = (path: string) => {
  const segments = normalizePath(path).split('/');
  const segment = segments.length >= 2 ? segments[segments.length - 2] ?? '' : '';
  return normalizeSlug(segment);
};

export const ensureEntry = (map: Record<string, CatalogBuilder>, id: string): CatalogBuilder => {
  if (!map[id]) {
    map[id] = { id, images: [] };
  }
  return map[id];
};

export const sanitizeText = (value?: string) => value?.replace(/\s+/g, ' ').trim();

export const normalizePrice = (value?: string) => {
  const cleaned = sanitizeText(value);
  if (!cleaned) return undefined;
  return cleaned.replace(/^R\$\s*/i, '').trim();
};

export const baseFileName = (path: string) => {
  const normalized = normalizePath(path);
  return normalized.substring(normalized.lastIndexOf('/') + 1).toLowerCase();
};

export const imagePriority = (path: string) => {
  const file = baseFileName(path);
  if (/(capa|cover|principal)/.test(file)) return 0;
  if (/(^|[-_])(0?1|01)([^0-9]|$)/.test(file)) return 1;
  return 2;
};

export const humanize = (slug: string) =>
  slug
    .split('-')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ')
    .trim();
