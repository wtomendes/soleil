export type CatalogMeta = {
  name?: string;
  nome?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  descricao?: string;
  descricaoCurta?: string;
  shortDescription?: string;
  price?: string;
  preco?: string;
  valor?: string;
  value?: string;
  order?: number;
  ordem?: number;
  highlight?: number;
};

export type CatalogBuilder = {
  id: string;
  name?: string;
  description?: string;
  price?: string;
  order?: number;
  images: string[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  price?: string;
  images: string[];
  order?: number;
};
