export interface itemModel {
  description?: string;
  recommendation: boolean;
  id: string;
  price: number;
  title: string;
  type: string;
  picture: string;
  amount?: number;
  isGlutenFree: boolean;
  isSpicy: boolean;
  isVegan: boolean;
  isNew: boolean;
}
