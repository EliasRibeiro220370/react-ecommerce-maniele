import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import ProductDetailsView from './components/ProductDetailsView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import { PRODUCTS } from './data/products';
import { ActiveTab, CartItem, Product } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialCategory, setInitialCategory] = useState<'all' | 'feminino' | 'masculino' | 'acessorios'>('all');
  
  // Local storage cart initial state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('maniele_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Local storage dark/light mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('maniele_theme');
      return savedTheme === 'dark';
    } catch {
      return false;
    }
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('maniele_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('maniele_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProduct]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if product with identical size is already present
      const existingItemIdx = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize
      );

      if (existingItemIdx > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIdx].quantity += newItem.quantity;
        return updatedCart;
      }

      return [...prevCart, newItem];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) {
      handleRemoveItem(index);
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQty;
      return updatedCart;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Navigation callbacks
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('detalhes');
  };

  const handleShopCategory = (category: 'all' | 'feminino' | 'masculino' | 'acessorios') => {
    setInitialCategory(category);
    setActiveTab('produtos');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      id="app-root-container"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-neutral-200 dark:selection:bg-neutral-800 ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Header element */}
      <Header
        activeTab={activeTab === 'detalhes' ? 'produtos' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }}
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main id="main-content-area" className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            isDarkMode={isDarkMode}
            products={PRODUCTS}
            onProductClick={handleProductClick}
            onShopCategory={handleShopCategory}
          />
        )}

        {activeTab === 'produtos' && (
          <div key={initialCategory} className="w-full">
            <ProductsView
              isDarkMode={isDarkMode}
              products={PRODUCTS}
              initialCategory={initialCategory}
              onProductClick={handleProductClick}
            />
          </div>
        )}

        {activeTab === 'detalhes' && selectedProduct && (
          <ProductDetailsView
            isDarkMode={isDarkMode}
            product={selectedProduct}
            onBackToShop={() => setActiveTab('produtos')}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'carrinho' && (
          <CartView
            isDarkMode={isDarkMode}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onGoToShop={() => handleShopCategory('all')}
            onGoToCheckout={() => setActiveTab('checkout')}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutView
            isDarkMode={isDarkMode}
            cart={cart}
            onBackToCart={() => setActiveTab('carrinho')}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* Footer element */}
      <Footer
        isDarkMode={isDarkMode}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
