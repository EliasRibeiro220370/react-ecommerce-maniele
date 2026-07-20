import { ArrowRight, Scissors, Shield, Compass } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
// @ts-ignore
import maioNoirBeach from '../assets/images/maio_noir_beach_1784470225983.jpg';
// @ts-ignore
import sungaClassicOnyxFront from '../assets/images/sunga_classic_onyx_front_1784472607959.jpg';

interface HomeViewProps {
  isDarkMode: boolean;
  products: Product[];
  onProductClick: (product: Product) => void;
  onShopCategory: (category: 'all' | 'feminino' | 'masculino' | 'acessorios') => void;
}

export default function HomeView({
  isDarkMode,
  products,
  onProductClick,
  onShopCategory,
}: HomeViewProps) {
  const bestSellers = products.filter((p) => p.isBestSeller);

  const categories = [
    {
      id: 'feminino',
      title: 'Feminino',
      subtitle: 'Maiôs, biquínis e saídas fluídas',
      image: maioNoirBeach,
    },
    {
      id: 'masculino',
      title: 'Masculino',
      subtitle: 'Bermudas alfaiataria e sungas classic',
      image: sungaClassicOnyxFront,
    },
    {
      id: 'acessorios',
      title: 'Acessórios',
      subtitle: 'Óculos polarizados e chapéus premium',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    },
  ] as const;

  return (
    <div id="home-view" className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section id="hero-section" className="relative h-[85vh] flex items-start pt-12 sm:items-center sm:pt-0 overflow-hidden">
        {/* Background Image with grayscale & zoom transition */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920"
            alt="Beach background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-110 opacity-40"
          />
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-gradient-to-t from-black via-black/40 to-transparent'
                : 'bg-gradient-to-t from-white via-white/40 to-transparent'
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full md:pt-16">
          <div className="max-w-2xl space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-xs sm:text-sm tracking-[0.4em] uppercase font-light ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Coleção Verão • Maricá - RJ
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-3xl sm:text-5xl font-light tracking-[0.15em] leading-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              ESTÉTICA<br />MINIMALISTA<br />À BEIRA-MAR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-sm sm:text-base font-light tracking-wide leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              Moda praia premium concebida com cortes rigorosos de alfaiataria e tecidos sustentáveis. Sem artifícios. Apenas a pureza do preto, do branco e dos tons de cinza.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <button
                id="hero-shop-button"
                onClick={() => onShopCategory('all')}
                className={`group flex items-center space-x-3 px-8 py-4 border text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 ${
                  isDarkMode
                    ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                    : 'border-black bg-black text-white hover:bg-white hover:text-black'
                }`}
              >
                <span>Explorar Coleção</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className={`text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Categorias
          </h2>
          <div className="w-16 h-[1px] bg-neutral-400 mx-auto" />
          <p className={`text-xs sm:text-sm font-light tracking-wider uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Selecione uma linha dedicada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => onShopCategory(cat.id)}
              className="group cursor-pointer relative overflow-hidden h-[450px]"
            >
              {/* Product Category BG */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Category Info Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10 flex flex-col justify-end h-1/2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-75 mb-1">{cat.subtitle}</p>
                <h3 className="text-xl font-light tracking-widest uppercase mb-4">{cat.title}</h3>
                <div className="flex items-center space-x-2 text-xs tracking-widest uppercase font-normal overflow-hidden w-fit">
                  <span className="translate-y-0 group-hover:translate-x-1 transition-all duration-300">Ver Produtos</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className={`text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Destaques da Temporada
          </h2>
          <div className="w-16 h-[1px] bg-neutral-400 mx-auto" />
          <p className={`text-xs sm:text-sm font-light tracking-wider uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Os mais desejados, em modelagem esculpida
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Product Image Holder */}
              <div className={`aspect-[3/4] overflow-hidden relative border ${
                isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
              }`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Sale/Promo or Best Seller Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 font-light border ${
                    isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-black border-black'
                  }`}>
                    Best Seller
                  </span>
                </div>

                {/* Quick details reveal on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <div className={`w-full py-3 text-center text-xs tracking-[0.2em] uppercase border font-light ${
                    isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                  }`}>
                    Ver Detalhes
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-4 flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className={`text-sm tracking-widest uppercase font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-xs font-light capitalize ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Moda {product.category}
                  </p>
                </div>
                <p className={`text-sm tracking-wider font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Manifesto */}
      <section
        id="manifesto-section"
        className={`border-y py-20 transition-colors duration-300 ${
          isDarkMode ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-100'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <Compass className={`w-10 h-10 mx-auto stroke-[1px] ${isDarkMode ? 'text-white' : 'text-black'}`} />
          
          <h2 className={`text-xl sm:text-2xl font-light tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
            A ESTÉTICA MANIELE
          </h2>
          
          <p className={`text-sm sm:text-base font-light tracking-wide leading-relaxed ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            "Acreditamos que o luxo mora na ausência de excessos. Nosso design é guiado pela pureza estrutural, com foco absoluto na sofisticação da modelagem de alta costura adaptada ao clima praiano brasileiro. Eliminamos estampas vibrantes para realçar a forma natural, as texturas delicadas e a precisão do caimento. Na Maniele, cada biquíni, maiô ou chemise é um elemento eterno."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
            <div className="space-y-2">
              <Scissors className="w-5 h-5 mx-auto opacity-70" />
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium">Design Puro</h4>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Linhas geométricas e sofisticação contida.</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-5 h-5 mx-auto opacity-70" />
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium">Fios Tecnológicos</h4>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Materiais biodegradáveis e proteção UV50+.</p>
            </div>
            <div className="space-y-2">
              <Compass className="w-5 h-5 mx-auto opacity-70" />
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium">Feito no Brasil</h4>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Confecção consciente e corte artesanal de luxo.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
