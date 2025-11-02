import { catalogDefaults, highlightIds } from './constants';
import {
  descriptionTextModules,
  imageModules,
  jsonMetaModules,
  priceTextModules,
} from './loaders';
import {
  ensureEntry,
  humanize,
  imagePriority,
  normalizePrice,
  normalizeSlug,
  sanitizeText,
  slugFromPath,
} from './helpers';
import type { CatalogBuilder, CatalogProduct } from './types';

const catalogMap: Record<string, CatalogBuilder> = {};

const registerImageModules = () => {
  Object.entries(imageModules).forEach(([path, url]) => {
    const slug = slugFromPath(path);
    if (!slug) return;
    ensureEntry(catalogMap, slug).images.push(url);
  });
};

const registerJsonMeta = () => {
  Object.entries(jsonMetaModules).forEach(([path, meta]) => {
    const slug = slugFromPath(path);
    if (!slug) return;

    const entry = ensureEntry(catalogMap, slug);
    entry.name = entry.name ?? sanitizeText(meta.name ?? meta.nome ?? meta.title ?? meta.subtitle);
    entry.description =
      entry.description ??
      sanitizeText(
        meta.description ?? meta.descricao ?? meta.descricaoCurta ?? meta.shortDescription,
      );
    entry.price =
      entry.price ?? normalizePrice(meta.price ?? meta.preco ?? meta.valor ?? meta.value);

    const orderValue =
      meta.order ?? meta.ordem ?? (typeof meta.highlight === 'number' ? meta.highlight : undefined);
    if (entry.order === undefined && typeof orderValue === 'number') {
      entry.order = orderValue;
    }
  });
};

const registerDescriptionTexts = () => {
  Object.entries(descriptionTextModules).forEach(([path, content]) => {
    const slug = slugFromPath(path);
    if (!slug) return;

    const entry = ensureEntry(catalogMap, slug);
    entry.description = entry.description ?? sanitizeText(content);
  });
};

const registerPriceTexts = () => {
  Object.entries(priceTextModules).forEach(([path, content]) => {
    const slug = slugFromPath(path);
    if (!slug) return;

    const entry = ensureEntry(catalogMap, slug);
    entry.price = entry.price ?? normalizePrice(content);
  });
};

const applyCatalogDefaults = () => {
  Object.entries(catalogDefaults).forEach(([slug, meta]) => {
    const entry = ensureEntry(catalogMap, normalizeSlug(slug));
    entry.name = entry.name ?? sanitizeText(meta.name);
    entry.description = entry.description ?? sanitizeText(meta.description);
    entry.price = entry.price ?? normalizePrice(meta.price);
    if (entry.order === undefined && typeof meta.order === 'number') {
      entry.order = meta.order;
    }
  });
};

const buildCatalog = (): CatalogProduct[] =>
  Object.values(catalogMap)
    .map((entry) => {
      const uniqueImages = Array.from(new Set(entry.images));
      const sortedImages = uniqueImages.sort((a, b) => {
        const diff = imagePriority(a) - imagePriority(b);
        return diff !== 0 ? diff : a.localeCompare(b);
      });

      return {
        id: entry.id,
        name: entry.name ?? humanize(entry.id),
        description:
          entry.description ??
          'Delícia artesanal da Soleil feita com ingredientes selecionados e muito carinho.',
        price: entry.price,
        images: sortedImages,
        order: entry.order,
      } satisfies CatalogProduct;
    })
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name, 'pt-BR');
    });

registerImageModules();
registerJsonMeta();
registerDescriptionTexts();
registerPriceTexts();
applyCatalogDefaults();

export const catalog: CatalogProduct[] = buildCatalog();

export const primaryImageById: Record<string, string | null> = Object.fromEntries(
  catalog.map((product) => [product.id, product.images[0] ?? null]),
);

export { highlightIds };

export const getProductById = (id: string) => catalog.find((product) => product.id === id);
