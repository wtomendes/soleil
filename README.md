# Soleil Doces — Catálogo e Vendas

> Um site que nasceu para ajudar minha mãe a vender os doces dela e organizar o catálogo de produtos — e também como meu objeto de estudo em Frontend (React) e Tailwind CSS.

## 🌞 História rápida
Sempre vi minha mãe receber pedidos por WhatsApp, fotos espalhadas na galeria e preços anotados em rascunhos. Decidi juntar tudo num só lugar: um site simples, bonito e rápido, onde dá pra ver os produtos, entender o que é cada um e já pedir pelo WhatsApp com a mensagem pronta.

De quebra, usei o projeto para estudar e praticar Frontend moderno (React + Vite), organização de dados e estilização com Tailwind CSS.

## ✨ O que o site faz
- Catálogo automático a partir das pastas de imagens em `assets/docinhos/*`
- Nome, preço e descrição por produto (defaults + sobrescritas por arquivos na pasta do produto)
- Botão “Pedir” que abre o WhatsApp com mensagem preenchida (produto, preço e opções quando existir)
- Páginas: Home (destaques), Cardápio (todos os produtos), Galeria (fotos do produto)
- Estilização com Tailwind e componentes reaproveitáveis

## 🧱 Como os dados funcionam
- Cada produto é uma pasta dentro de `src/assets/docinhos/<slug-do-produto>/` com as imagens
- Pode ter arquivos opcionais para sobrescrever dados:
  - `meta.json` (ou `metadata.json`/`info.json`/`data.json`) com `name`, `description`, `price`, etc.
  - `descricao.txt` (ou `.md`) para descrição
  - `preco.txt` (ou `.md`) para preço
- O código usa `import.meta.glob` para varrer as pastas e montar o catálogo automaticamente

## 🧩 Stack técnica
- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Vite glob imports para montar o catálogo via arquivos

## 📁 Estrutura principal
```
soleil-frontend
├── src
│   ├── assets/                 # Imagens e mídias do catálogo
│   ├── components/
│   │   └── ui/                 # Botões, cards, etc.
│   ├── config/
│   │   └── contact.ts          # WhatsApp/Instagram centralizados
│   ├── data/
│   │   ├── catalog/            # Catálogo modular (loaders/helpers/constants)
│   │   ├── mock.ts             # Destaques da home
│   │   └── productDetails.ts   # Detalhes extras (ex.: sabores)
│   ├── pages/                  # Home, Cardápio e Galeria
│   └── styles/                 # Estilos globais
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.mts
```

## 🙌 Agradecimentos
- À minha mãe, pela inspiração (e pelos doces!).
- Student Pack do GitHub, por apoiar o aprendizado.
