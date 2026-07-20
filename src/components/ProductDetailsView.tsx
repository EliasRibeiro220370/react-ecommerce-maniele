import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product, CartItem } from '../types';
import { motion } from 'motion/react';

interface ProductDetailsViewProps {
  isDarkMode: boolean;
  product: Product;
  onBackToShop: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function ProductDetailsView({
  isDarkMode,
  product,
  onBackToShop,
  onAddToCart,
}: ProductDetailsViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.length === 1 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  // Update selected image when product changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes.length === 1 ? product.sizes[0] : '');
    setQuantity(1);
    setErrorMsg('');
    setSuccessAnimation(false);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Por favor, selecione um tamanho antes de prosseguir.');
      return;
    }
    setErrorMsg('');
    
    onAddToCart({
      product,
      quantity,
      selectedSize,
    });

    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 2500);
  };

  return (
    <div id="product-details-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back link button */}
      <button
        id="details-back-button"
        onClick={onBackToShop}
        className={`group flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-light mb-12 ${
          isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
        }`}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
        <span>Voltar para a Coleção</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        {/* Images Column */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          
          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  id={`img-thumb-${idx}`}
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 md:w-20 md:h-24 overflow-hidden border ${
                    selectedImage === img
                      ? isDarkMode ? 'border-white' : 'border-black'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  } transition-all duration-300 bg-neutral-100 dark:bg-neutral-900`}
                >
                  <img
                    src={img}
                    alt={`${product.name} Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Image Display */}
          <div className={`flex-1 aspect-[3/4] overflow-hidden relative border ${
            isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
          }`}>
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-115"
            />
          </div>

        </div>

        {/* Product Information Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
          
          <div className="space-y-6">
            
            {/* Category and Title */}
            <div className="space-y-2">
              <p className={`text-xs tracking-[0.25em] uppercase font-light ${
                isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Moda {product.category}
              </p>
              <h1 className={`text-2xl sm:text-3xl font-light tracking-widest uppercase ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {product.name}
              </h1>
            </div>

            {/* Price tag */}
            <div className="border-b pb-4 border-neutral-200 dark:border-neutral-900">
              <span className={`text-xl tracking-wider font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            {/* Description */}
            <p className={`text-xs sm:text-sm font-light leading-relaxed tracking-wide ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              {product.description}
            </p>

            {/* Specifications features bulletpoints */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[11px] tracking-[0.15em] uppercase font-medium">Especificações Premium</h4>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {product.features.map((feat, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Size & Cart controls */}
          <div className="space-y-6">
            
            {/* Size Trigger Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs tracking-wider uppercase font-light">
                <span>Selecionar Tamanho</span>
                {selectedSize && (
                  <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>
                    Selecionado: {selectedSize}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    id={`size-selector-${size}`}
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMsg('');
                    }}
                    className={`min-w-12 h-12 flex items-center justify-center text-xs tracking-widest uppercase font-light border transition-all duration-300 ${
                      selectedSize === size
                        ? isDarkMode
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white border-black'
                        : isDarkMode
                        ? 'border-neutral-800 hover:border-neutral-500 text-white hover:bg-neutral-950'
                        : 'border-neutral-200 hover:border-neutral-500 text-black hover:bg-neutral-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Error Warning */}
              {errorMsg && (
                <p id="size-error-message" className="text-xs text-neutral-500 font-light tracking-wide pt-1 animate-pulse">
                  * {errorMsg}
                </p>
              )}
            </div>

            {/* Quantidade Selector & Cart Button */}
            <div className="flex items-center space-x-4">
              
              {/* Quantity selectors */}
              <div className={`flex items-center border h-14 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <button
                  id="qty-decrement"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full flex items-center justify-center hover:opacity-75"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-4.5 h-4.5" />
                </button>
                <span className="w-10 text-center text-xs tracking-widest font-light">{quantity}</span>
                <button
                  id="qty-increment"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full flex items-center justify-center hover:opacity-75"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={successAnimation}
                className={`flex-1 h-14 flex items-center justify-center space-x-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light border ${
                  successAnimation
                    ? 'bg-neutral-200 dark:bg-neutral-800 border-transparent text-neutral-500 cursor-not-allowed'
                    : isDarkMode
                    ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                    : 'border-black bg-black text-white hover:bg-white hover:text-black'
                }`}
              >
                {successAnimation ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce text-neutral-600" />
                    <span>Adicionado à Sacola</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>

            </div>

            {/* Eco disclosure */}
            <p className="text-[10px] text-center font-light tracking-wider text-neutral-400">
              📦 FRETE EXPRESSO E CÁLCULO DE EMBALAGEM EXCLUSIVA NO PRÓXIMO PASSO VIA WHATSAPP.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
