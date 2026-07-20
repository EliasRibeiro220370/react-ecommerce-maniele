export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'feminino' | 'masculino' | 'acessorios';
  images: string[];
  sizes: string[];
  features: string[];
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'pix' | 'credit_card';
}

export type ActiveTab = 'home' | 'produtos' | 'detalhes' | 'carrinho' | 'checkout';
