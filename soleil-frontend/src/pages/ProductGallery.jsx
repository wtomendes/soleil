import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Cookie } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { getProductById } from '../data/catalog';
import { buildWhatsAppLink } from '../config/contact';
import { getProductDetails } from '../data/productDetails';
import { CARDAPIO_SCROLL_STORAGE_KEY } from '../constants/storage';

const ProductGallery = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : undefined;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-soleil-cream pt-28 pb-16 px-4">
        <div className="container-soleil text-center space-y-6">
          <h1 className="title-cursive text-4xl text-soleil-dark">Produto não encontrado</h1>
          <p className="text-soleil-medium">
            Que tal voltar e escolher outra delícia do nosso cardápio?
          </p>
          <Link
            to="/cardapio"
            className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 shadow hover:bg-soleil-cta-dark transition"
          >
            Ver cardápio completo
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images;
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  const details = getProductDetails(product.id);

  const goNext = () => {
    if (!hasMultipleImages) return;
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  const goPrev = () => {
    if (!hasMultipleImages) return;
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-soleil-cream pt-28 pb-16 px-4">
      <div className="container-soleil space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-soleil-medium hover:text-soleil-dark transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>
        </div>

        <div className="space-y-4">
          <h1 className="title-cursive text-4xl md:text-5xl text-soleil-dark">{product.name}</h1>
          <p className="text-soleil-medium max-w-3xl">{product.description}</p>
          {product.price && (
            <span className="inline-flex items-center rounded-full bg-soleil-light/80 px-4 py-2 text-soleil-dark font-semibold">
              R$ {product.price}
            </span>
          )}
          {details && (
            <div className="bg-white/80 border border-soleil-beige/60 rounded-2xl px-5 py-4 shadow-sm max-w-xl">
              <h2 className="font-soleil text-2xl text-soleil-brown mb-3">{details.title}</h2>
              <ul className="space-y-2 text-soleil-medium">
                {details.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-soleil-cta" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    <div className="relative rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)] overflow-visible px-2 pt-4 pb-8 md:px-6 md:pt-6 md:pb-10">
          <div className="flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-white">
            {hasImages ? (
              <img
                src={images[currentIndex]}
                alt={`${product.name} ${currentIndex + 1}`}
                className="max-h-[500px] w-full max-w-full md:w-auto object-contain"
              />
            ) : (
              <div className="product-image-placeholder min-h-[300px] md:min-h-[380px] flex-col">
                <Cookie className="w-16 h-16 text-soleil-accent opacity-40" />
                <p className="text-soleil-medium mt-2">Fotos em breve</p>
              </div>
            )}
          </div>

          <Button
            onClick={() =>
              window.open(
                buildWhatsAppLink({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  detailsTitle: details?.title,
                  detailsItems: details?.items,
                }),
                '_blank'
              )
            }
            variant="soleilPrimary"
            className="absolute bottom-0 right-6 translate-y-1/2 px-5 py-2 text-sm shadow-[0_14px_32px_rgba(63,34,17,0.22)]"
          >
            Pedir
          </Button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-soleil-dark p-2 shadow hover:bg-white"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-soleil-dark p-2 shadow hover:bg-white"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {hasImages && (
          <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                  currentIndex === index
                    ? 'border-soleil-cta ring-2 ring-soleil-cta/60'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            to="/cardapio"
            className="btn-soleil btn-soleil-secondary"
          >
            Ver cardápio completo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
