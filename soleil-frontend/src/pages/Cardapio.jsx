import React, { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { catalog } from '../data/catalog';
import { buildWhatsAppLink } from '../config/contact';
import { CARDAPIO_SCROLL_STORAGE_KEY, CARDAPIO_SCROLL_TTL_MS } from '../constants/storage';

const Cardapio = () => {
  const navigate = useNavigate();

  // Controla a rolagem ao entrar na página
  useLayoutEffect(() => {
    const now = Date.now();
    let storedEntry = null;
    let consumedStoredScroll = false;

    try {
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (error) {
      // ignora ambientes sem suporte
    }

    try {
      const stored = sessionStorage.getItem(CARDAPIO_SCROLL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.ts === 'number') {
          if (now - parsed.ts <= CARDAPIO_SCROLL_TTL_MS) {
            storedEntry = {
              ts: parsed.ts,
              productId: typeof parsed.productId === 'string' ? parsed.productId : undefined,
              y: typeof parsed.y === 'number' ? parsed.y : undefined,
            };
            consumedStoredScroll = true;
          } else {
            sessionStorage.removeItem(CARDAPIO_SCROLL_STORAGE_KEY);
          }
        } else {
          sessionStorage.removeItem(CARDAPIO_SCROLL_STORAGE_KEY);
        }
      }
    } catch (error) {
      // ignora erros de parsing/storage
    }

    if (typeof window !== 'undefined' && storedEntry) {
      const maxAttempts = 15;
      const tolerance = 8;
      const headerOffset = 120;
      let lastScrollPos = -1;
      let stableCount = 0;

      const resolveDesired = () => {
        if (storedEntry.productId) {
          const selector = `[data-cardapio-product="${storedEntry.productId}"]`;
          const element = document.querySelector(selector);
          if (element && element.getBoundingClientRect) {
            const rect = element.getBoundingClientRect();
            const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
            const desiredPosition = rect.top + currentScroll - headerOffset;
            return Math.max(0, desiredPosition);
          }
        }
        if (typeof storedEntry.y === 'number') {
          return Math.max(0, storedEntry.y);
        }
        return 0;
      };

      const applyScroll = (attempt) => {
        if (attempt === undefined) attempt = 0;
        
        const desired = resolveDesired();
        
        // Se não encontrou nada e é primeira tentativa, espera DOM
        if (desired === 0 && attempt === 0) {
          window.setTimeout(() => applyScroll(1), 150);
          return;
        }

        const current = window.scrollY || document.documentElement.scrollTop || 0;
        const diff = Math.abs(current - desired);

        // Verifica se a posição estabilizou
        if (Math.abs(current - lastScrollPos) < 2) {
          stableCount++;
        } else {
          stableCount = 0;
        }
        lastScrollPos = current;

        // Para se: chegou no alvo, estabilizou por 2 checks, ou excedeu tentativas
        if (diff <= tolerance || stableCount >= 2 || attempt >= maxAttempts) {
          if (consumedStoredScroll) {
            try {
              sessionStorage.removeItem(CARDAPIO_SCROLL_STORAGE_KEY);
            } catch (error) {
              // ignore
            }
          }
          return;
        }

        // Aplica scroll e reagenda
        window.scrollTo({ top: desired, left: 0, behavior: 'auto' });
        window.setTimeout(() => applyScroll(attempt + 1), 120);
      };

      // Inicia após DOM carregar
      if (document.readyState === 'complete') {
        window.requestAnimationFrame(() => applyScroll(0));
      } else {
        window.addEventListener('load', () => {
          window.requestAnimationFrame(() => applyScroll(0));
        }, { once: true });
      }
    } else {
      // Se não há scroll para restaurar, vai pro topo
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      try {
        if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
      } catch (error) {
        // ignore
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-soleil-cream pt-28 pb-16 px-4 select-none">
      <div className="container-soleil space-y-10">
        <div className="text-center space-y-4">
          <h1 className="title-cursive text-4xl md:text-5xl text-soleil-dark">
            Cardápio Completo
          </h1>
          <p className="text-soleil-medium max-w-2xl mx-auto">
            Explore todos os docinhos disponíveis e escolha sua próxima encomenda favorita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="btn-soleil btn-soleil-secondary px-8 py-3 text-lg shadow-lg hover:shadow-[0_18px_42px_rgba(194,95,38,0.28)] transition"
            >
              Voltar ao início
            </Link>
          </div>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {catalog.map((product, index) => {
            const cover = product.images[0];
            const handleCardClick = () => {
              if (typeof window !== 'undefined') {
                try {
                  sessionStorage.setItem(
                    CARDAPIO_SCROLL_STORAGE_KEY,
                    JSON.stringify({ y: window.scrollY, ts: Date.now(), productId: product.id })
                  );
                } catch (error) {
                  // ignore storage errors
                }
              }
              navigate(`/produto/${product.id}`);
            };
            return (
              <Card
                key={product.id}
                onClick={handleCardClick}
                data-cardapio-product={product.id}
                className="product-card flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="product-image-placeholder h-40 md:h-48 overflow-hidden">
                  {cover ? (
                    <img src={cover} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <Cookie className="w-16 h-16 text-soleil-accent opacity-40" />
                      <p className="text-sm text-soleil-medium mt-2">Foto do produto</p>
                    </>
                  )}
                </div>
                <CardContent className="p-5 md:p-6 border-t border-soleil-beige/60 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-bold text-soleil-dark">{product.name}</h3>
                    <p className="text-soleil-medium leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex items-baseline justify-between pt-4">
                    <span className="text-xl font-bold text-soleil-cta">
                      {product.price ? `R$ ${product.price}` : 'Sob consulta'}
                    </span>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        window.open(
                          buildWhatsAppLink({ id: product.id, name: product.name, price: product.price }),
                          '_blank'
                        );
                      }}
                      variant="soleilPrimary"
                      className="px-3 py-1 text-xs"
                    >
                      Pedir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cardapio;
