// types.ts (optional)
export type Subcategory = {
  id: number;
  name: string;
  url: string;
  title: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  subcategories: Subcategory[];
};


export type CategoryPayload = {
  name: string,
  order:number,
  status: boolean
}