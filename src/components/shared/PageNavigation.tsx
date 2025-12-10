import { Link } from "react-router-dom";

const PageNavigation = () => {
    return (
        <nav className="bg-gray-500 text-white pt-2 pb-2">
            <ul className="flex justify-around">
                <li><Link className="hover:text-gray-300" to="/">Athletes</Link></li>
                <li><Link className="hover:text-gray-300" to="add-new-athlete">New Athlete</Link></li>
                <li><Link className="hover:text-gray-300" to="dashboard">Dashboard</Link></li>
                <li><Link className="hover:text-gray-300" to="get-all-venues">Venues</Link></li>
                <li><Link className="hover:text-gray-300" to="add-new-venues">New Venue</Link></li>
            </ul>
        </nav>
    );
}

export default PageNavigation;