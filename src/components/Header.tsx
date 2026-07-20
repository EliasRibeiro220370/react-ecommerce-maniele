import { useState } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  isDarkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'produtos', label: 'Coleção' },
    { id: 'carrinho', label: 'Sacola' },
  ] as const;

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
        isDarkMode
          ? 'bg-black/95 border-neutral-900 text-white'
          : 'bg-white/95 border-neutral-200 text-black'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <button
              id="logo-button"
              onClick={() => handleNavClick('home')}
              className="text-sm sm:text-3xl font-light tracking-[0.2em] sm:tracking-[0.3em] font-sans hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              M A N I E L E
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative py-2 ${
                  activeTab === item.id
                    ? 'opacity-100 font-normal'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-[1px] ${
                      isDarkMode ? 'bg-white' : 'bg-black'
                    }`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
              }`}
              aria-label="Alternar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="cart-nav-button"
              onClick={() => handleNavClick('carrinho')}
              className={`p-2 rounded-full relative transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-medium flex items-center justify-center tracking-tight border ${
                    isDarkMode
                      ? 'bg-white text-black border-black'
                      : 'bg-black text-white border-white'
                  }`}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              isDarkMode ? 'bg-black border-neutral-900' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm tracking-[0.25em] uppercase py-3 border-b ${
                    isDarkMode ? 'border-neutral-900' : 'border-neutral-100'
                  } ${activeTab === item.id ? 'opacity-100 font-normal' : 'opacity-50'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
