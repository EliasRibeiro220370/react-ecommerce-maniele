# React E-commerce Maniele — Moda Praia Minimalista

Um e-commerce de alta-costura para moda praia, projetado sob uma estética estritamente minimalista e focado em sofisticação conceitual. Toda a identidade visual, interfaces e transições de tela utilizam uma paleta cromática exclusiva composta apenas por **Branco, Preto e Cinza Claro**, evocando o visual de catálogos e editoriais de luxo.

---

## 🎨 O Conceito Visual: Purismo Marítimo
Inspirado por marcas clássicas e design contemporâneo dinâmico, o **React E-commerce Maniele** elimina a poluição visual e o ruído de cores vibrantes frequentemente associados à moda praia brasileira. Em vez disso, foca-se na beleza pura da modelagem, na geometria dos cortes e na textura de fios ecológicos de alta tecnologia. 

- **Branco Puro (`#ffffff`)**: Traz respiro, luz e destaca os vazios espaciais das margens.
- **Cinza Claro (`#f5f5f5` / `#e5e5e5`)**: Define os quadros de visualização, as divisórias finas e as superfícies interativas.
- **Preto Absoluto (`#000000`)**: Fornece peso estrutural, tipografia legível e contraste absoluto.

---

## ⚡ Principais Funcionalidades

1. **Início (Home)**: Banner editorial impactante com conceito da marca, galeria de destaques (*Best Sellers*), navegação fluida por categorias (Feminino, Masculino e Acessórios) e o Manifesto de Estilo Maniele.
2. **Coleção Completa (Produtos)**: Filtros instantâneos por linhas, busca de texto inteligente em tempo real e ordenação dinâmica por preços ou nomes.
3. **Página de Especificação (Detalhes)**: Seletor de tamanhos anatômicos, galeria de imagens secundárias com filtros de tom de cinza interativos e controle de quantidades.
4. **Sacola de Compras (Carrinho)**: Edição de quantidade em tempo real, exclusão de itens e faturamento estimado inteligente.
5. **Finalização de Pedido (Checkout)**: Formuário completo integrado à API pública **ViaCEP** (busca de endereço automatizada ao digitar o código postal do Brasil) e seleção de método de pagamento (PIX ou Cartão).
6. **Integração Comercial via WhatsApp**: Após o fechamento do checkout, um link de redirecionamento imediato é construído para o número comercial da marca (`+55 21 96897-6671`), enviando os dados completos do pedido perfeitamente formatados em markdown (produtos, tamanhos, quantidades, dados de entrega e método de pagamento).
7. **Modo Escuro / Claro Inteiramente Customizado**: Um interruptor de tema minimalista permite que o usuário alterne toda a paleta entre um fundo branco luminoso com detalhes em cinza claro, ou um fundo preto profundo com detalhes em cinza grafite.

---

## 🛠️ Tecnologias Utilizadas

- **React 19 + Vite 6**: Fundação da aplicação de página única (SPA).
- **TypeScript 5**: Tipagem estrita de dados para garantir estabilidade.
- **Tailwind CSS v4**: Controle rigoroso das classes utilitárias de estilo responsivo.
- **Motion (framer-motion)**: Micro-animações sofisticadas para trocas de páginas e interações.
- **Lucide React**: Biblioteca de ícones simplificados e lineares de traço fino.
- **API ViaCEP**: Integração de rede em tempo real para experiência de checkout fluida.

---

## 📦 Estrutura do Projeto

```text
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Barra de navegação e seletor de tema
│   │   ├── Footer.tsx                 # Rodapé institucional e dados de contato
│   │   ├── HomeView.tsx               # Página inicial e manifesto
│   │   ├── ProductsView.tsx           # Catálogo com filtros de pesquisa e ordenação
│   │   ├── ProductDetailsView.tsx     # Detalhes do item, tamanhos e galeria
│   │   ├── CartView.tsx               # Gerenciador da sacola de compras
│   │   └── CheckoutView.tsx           # Formulário de envio, ViaCEP e WhatsApp
│   ├── data/
│   │   └── products.ts                # Banco de dados fictício de itens premium
│   ├── types.ts                       # Tipagens e interfaces TypeScript
│   ├── App.tsx                        # Roteador interno e estado centralizado
│   ├── index.css                      # Configuração de temas e fontes do Google
│   └── main.tsx                       # Ponto de entrada React
├── index.html                         # Documento HTML base
├── metadata.json                      # Metadados de aplicativo
└── package.json                       # Dependências e scripts de execução
```

---

## 🚀 Como Executar o Projeto

1. Certifique-se de que possui o **Node.js** instalado.
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Inicialize o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O e-commerce estará acessível no endereço padrão do Vite (geralmente `http://localhost:3000`).
