import type { CatalogMeta } from './types';

export const catalogDefaults: Record<string, Partial<CatalogMeta>> = {
  'torta-morango': {
    name: 'Torta de Morango',
    description:
      'Massa leve, creme de baunilha e morangos frescos finalizados com geleia artesanal da Soleil.',
    order: 1,
    price: '23,00',
  },
  'torta-de-chocolate-com-base-soleil': {
    name: 'Torta de Chocolate com Base Soleil',
    description:
      'Base crocante exclusiva da Soleil, recheio cremoso de chocolate meio amargo e cobertura espelhada.',
    order: 2,
    price: '23,00',
  },
  'torta-de-chocolate-com-kitkat': {
    name: 'Torta de Chocolate com KitKat',
    description:
      'Torta intensa de chocolate com camadas crocantes de KitKat e ganache aveludada.',
    order: 3,
    price: '23,00',
  },
  'torta-banoff': {
    name: 'Torta Banoff',
    description:
      'Clássica banoffee com doce de leite cremoso, bananas caramelizadas e chantilly leve.',
    order: 4,
    price: '23,00',
  },
  'torta-de-amora': {
    name: 'Bolo de Amora com Limão Siciliano',
    description:
      'Bolo feito com amoras frescas, toque cítrico de limão siciliano e cobertura cremosa.',
    order: 5,
    price: '80,00',
  },
  'bolo-de-brigadeiro-de-doce-de-leite': {
    name: 'Bolo de Brigadeiro de Doce de Leite',
    description:
      'Camadas macias de bolo úmido com recheio duplo de brigadeiro de doce de leite, decorado com confeitos.',
    order: 6,
    price: '12,00',
  },
  'bolo-fitness-maca-banana': {
    name: 'Bolo Fitness Maçã & Banana',
    description:
      'Receita leve com farinha integral, maçã e banana frescas, adoçado naturalmente com canela e coberto com chocolate meio amargo.',
    order: 7,
    price: '15,00',
  },
  cocada: {
    name: 'Cocada Tradicional',
    description:
      'Clássica cocada feita com coco fresco, receita secreta milenar de família.',
    order: 8,
    price: '15,00',
  },
  brownies: {
    name: 'Brownies Soleil',
    description:
      'Brownies úmidos e intensos com mix de chocolates premium e finalização artesanal.',
    order: 9,
    price: '12,00',
  },
  'cookie-nutella': {
    name: 'Cookie Recheado com Nutella',
    description:
      'Cookie gigante com casquinha crocante, recheio generoso de Nutella e finalização com M&Ms.',
    order: 10,
    price: '16,00',
  },
  'cookies-chocolate-cafe-e-recheiochocolatebranco': {
    name: 'Cookies de Chocolate, Café & Chocolate Branco',
    description:
      'Seleção de cookies artesanais com notas de café e pedaços de chocolate branco cremoso.',
    order: 11,
    price: '14,00',
  },
  'kit-4-bombons': {
    name: 'Kit 4 Bombons Gourmet',
    description:
      'Caixinha com quatro bombons exclusivos em sabores variados da casa. Escolha o seu sabor favorito!',
    order: 12,
    price: '12,00',
  },
  'pudim-de-morango': {
    name: 'Pudim de Morango',
    description:
      'Pudim cremoso com calda de morango fresco e textura delicada.',
    order: 13,
    price: '14,00',
  },
  'pudim-docedeleite-pequeno': {
    name: 'Pudim de Doce de Leite (Pequeno)',
    description:
      'Versão individual do clássico pudim de doce de leite, com cereja.',
    order: 14,
    price: '14,00',
  },
  'pudim-grande-docedeleite': {
    name: 'Pudim de Doce de Leite (Grande)',
    description:
      'Pudim familiar de doce de leite com textura firme e calda brilhante.',
    order: 15,
    price: '100,00',
  },
  'pudim-grande-nutella': {
    name: 'Pudim de Nutella (Grande)',
    description:
      'Pudim tamanho família com base de leite condensado e generosas colheradas de Nutella.',
    order: 16,
    price: '100,00',
  },
  'pudim-nutella-pequeno': {
    name: 'Pudim de Nutella (Pequeno)',
    description:
      'Porção individual do pudim de Nutella com sabor inesquecível.',
    order: 17,
    price: '14,00',
  },
  'salada-de-frutas': {
    name: 'Salada de Frutas Soleil',
    description:
      'Mix refrescante de frutas selecionadas, servido com calda cítrica ou calda doce.',
    order: 18,
    price: '15,00',
  },
};

export const highlightIds = ['torta-morango', 'cookie-nutella', 'brownies'];
