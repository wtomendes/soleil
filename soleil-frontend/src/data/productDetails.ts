export type ProductDetails = {
  title: string;
  items: string[];
};

const detailsById: Record<string, ProductDetails> = {
  'kit-4-bombons': {
    title: 'Sabores disponíveis',
    items: ['Morango', 'Pistache', 'Chocolate com café', 'Maracujá', 'Limão / Limão siciliano'],
  },
};

export const getProductDetails = (productId: string) => detailsById[productId];
