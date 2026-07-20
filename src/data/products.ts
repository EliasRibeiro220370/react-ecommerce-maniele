import { Product } from '../types';
// @ts-ignore
import maioNoirBeach from '../assets/images/maio_noir_beach_1784470225983.jpg';
// @ts-ignore
import maioNoirBackDetail from '../assets/images/maio_noir_back_detail_1784471417081.jpg';
// @ts-ignore
import biquiniSculptOffWhite from '../assets/images/biquini_sculpt_off_white_1784470693327.jpg';
// @ts-ignore
import biquiniSculptPose from '../assets/images/biquini_sculpt_pose_1784471427190.jpg';
// @ts-ignore
import saidaLinenDusk from '../assets/images/saida_linen_dusk_1784471229686.jpg';
// @ts-ignore
import saidaLinenCafe from '../assets/images/saida_linen_cafe_1784471438569.jpg';
// @ts-ignore
import bermudaSlateFront from '../assets/images/bermuda_slate_front_1784472218828.jpg';
// @ts-ignore
import bermudaSlateDetail from '../assets/images/bermuda_slate_detail_1784472238260.jpg';
// @ts-ignore
import sungaClassicOnyxFront from '../assets/images/sunga_classic_onyx_front_1784472607959.jpg';
// @ts-ignore
import sungaClassicOnyxDetail from '../assets/images/sunga_classic_onyx_detail_1784472625821.jpg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maiô Noir Minimaliste',
    price: 289.00,
    description: 'Maiô de peça única com decote profundo nas costas, confeccionado em tecido tecnológico biodegradável com proteção UV50+. Modelagem anatômica que esculpe a silhueta com extremo conforto.',
    category: 'feminino',
    images: [
      maioNoirBeach,
      maioNoirBackDetail
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    features: [
      'Proteção solar UV50+ integrada',
      'Tecido biodegradável texturizado',
      'Secagem ultra-rápida',
      'Forro duplo anti-transparência'
    ],
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Biquíni Sculpt Off-White',
    price: 249.00,
    description: 'Conjunto de biquíni off-white texturizado. Top meia-taça com aro de sustentação e calcinha asa-delta com costura invisível. Sofisticação e caimento perfeito em harmonia.',
    category: 'feminino',
    images: [
      biquiniSculptOffWhite,
      biquiniSculptPose
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    features: [
      'Top estruturado com aro',
      'Alças reguláveis com metais banhados a ouro (anticorrosão)',
      'Tecido canelado premium',
      'Calcinha com modelagem dupla face'
    ],
    isBestSeller: false
  },
  {
    id: '3',
    name: 'Saída de Praia Linen Dusk',
    price: 319.00,
    description: 'Chemise longa em linho puro e algodão na cor cinza claro enevoado. Gola padre, mangas dobráveis e botões frontais em madrepérola. A tradução perfeita do despojamento chic.',
    category: 'feminino',
    images: [
      saidaLinenDusk,
      saidaLinenCafe
    ],
    sizes: ['P', 'M', 'G'],
    features: [
      'Composição: 55% Linho, 45% Algodão',
      'Toque macio pré-lavado (não encolhe)',
      'Modelagem oversized fluida',
      'Aberturas laterais para movimento'
    ],
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Bermuda Tailored Slate',
    price: 199.00,
    description: 'Bermuda masculina de banho com modelagem alfaiataria em cinza chumbo. Fechamento frontal por zíper e botão de pressão, bolsos faca e ajuste lateral discreto.',
    category: 'masculino',
    images: [
      bermudaSlateFront,
      bermudaSlateDetail
    ],
    sizes: ['38', '40', '42', '44', '46'],
    features: [
      'Tecido repelente à água',
      'Bolsos traseiros com zíper invisível',
      'Secagem expressa em menos de 10 minutos',
      'Ajustadores metálicos antioxidantes'
    ],
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Sunga Classic Onyx',
    price: 129.00,
    description: 'Sunga tradicional preta com lateral larga de 10cm. Confeccionada com lycra extra life e elastano de altíssima qualidade, proporcionando ajuste firme e liberdade.',
    category: 'masculino',
    images: [
      sungaClassicOnyxFront,
      sungaClassicOnyxDetail
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    features: [
      'Fio Lycra® Xtra Life (resistente ao cloro)',
      'Cordão interno para ajuste personalizado',
      'Logotipo minimalista termo-colado',
      'Interior totalmente forrado'
    ],
    isBestSeller: false
  },
  {
    id: '6',
    name: 'Óculos de Sol Obsidian',
    price: 349.00,
    description: 'Óculos de sol unissex com armação robusta em acetato italiano preto polido à mão e lentes pretas com proteção total UVA/UVB polarizada.',
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['Único'],
    features: [
      'Lentes polarizadas anti-risco',
      'Proteção 100% UVA/UVB (UV400)',
      'Dobradiças reforçadas de 5 dentes',
      'Acompanha case rígida de couro sintético e flanela'
    ],
    isBestSeller: true
  },
  {
    id: '7',
    name: 'Bolsa de Praia Crochet Carbon',
    price: 179.00,
    description: 'Bolsa tote de praia tecida manualmente em crochê estruturado de algodão encerado preto. Perfeita para carregar toalhas, livros e itens essenciais com estilo.',
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['Único'],
    features: [
      'Artesanal 100% feito à mão',
      'Fios de algodão impermeabilizado',
      'Alças reforçadas com costura em cruz',
      'Bolso interno com zíper para celular e chaves'
    ],
    isBestSeller: false
  },
  {
    id: '8',
    name: 'Chapéu Fedora Noir',
    price: 229.00,
    description: 'Chapéu Fedora de palha natural trançada, pintado em preto mate com faixa de gorgorão acetinado. Uma peça que adiciona mistério e imponência sob o sol.',
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['Único'],
    features: [
      'Palha de alta densidade trançada à mão',
      'Aba maleável de 8cm para excelente proteção solar',
      'Carneira interna acolchoada para conforto',
      'Ajuste interno de circunferência invisível'
    ],
    isBestSeller: false
  }
];
