import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  isDarkMode: boolean;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onGoToShop: () => void;
  onGoToCheckout: () => void;
}

export default function CartView({
  isDarkMode,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onGoToShop,
  onGoToCheckout,
}: CartViewProps) {
  
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div id="cart-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-4 mb-12">
        <h1 className={`text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Sua Sacola
        </h1>
        <div className="w-16 h-[1px] bg-neutral-400" />
      </div>

      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-6"
          >
            <div className="flex justify-center">
              <ShoppingBag className="w-12 h-12 text-neutral-300 stroke-[1px]" />
            </div>
            <div className="space-y-2">
              <p className={`text-sm tracking-widest uppercase font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Sua sacola está vazia no momento.
              </p>
              <p className="text-xs font-light text-neutral-400">
                Adicione peças exclusivas de nossa coleção.
              </p>
            </div>
            <button
              id="empty-cart-back-shop"
              onClick={onGoToShop}
              className={`px-8 py-3 text-xs tracking-[0.2em] uppercase font-light border ${
                isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'
              } transition-colors duration-300`}
            >
              Explorar Coleção
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item, index) => (
                <div
                  id={`cart-item-${index}`}
                  key={`${item.product.id}-${item.selectedSize}`}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b gap-4 ${
                    isDarkMode ? 'border-neutral-900' : 'border-neutral-100'
                  }`}
                >
                  
                  {/* Photo & Specs */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-20 h-24 shrink-0 overflow-hidden border ${
                      isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
                    }`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-115"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className={`text-sm tracking-widest uppercase font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {item.product.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs font-light tracking-wide text-neutral-400">
                        <span className="uppercase">Tamanho: {item.selectedSize}</span>
                        <span>•</span>
                        <span>Unidade: {item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions wrapper */}
                  <div className="flex items-center justify-between sm:justify-end space-x-8">
                    
                    {/* Quantity selectors */}
                    <div className={`flex items-center border h-10 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                      <button
                        id={`cart-qty-dec-${index}`}
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-3 h-full flex items-center justify-center hover:opacity-75"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-light">{item.quantity}</span>
                      <button
                        id={`cart-qty-inc-${index}`}
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-3 h-full flex items-center justify-center hover:opacity-75"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal & trash */}
                    <div className="flex items-center space-x-6">
                      <span className={`text-xs sm:text-sm tracking-wider font-light w-20 text-right ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      
                      <button
                        id={`cart-remove-btn-${index}`}
                        onClick={() => onRemoveItem(index)}
                        className={`p-2 rounded-full transition-colors ${
                          isDarkMode ? 'hover:bg-neutral-900 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-500 hover:text-black'
                        }`}
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
              
              <button
                id="cart-continue-shopping"
                onClick={onGoToShop}
                className="text-xs tracking-[0.15em] uppercase font-light text-neutral-400 hover:text-black dark:hover:text-white underline underline-offset-4 transition-colors"
              >
                + Adicionar mais peças à sacola
              </button>
            </div>

            {/* Checkout Invoice Summary Column */}
            <div className="lg:col-span-4">
              <div className={`p-8 border space-y-6 ${
                isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
              }`}>
                <h3 className="text-xs uppercase font-medium tracking-[0.2em] border-b pb-4 border-neutral-200 dark:border-neutral-800">
                  Resumo do Pedido
                </h3>

                <div className="space-y-4 text-xs font-light tracking-wide">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Subtotal</span>
                    <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Envio (Frete)</span>
                    <span className="text-neutral-400 lowercase">Calcular no WhatsApp</span>
                  </div>
                  <div className="flex justify-between border-t pt-4 font-normal text-sm tracking-widest uppercase">
                    <span>Total Estimado</span>
                    <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-button"
                  onClick={onGoToCheckout}
                  className={`w-full h-14 flex items-center justify-center space-x-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light border ${
                    isDarkMode
                      ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                      : 'border-black bg-black text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-center text-neutral-400 leading-relaxed font-light">
                  A confirmação será efetuada via WhatsApp com as opções de pagamento PIX ou Cartão.
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
