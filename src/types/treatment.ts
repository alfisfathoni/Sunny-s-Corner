export interface TreatmentItem {
  name: string;
  price: string;
  notes?: string;
  isPO?: boolean;
  description?: string;
  image: string;
}

export interface TreatmentCategory {
  categoryName: string;
  items: TreatmentItem[];
}
