import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { catalog } from '../data/catalog';
import { buildWhatsAppLink } from '../config/contact';

const Cardapio = () => {
  const navigate = useNavigate();

  // Sempre começar do topo ao entrar no Cardápio
  // e não restaurar a rolagem ao voltar do detalhe
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        // desativa restauração automática do navegador nesta página
        window.history.scrollRestoration = 'manual';
      }
    } catch (e) {
      // ignore
    }

    // garante topo ao montar
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    // restaura comportamento padrão ao sair
    return () => {
      try {
        if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-soleil-cream pt-28 pb-16 px-4">
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
            return (
              <Card
                key={product.id}
                onClick={() => navigate(`/produto/${product.id}`)}
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
