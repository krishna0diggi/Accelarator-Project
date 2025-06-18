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
  name: string;
  order: number;
  status: boolean;
};

export type SubcategoryPayload = {
  categoryId: number;
  name: string;
  url: string;
  title: string;
  description: string;
  status: boolean;
  order: number;
};

// {
//   "name": "Deploy",
//   "url": "https://jupyter.org/",
//   "title": "Deploy the data",
//   "description": "Deploy is used to set up the environment for DE",
//   "categoryId": 3
// }
