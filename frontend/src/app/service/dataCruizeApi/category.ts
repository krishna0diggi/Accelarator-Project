import { CategoryPayload } from "../../models/dataCruize";
import api from "../api";
export const getCategoryWithSubcategory = async () => {
  try {
    const response = await api.get("/category/cat-with-subcat");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Unable to fetch category with subcat"
    );
  }
};

export const createCategory = async (data: CategoryPayload) => {
  try {
    const response = await api.post("/category", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to create Category"
    );
  }
};
export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to delete Category"
    );
  }
};
export const getAllCategory = async (
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

        const response = await api.get(`/category?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Unknown error");
    }
};
export const updateCategory = async (id: number, data: CategoryPayload) => {
  try {
    const response = await api.put(`/category/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to update Category"
    );
  }
};
// getall
export const getAllActiveCategory = async() => {
  try {
    const response = await api.get('/category/getall');
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch Category"
    );
  }
}
