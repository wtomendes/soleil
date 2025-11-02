const WHATSAPP_NUMBER = '5511968023643';
const WHATSAPP_DISPLAY_NUMBER = '(11) 96802-3643';
// Emoji removido para evitar exibição como "?" em alguns dispositivos/fontes
const WHATSAPP_BASE_MESSAGE = 'Olá! Gostaria de fazer uma encomenda na Soleil Doces';

const INSTAGRAM_HANDLE = 'docesoleil';
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export type WhatsAppProductContext = {
  id?: string;
  name?: string;
  price?: string; // já formatado como 12,00
  detailsTitle?: string;
  detailsItems?: string[]; // sabores/opções sugeridas
};

const buildProductMessage = (ctx?: WhatsAppProductContext) => {
  if (!ctx || (!ctx.name && !ctx.id)) return WHATSAPP_BASE_MESSAGE;

  const lines: string[] = [];
  lines.push(WHATSAPP_BASE_MESSAGE);
  lines.push('');
  if (ctx.name) lines.push(`• Produto: ${ctx.name}`);
  if (ctx.price) lines.push(`• Preço: R$ ${ctx.price}`);

  // Sugerir informações que o cliente pode completar
  lines.push('');
  lines.push('Quantidade: ___');
  lines.push('Data desejada: ___');
  // Pedido simplificado conforme solicitação (sem Retirada/Entrega)

  if (ctx.detailsItems && ctx.detailsItems.length) {
    lines.push('');
    lines.push(ctx.detailsTitle ?? 'Opções/observações:');
    // Mostra até 5 opções para referência
    const preview = ctx.detailsItems.slice(0, 5);
    lines.push(`- ${preview.join('\n- ')}`);
  }

  return lines.join('\n');
};

export const buildWhatsAppLink = (product?: WhatsAppProductContext) => {
  const message = buildProductMessage(product);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const contactInfo = {
  whatsappDisplay: WHATSAPP_DISPLAY_NUMBER,
  instagramHandle: `@${INSTAGRAM_HANDLE}`,
  instagramUrl: INSTAGRAM_URL,
};
