import { Link } from "react-router-dom";
import { useLayout } from "../../contexts/layoutContext";
const AdminConfigSidebar = () => {
    const { toggleMenu } = useLayout();

    return (
        <div className="w-64 bg-yellow-100 h-screen p-4">
            <h2 className="text-xl font-bold mb-4">Admin Config</h2>
            <p>This is a configurable sidebar view.</p>
            <ul>
                <li><Link to="/admin/dashboard">Set up</Link></li>
                <li><Link to="/admin/add-category">Generate</Link></li>
                <li><Link to="/admin/add-subcategory">Load</Link></li>
            </ul>
            <button onClick={toggleMenu} className="mt-4 text-sm underline">Back to Menu</button>
        </div>
    );
};

export default AdminConfigSidebar;