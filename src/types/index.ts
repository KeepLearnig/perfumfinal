export interface Product {
  id: number;
  name: string;
  price: number;
  transferPrice: number;
  image: string;
  stock: number;
  installments: number;
  installmentPrice: number;
  description?: string;
  images?: string[];
  category?: string;
  brandCategory?: string;
  genderCategory?: 'Masculino' | 'Femenino' | 'Unisex';
  relatedIds?: number[];
  badgeText?: string;
}


export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  agotado: boolean;
}
