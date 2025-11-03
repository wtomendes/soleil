import React, { useState } from 'react';
import heroHighlight from '../assets/highlight.jpg';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Instagram, Cookie, Heart } from 'lucide-react';
import { products } from '../data/mock';
import { buildWhatsAppLink, contactInfo } from '../config/contact';
import { CARDAPIO_SCROLL_STORAGE_KEY } from '../constants/storage';

const Home = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleWhatsAppClick = (product) => {
    // product pode ser undefined (botão geral da home)
    window.open(buildWhatsAppLink(product), '_blank');
  };

  return (
    <div className="min-h-screen bg-soleil-cream">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-soleil-header shadow-lg">
        <div className="container-soleil">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-3 md:py-4">
            {/* Logo à esquerda */}
            <div className="flex w-full md:w-auto items-center justify-center md:justify-start gap-3 md:h-16">
              <img 
                src="https://customer-assets.emergentagent.com/job_sweet-sunshine/artifacts/ys2n0piw_image.png" 
                alt="Soleil Doces Logo" 
                className="h-16 w-16 object-contain transition-transform duration-300 hover:scale-110"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-soleil-light">Soleil Doces</h1>
                <p className="text-sm text-soleil-beige">Sabor irresistível!</p>
              </div>
            </div>

            {/* Navegação */}
            <nav className="flex w-full md:flex-1 items-center justify-center md:justify-center gap-4 md:gap-8 text-sm md:text-base md:self-center">
              <a href="#inicio" className="nav-link-header">Início</a>
              <a href="#cardapio" className="nav-link-header">Cardápio</a>
              <a href="#encomendas" className="nav-link-header">Encomendas</a>
              <a href="#contato" className="nav-link-header">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 md:pt-36 pb-20 px-4">
        <div className="container-soleil">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <h1 className="title-cursive text-5xl md:text-6xl lg:text-7xl text-soleil-dark">
                Bem-vindos à<br />
                <span className="text-soleil-cta">Soleil Doces</span>
              </h1>
              <p className="text-lg md:text-xl text-soleil-medium leading-relaxed">
                A Soleil Doces nasceu do amor por adoçar momentos em família.
                Trabalhamos com pronta entrega e encomendas sob medida para cada ocasião.
              </p>
              <Button
                onClick={() => handleWhatsAppClick()}
                className="btn-primary group w-full md:w-auto"
                size="lg"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Faça sua Encomenda
              </Button>
            </div>
            <div className="relative fade-in-delay">
              <div className="hero-image-container overflow-hidden">
                {heroImageLoaded ? (
                  <img
                    src={heroHighlight}
                    alt="Imagem em destaque"
                    className="hero-image-media"
                    onError={() => setHeroImageLoaded(false)}
                  />
                ) : (
                  <>
                    <img
                      src={heroHighlight}
                      alt="Imagem em destaque"
                      className="hidden"
                      onLoad={() => setHeroImageLoaded(true)}
                      onError={() => setHeroImageLoaded(false)}
                    />
                    <div className="hero-image-placeholder">
                      <Cookie className="w-24 h-24 text-soleil-accent opacity-50" />
                      <p className="text-soleil-medium mt-4">Imagem em destaque</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardápio Section */}
      <section id="cardapio" className="py-20 px-4 bg-soleil-light/30">
        <div className="container-soleil">
          <div className="text-center mb-12 fade-in">
            <h2 className="title-cursive text-4xl md:text-5xl text-soleil-dark mb-4">
              Nosso Cardápio
            </h2>
            <div className="flex justify-center gap-2 items-center text-soleil-accent">
              <Cookie className="w-6 h-6" />
              <Heart className="w-5 h-5" />
              <Cookie className="w-6 h-6" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 select-none">
            {products.map((product, index) => {
              const productImage = product.image;
              return (
                <Card
                  key={product.id}
                  onClick={() => navigate(`/produto/${product.id}`)}
                  className="product-card fade-in-up transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="product-image-placeholder h-40 md:h-48 overflow-hidden">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
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
                          handleWhatsAppClick({ id: product.id, name: product.name, price: product.price });
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
          <div className="mt-12 flex justify-center">
            <Link
              to="/cardapio"
              onClick={() => {
                try {
                  sessionStorage.removeItem(CARDAPIO_SCROLL_STORAGE_KEY);
                  // Force scroll to top immediately
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
                } catch (error) {
                  // ignore storage indisponível
                }
              }}
              className="btn-soleil btn-soleil-primary px-10 py-4 text-xl shadow-lg hover:shadow-[0_18px_42px_rgba(63,34,17,0.28)] transition"
            >
              Conheça o cardápio completo
            </Link>
          </div>
        </div>
      </section>

      {/* Encomendas Section */}
      <section id="encomendas" className="py-20 px-4 bg-gradient-to-br from-soleil-brown to-soleil-dark text-soleil-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-soleil-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-soleil-beige/10 rounded-full blur-3xl"></div>
        
        <div className="container-soleil text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-8 fade-in">
            <h2 className="title-cursive text-4xl md:text-5xl">
              Faça sua Encomenda
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Quer fazer seu pedido?
              <br />
              Aceitamos encomendas via WhatsApp ou Instagram.
              <br />
              É só chamar e combinar seu doce favorito!
            </p>
            <Button 
              onClick={() => handleWhatsAppClick()}
              className="btn-cta group"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Fazer Encomenda
            </Button>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 px-4">
        <div className="container-soleil text-center">
          <h2 className="title-cursive text-4xl md:text-5xl text-soleil-dark mb-12 fade-in">
            Entre em Contato
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a 
              href={buildWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-btn group"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>{contactInfo.whatsappDisplay}</span>
            </a>
            <a 
              href={contactInfo.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-btn group"
            >
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>{contactInfo.instagramHandle}</span>
            </a>
          </div>
          <p className="title-cursive text-3xl md:text-4xl text-soleil-cta fade-in-delay">
            Carinho em cada mordida
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-soleil-dark text-soleil-light py-8 px-4">
        <div className="container-soleil text-center">
          <p className="text-sm">
            © 2025 Soleil Doces - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;