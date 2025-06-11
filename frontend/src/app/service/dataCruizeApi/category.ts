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