import { useState, ChangeEvent, FormEvent } from 'react';
import { ShoppingBag, ArrowLeft, Send, CheckCircle2, MessageSquare, Landmark, CreditCard, Search } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  isDarkMode: boolean;
  cart: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
}

export default function CheckoutView({
  isDarkMode,
  cart,
  onBackToCart,
  onClearCart,
}: CheckoutViewProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: '',
    phone: '',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'pix',
  });

  const [isSearchingCep, setIsSearchingCep] = useState<boolean>(false);
  const [cepError, setCepError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [whatsappLink, setWhatsappLink] = useState<string>('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // CEP ViaCEP API lookup
  const handleCepLookup = async () => {
    const cleanCep = formData.zipCode.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError('CEP inválido. Deve conter 8 dígitos.');
      return;
    }

    setIsSearchingCep(true);
    setCepError('');

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
      } else {
        setFormData((prev) => ({
          ...prev,
          address: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
        }));
      }
    } catch (err) {
      setCepError('Erro ao buscar o CEP. Digite os campos manualmente.');
    } finally {
      setIsSearchingCep(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Generate neat, readable WhatsApp message structure
    const phoneTarget = '5521968976671'; // WhatsApp number provided in prompt
    
    let orderListText = '';
    cart.forEach((item) => {
      orderListText += `• *${item.product.name}* (Tamanho: ${item.selectedSize}) - Qtd: ${item.quantity} - R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    const paymentText = formData.paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito';
    const complementText = formData.complement ? `\n• *Comp:* ${formData.complement}` : '';

    const msg = `Olá! Gostaria de finalizar meu pedido com *Elias Ribeiro*:\n\n` +
      `*PRODUTOS:*\n${orderListText}\n` +
      `*RESUMO FINANCEIRO:*\n` +
      `• *Subtotal:* R$ ${subtotal.toFixed(2)}\n` +
      `• *Envio:* A combinar (Frete)\n` +
      `• *Total Estimado:* R$ ${subtotal.toFixed(2)}\n\n` +
      `*DADOS DE ENVIO:*\n` +
      `• *Cliente:* ${formData.fullName}\n` +
      `• *WhatsApp:* ${formData.phone}\n` +
      `• *CEP:* ${formData.zipCode}\n` +
      `• *Rua:* ${formData.address}, Nº ${formData.number}${complementText}\n` +
      `• *Bairro:* ${formData.neighborhood}\n` +
      `• *Cidade/UF:* ${formData.city} - ${formData.state}\n\n` +
      `*MÉTODO DE PAGAMENTO:* ${paymentText}\n\n` +
      `Fico no aguardo para combinarmos o frete e fecharmos o pagamento! Obrigado.`;

    const encodedMsg = encodeURIComponent(msg);
    const apiLink = `https://api.whatsapp.com/send?phone=${phoneTarget}&text=${encodedMsg}`;

    setGeneratedMessage(msg);
    setWhatsappLink(apiLink);
    setIsSubmitted(true);

    // Open WhatsApp in a new window immediately
    window.open(apiLink, '_blank', 'noopener,noreferrer');
  };

  const handleFinishReset = () => {
    onClearCart();
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div id="checkout-success" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-neutral-400 stroke-[1px] animate-pulse" />
          </div>

          <div className="space-y-3">
            <h1 className={`text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Pedido Enviado!
            </h1>
            <p className="text-xs sm:text-sm font-light tracking-wide text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Tentamos abrir uma nova aba para enviar seus dados diretamente para o WhatsApp comercial de Elias Ribeiro. Caso a janela não tenha aberto, clique no botão preto abaixo.
            </p>
          </div>

          {/* Structured text box containing simulated message preview */}
          <div className={`p-6 text-left border text-xs leading-relaxed max-w-lg mx-auto font-mono whitespace-pre-line ${
            isDarkMode ? 'bg-neutral-950 border-neutral-900 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
          }`}>
            {generatedMessage}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-lg mx-auto">
            <a
              id="whatsapp-retry-link"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 flex items-center justify-center space-x-3 text-xs tracking-[0.2em] uppercase font-light border transition-all duration-300 ${
                isDarkMode
                  ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                  : 'border-black bg-black text-white hover:bg-white hover:text-black'
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>Enviar via WhatsApp</span>
            </a>

            <button
              id="reset-order-btn"
              onClick={handleFinishReset}
              className={`w-full py-4 text-xs tracking-[0.2em] uppercase font-light border transition-colors duration-300 ${
                isDarkMode ? 'border-neutral-800 text-white hover:bg-neutral-950' : 'border-neutral-200 text-black hover:bg-neutral-50'
              }`}
            >
              Concluir e Voltar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back button */}
      <button
        id="checkout-back-button"
        onClick={onBackToCart}
        className={`group flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-light mb-12 ${
          isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
        }`}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
        <span>Voltar para a Sacola</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <h2 className={`text-xl sm:text-2xl font-light tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Dados para Entrega
            </h2>
            <div className="w-12 h-[1px] bg-neutral-400" />
          </div>

          <form id="checkout-address-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-[11px] uppercase tracking-widest font-medium">
                Nome Completo *
              </label>
              <input
                id="form-fullName"
                type="text"
                name="fullName"
                required
                placeholder="Ex: Clara Silva"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                  isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                }`}
              />
            </div>

            {/* Row: Phone and CEP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-[11px] uppercase tracking-widest font-medium">
                  WhatsApp / Celular *
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ex: (21) 99999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="zipCode" className="block text-[11px] uppercase tracking-widest font-medium">
                  CEP *
                </label>
                <div className="flex gap-2">
                  <input
                    id="form-zipCode"
                    type="text"
                    name="zipCode"
                    required
                    placeholder="Ex: 22021-001"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`flex-1 px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                      isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                    }`}
                  />
                  <button
                    id="cep-lookup-button"
                    type="button"
                    disabled={isSearchingCep}
                    onClick={handleCepLookup}
                    className={`px-4 flex items-center justify-center border transition-colors ${
                      isDarkMode
                        ? 'border-neutral-800 hover:border-white text-white bg-neutral-950'
                        : 'border-neutral-200 hover:border-black text-black bg-neutral-50'
                    }`}
                    title="Buscar endereço"
                  >
                    <Search className={`w-4 h-4 ${isSearchingCep ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {cepError && (
                  <p id="cep-error-msg" className="text-[10px] text-neutral-400 font-light tracking-wide">
                    * {cepError}
                  </p>
                )}
              </div>

            </div>

            {/* Address Line (Rua) */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-[11px] uppercase tracking-widest font-medium">
                Logradouro / Rua *
              </label>
              <input
                id="form-address"
                type="text"
                name="address"
                required
                placeholder="Av. Atlântica"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                  isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                }`}
              />
            </div>

            {/* Row: Number and Complement */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="number" className="block text-[11px] uppercase tracking-widest font-medium">
                  Número *
                </label>
                <input
                  id="form-number"
                  type="text"
                  name="number"
                  required
                  placeholder="Ex: 1702"
                  value={formData.number}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="complement" className="block text-[11px] uppercase tracking-widest font-medium">
                  Complemento
                </label>
                <input
                  id="form-complement"
                  type="text"
                  name="complement"
                  placeholder="Ex: Bloco B, Apt 301"
                  value={formData.complement}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

            </div>

            {/* Row: Neighborhood, City, State */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label htmlFor="neighborhood" className="block text-[11px] uppercase tracking-widest font-medium">
                  Bairro *
                </label>
                <input
                  id="form-neighborhood"
                  type="text"
                  name="neighborhood"
                  required
                  placeholder="Copacabana"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="block text-[11px] uppercase tracking-widest font-medium">
                  Cidade *
                </label>
                <input
                  id="form-city"
                  type="text"
                  name="city"
                  required
                  placeholder="Rio de Janeiro"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-[11px] uppercase tracking-widest font-medium">
                  Estado (UF) *
                </label>
                <input
                  id="form-state"
                  type="text"
                  name="state"
                  required
                  placeholder="RJ"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs tracking-wider border rounded-none focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'bg-black border-neutral-800 focus:border-white text-white' : 'bg-white border-neutral-200 focus:border-black text-black'
                  }`}
                />
              </div>

            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4">
              <label className="block text-[11px] uppercase tracking-widest font-medium">
                Método de Pagamento Preferencial
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* PIX */}
                <label
                  id="pay-pix-label"
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === 'pix'
                      ? isDarkMode ? 'bg-neutral-900 border-white text-white' : 'bg-neutral-50 border-black text-black'
                      : isDarkMode ? 'border-neutral-800 text-neutral-400 hover:border-neutral-500' : 'border-neutral-200 text-neutral-500 hover:border-neutral-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      className="accent-black dark:accent-white"
                    />
                    <div className="text-xs tracking-wider uppercase font-light">PIX (5% desc)</div>
                  </div>
                  <Landmark className="w-5 h-5 opacity-70" />
                </label>

                {/* Credit Card */}
                <label
                  id="pay-card-label"
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === 'credit_card'
                      ? isDarkMode ? 'bg-neutral-900 border-white text-white' : 'bg-neutral-50 border-black text-black'
                      : isDarkMode ? 'border-neutral-800 text-neutral-400 hover:border-neutral-500' : 'border-neutral-200 text-neutral-500 hover:border-neutral-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                      className="accent-black dark:accent-white"
                    />
                    <div className="text-xs tracking-wider uppercase font-light">Cartão de Crédito</div>
                  </div>
                  <CreditCard className="w-5 h-5 opacity-70" />
                </label>

              </div>
            </div>

            {/* Direct action submit button */}
            <button
              id="checkout-submit-button"
              type="submit"
              className={`w-full h-14 flex items-center justify-center space-x-3 text-xs tracking-[0.25em] uppercase transition-all duration-300 font-light border ${
                isDarkMode
                  ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                  : 'border-black bg-black text-white hover:bg-white hover:text-black'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Confirmar Pedido via WhatsApp</span>
            </button>

          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className={`p-8 border space-y-6 sticky top-28 ${
            isDarkMode ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
          }`}>
            <h3 className="text-xs uppercase font-medium tracking-[0.2em] border-b pb-4 border-neutral-200 dark:border-neutral-800">
              Itens do Pedido
            </h3>

            {/* Items list */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-12 overflow-hidden border border-neutral-200 dark:border-neutral-800">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-110"
                      />
                    </div>
                    <div>
                      <p className="font-light uppercase tracking-wider">{item.product.name}</p>
                      <p className="text-[10px] text-neutral-400">Tam: {item.selectedSize} • Qtd: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-light">
                    {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs font-light tracking-wide">
              <div className="flex justify-between">
                <span className="text-neutral-400">Subtotal</span>
                <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              
              {formData.paymentMethod === 'pix' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Desconto PIX (5%)</span>
                  <span>- {(subtotal * 0.05).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-400">Envio (Frete)</span>
                <span className="text-neutral-400">A combinar</span>
              </div>

              <div className="flex justify-between border-t pt-4 font-normal text-sm tracking-widest uppercase">
                <span>Total Estimado</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>
                  {formData.paymentMethod === 'pix'
                    ? (subtotal * 0.95).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            <div className="text-[10px] text-neutral-400 font-light leading-relaxed">
              * Nota: O valor do frete e o link de pagamento final serão acordados com nosso assistente comercial no WhatsApp.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
