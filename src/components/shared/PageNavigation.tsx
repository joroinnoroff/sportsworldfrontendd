import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
    { name: "home", to: "" },
    { name: "create", to: "add-new-athlete" },
    { name: "dashboard", to: "dashboard" },
    { name: "venues", to: "get-all-venues" },
    { name: "Create venue", to: "add-new-venues" },
]

const PageNavigation = () => {
    const [open, setOpen] = useState(false);

    //setter sann / false ved click 
    const handleToggle = () => {
        setOpen(prev => !prev);

    }

    //bruker react dom location til å finne aktiv side
    const location = useLocation();
    const activePath = location.pathname;
    return (
        <header className=" p-6 flex items-start gap-6">
            <nav className=" ">


                <ul className="hidden lg:flex gap-6 justify-around  rounded-md items-center">
                    {/**bruker location fra react router og sjekker activepath mot link to */}
                    {navLinks.map((link, idx) => (
                        <Link key={idx} to={link.to}
                            className={`${activePath === `/${link.to}` ? "text-white bg-black border rounded-md" : " hover:opacity-70"}
                            py-2 px-4 transition`}>{link.name}</Link>
                    ))}

                </ul>


                {/**Mobil navi */}

                {/**Viser meny valg om state er sann */}
                <button onClick={handleToggle}
                    className="hover:bg-gray-300 cursor-pointer transition px-4 py-2 block lg:hidden">
                    {open ? "X" : "Menu"}</button>
                {open ? (
                    <>
                        <ul className="flex gap-6 justify-around bg-black text-white h-20 p-4 rounded-md items-center">

                            {navLinks.map((link, idx) => (
                                <Link key={idx} to={link.to} onClick={handleToggle}>{link.name}</Link>
                            ))}

                        </ul>



                    </>
                ) : (
                    null
                )}
            </nav>
        </header>
    );
}

export default PageNavigation;