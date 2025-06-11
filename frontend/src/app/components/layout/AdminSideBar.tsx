import { Link } from "react-router-dom";
import { useLayout } from "../../contexts/layoutContext";
export const AdminSidebar = () => {
    const { toggleMenu } = useLayout()
    return (
        <div className="w-64 bg-blue-100 h-screen p-4">
            <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/add-category">Add Category</Link></li>
                <li><Link to="/admin/add-subcategory">Add Subcategory</Link></li>
            </ul>
            <button onClick={toggleMenu} className="mt-4 text-sm underline">Switch to Config View</button>
        </div>
    )
}