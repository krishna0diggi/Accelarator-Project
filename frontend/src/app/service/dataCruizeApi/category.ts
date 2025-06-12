import { subCategoryData } from "../../models/dataCruize";
import api from "../api";
export const getCategoryWithSubcategory = async() => {
    try{
        const response = await api.get('/category/cat-with-subcat')
        return response.data
    }
    catch(err:any){
        throw new Error(err.response?.data?.message || "Unable to fetch category with subcat")
    }
}

export const createCategory = async(data:subCategoryData) => {
      try {
    const response = await api.post("/category", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unable to create Sub-Category");
  }

}
export const deleteCategory = async(id:number) => {
     try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unable to delete Sub-Category");
  }
}
export const getAllCategory = async(  pageIndex: number, 
  pageSize: number, 
  searchValue?: string) => {

}
export const updateCategory = async(id:number, data:subCategoryData) => {
     try {
    const response = await api.put(`/category/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unable to update Sub-Category");
  }

}
