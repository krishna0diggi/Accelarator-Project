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


export type subCategoryData = {
  name: string,
  categoryId: number,
  status: boolean
}