import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsViewProps {
  isDarkMode: boolean;
  products: Product[];
  initialCategory: 'all' | 'feminino' | 'masculino' | 'acessorios';
  onProductClick: (product: Product) => void;
}

export default function ProductsView({
  isDarkMode,
  products,
  initialCategory,
  onProductClick,
}: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const categoriesList = [
    { id: 'all', label: 'Todos os Itens' },
    { id: 'feminino', label: 'Linha Feminina' },
    { id: 'masculino', label: 'Linha Masculina' },
    { id: 'acessorios', label: 'Acessórios' },
  ];

  // Filtering & Sorting Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div id="products-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title & Introduction */}
      <div className="space-y-4">
        <h1 className={`text-3xl sm:text-4xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
          COLEÇÃO MODA PRAIA
        </h1>
        <p className={`text-sm font-light tracking-wide max-w-2xl leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Explore cortes geométricos de alta costura e tecidos inovadores de alta performance. Desenvolvido no Rio de Janeiro com tecidos biodegradáveis e acabamento impecável.
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between border-y py-6 border-neutral-200 dark:border-neutral-900">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              id={`category-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? isDarkMode
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-black'
                  : isDarkMode
                  ? 'border-neutral-800 hover:border-neutral-500 text-neutral-300'
                  : 'border-neutral-200 hover:border-neutral-500 text-neutral-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              id="search-input"
              type="text"
              placeholder="Buscar por biquíni, maiô..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs tracking-wider border rounded-none transition-colors duration-200 focus:outline-none ${
                isDarkMode
                  ? 'bg-black border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600'
                  : 'bg-white border-neutral-200 focus:border-black text-black placeholder-neutral-400'
              }`}
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          </div>

          {/* Sort Menu */}
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`w-full sm:w-48 pl-10 pr-4 py-2.5 text-xs tracking-wider border rounded-none appearance-none focus:outline-none transition-colors duration-200 ${
                isDarkMode
                  ? 'bg-black border-neutral-800 focus:border-neutral-400 text-white'
                  : 'bg-white border-neutral-200 focus:border-black text-black'
              }`}
            >
              <option value="default">Ordenação Padrão</option>
              <option value="price-asc">Preço: Menor para Maior</option>
              <option value="price-desc">Preço: Maior para Menor</option>
              <option value="name-asc">Ordem Alfabética</option>
            </select>
            <ArrowUpDown className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Product Count Grid Indicator */}
      <div className="flex justify-between items-center text-xs tracking-wider uppercase font-light text-neutral-500">
        <span>Mostrando {filteredAndSortedProducts.length} de {products.length} produtos</span>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="popLayout">
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredAndSortedProducts.map((product) => (
              <motion.div
                id={`product-card-${product.id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Frame */}
                <div className={`aspect-[3/4] overflow-hidden relative border ${
                  isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Hover visual frame */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className={`w-full py-3 text-center text-[10px] tracking-[0.25em] uppercase border font-light ${
                      isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                    }`}>
                      Visualizar Peça
                    </div>
                  </div>
                </div>

                {/* Details Container */}
                <div className="pt-4 flex justify-between items-start space-x-2">
                  <div className="space-y-1">
                    <h3 className={`text-xs sm:text-sm tracking-widest uppercase font-light transition-opacity group-hover:opacity-75 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      {product.name}
                    </h3>
                    <p className={`text-[10px] font-light uppercase tracking-wider ${
                      isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      Moda {product.category}
                    </p>
                  </div>
                  <span className={`text-xs sm:text-sm tracking-wider font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 space-y-4 border border-dashed border-neutral-200 dark:border-neutral-800"
          >
            <p className={`text-sm font-light tracking-widest uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Nenhum produto correspondente aos filtros foi encontrado.
            </p>
            <button
              id="clear-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('default');
              }}
              className={`px-6 py-2.5 text-xs tracking-widest uppercase font-light border ${
                isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'
              } transition-colors`}
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
