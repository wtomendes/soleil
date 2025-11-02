import type { CatalogMeta } from './types';

export const imageModules = import.meta.glob<string>(
  '../../assets/docinhos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' },
) as Record<string, string>;

export const jsonMetaModules = {
  ...import.meta.glob<CatalogMeta>('../../assets/docinhos/*/meta.json', {
    eager: true,
    import: 'default',
  }),
  ...import.meta.glob<CatalogMeta>('../../assets/docinhos/*/metadata.json', {
    eager: true,
    import: 'default',
  }),
  ...import.meta.glob<CatalogMeta>('../../assets/docinhos/*/info.json', {
    eager: true,
    import: 'default',
  }),
  ...import.meta.glob<CatalogMeta>('../../assets/docinhos/*/data.json', {
    eager: true,
    import: 'default',
  }),
} as Record<string, CatalogMeta>;

export const descriptionTextModules = {
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/descricao.txt',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/descricao.md',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/description.txt',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/description.md',
    { eager: true, query: '?raw', import: 'default' },
  ),
} as Record<string, string>;

export const priceTextModules = {
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/preco.txt',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/preco.md',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/price.txt',
    { eager: true, query: '?raw', import: 'default' },
  ),
  ...import.meta.glob<string>(
    '../../assets/docinhos/*/price.md',
    { eager: true, query: '?raw', import: 'default' },
  ),
} as Record<string, string>;
