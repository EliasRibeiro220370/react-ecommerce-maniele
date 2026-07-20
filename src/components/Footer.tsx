import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  setActiveTab: (tab: 'home' | 'produtos' | 'carrinho') => void;
}

export default function Footer({ isDarkMode, setActiveTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t transition-colors duration-300 py-16 ${
        isDarkMode
          ? 'bg-black text-white border-neutral-900'
          : 'bg-neutral-50 text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="text-lg font-light tracking-[0.3em]">MANIELE</h3>
            <p className={`text-xs font-light tracking-wide leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Uma ode ao minimalismo à beira-mar. Desenvolvemos peças atemporais de alfaiataria praia, aliando cortes precisos a uma paleta sóbria e tecidos de alta tecnologia.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                id="social-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={`transition-opacity ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-600'} opacity-70 hover:opacity-100`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                id="social-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={`transition-opacity ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-600'} opacity-70 hover:opacity-100`}
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-medium tracking-[0.2em] border-b pb-2 border-neutral-200 dark:border-neutral-800">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-light tracking-wide">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => setActiveTab('home')}
                  className={`opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-produtos"
                  onClick={() => setActiveTab('produtos')}
                  className={`opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Coleção Moda Praia
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-carrinho"
                  onClick={() => setActiveTab('carrinho')}
                  className={`opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Sacola de Compras
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-medium tracking-[0.2em] border-b pb-2 border-neutral-200 dark:border-neutral-800">
              Contato
            </h4>
            <ul className={`space-y-3 text-xs font-light tracking-wide ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>+55 (21) 96897-6671</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>contato@inovacaodigital.tec.br</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Rio de Janeiro - RJ, Brasil</span>
              </li>
            </ul>
          </div>

          {/* Policies & Info Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-medium tracking-[0.2em] border-b pb-2 border-neutral-200 dark:border-neutral-800">
              Informações
            </h4>
            <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Todos os pedidos confirmados em nosso site são gerados em formato digital e encaminhados diretamente ao nosso WhatsApp de atendimento comercial para a finalização imediata e cálculo de envio.
            </p>
            <p className="text-[10px] tracking-wide text-neutral-400">
              Atendimento: Seg a Sex, 09h às 18h
            </p>
          </div>

        </div>

        <div className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light tracking-wider ${
          isDarkMode ? 'border-neutral-900 text-neutral-500' : 'border-neutral-200 text-neutral-400'
        }`}>
          <div>
            © {new Date().getFullYear()} Elias Ribeiro. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <span>Made in Rio de Janeiro</span>
            <button
              id="footer-scroll-top"
              onClick={scrollToTop}
              className={`p-2 rounded-full border ${
                isDarkMode ? 'border-neutral-800 hover:bg-neutral-950 text-white' : 'border-neutral-200 hover:bg-white text-black'
              } transition-colors duration-200`}
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
