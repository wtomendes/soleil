import { catalog, highlightIds } from './catalog';

export type Product = {
  id: string;
  name: string;
  description: string;
  price?: string;
  image: string | null;
};

export const products: Product[] = highlightIds
  .map((id) => {
    const entry = catalog.find((product) => product.id === id);
    if (!entry) return undefined;
    return {
      id: entry.id,
      name: entry.name,
      description: entry.description,
      price: entry.price,
      image: entry.images[0] ?? null,
    };
  })
  .filter(Boolean) as Product[];


