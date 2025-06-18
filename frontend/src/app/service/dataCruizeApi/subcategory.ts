import { SubcategoryPayload } from "../../models/dataCruize";
import api from "../api";

export const getAllSubcategory = async (
  pageIndex: number,
  pageSize: number,
  searchValue?: string
) => {
  try {
    const params = new URLSearchParams({
      pageIndex: String(pageIndex + 1),
      pageSize: String(pageSize),
    });

    if (searchValue?.trim()) {
      params.append("searchFilter", searchValue);
    }

    const response = await api.get(`/subcategory/subcat-with-cat?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Unknown error"
    );
  }
};
export const createSubcategory = async (data: SubcategoryPayload) => {
  try {
    const response = await api.post("/subcategory", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to create Sub-Category"
    );
  }
};
export const deleteSubcategory = async (id: number) => {
  try {
    const response = await api.delete(`/subcategory/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to delete Sub-Category"
    );
  }
};
export const updateSubcategory = async (id: number, data: SubcategoryPayload) => {
  try {
    const response = await api.put(`/subcategory/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to update Sub-Category"
    );
  }
};
