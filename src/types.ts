export interface Product {
  id: string | number;
  title: string;
  price: number;
  image: string;
  image_url?: string;
  category: string;
  description?: string;
}

export type Category = 'All' | 'Cots' | 'Sofas' | 'Mattresses' | 'Dressing Tables' | 'Computer Tables';
