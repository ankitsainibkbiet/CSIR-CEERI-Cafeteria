import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "./Container";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState('')
    const navigate = useNavigate();
    const location = useLocation()

    //handle Account Icon
    useEffect(() => {
        setShowDropdown(false)
    }, [location.pathname])


    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/auth`, {
                    withCredentials: true
                });
                setIsAuthenticated(res.data.success);
                setIsAdmin(res.data.user._id)
            } catch (err) {
                console.error("Auth check failed:", err);
            }
        };
        checkAuth();
    }, [location.pathname]);


    // Logout Handler
    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
                withCredentials: true
            });
            setIsAuthenticated(false);
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <Container>
            <header className="bg-[#333] text-white font-serif shadow-md relative z-50">
                <div className="px-4 py-2 flex items-center justify-between">

                    {/* LEFT TITLE */}
                    <div className="text-xl sm:text-2xl font-bold tracking-wide">
                        <Link to="/" className="transition">CSIR-CEERI CAFETERIA</Link>
                    </div>

                    {/* Hamburger Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowDropdown(prev => !prev)}
                            className="focus:outline-none"
                        >
                            <i className="fa-solid fa-bars text-2xl"></i>
                        </button>
                    </div>

                    {/* RIGHT NAV for Medium and Up */}
                    <nav className="hidden md:flex">
                        <ul className="flex space-x-8 text-lg font-medium items-center">
                            <li>
                                <Link to="/" className="hover:text-[#febd68] transition-all flex hover:scale-[105%] duration-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/order" className="hover:text-[#febd68] transition-all flex hover:scale-[105%] duration-300">Orders</Link>
                            </li>

                            {/* ACCOUNT DROPDOWN */}
                            <li className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="hover:text-[#febd68] transition flex items-center gap-2 hover:scale-[105%] duration-300"
                                >
                                    Account
                                </button>

                                {showDropdown && (
                                    <ul className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-40 text-lg z-10">
                                        {!isAuthenticated ? (
                                            <>
                                                <li className="hover:bg-blue-500 duration-500">
                                                    <Link
                                                        to="/login"
                                                        onClick={() => setShowDropdown(false)}
                                                        className="block px-4 py-2"
                                                    >
                                                        Login
                                                    </Link>
                                                </li>
                                                <li className="hover:bg-green-500 duration-500">
                                                    <Link
                                                        to="/signup"
                                                        onClick={() => setShowDropdown(false)}
                                                        className="block px-4 py-2"
                                                    >
                                                        Signup
                                                    </Link>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                {isAdmin === "68bd0da4552a25f5e8729511" && (
                                                    <li className="hover:bg-green-500 duration-500">
                                                        <Link
                                                            to="/product/create"
                                                            onClick={() => setShowDropdown(false)}
                                                            className="block px-4 py-2"
                                                        >
                                                            Create
                                                        </Link>
                                                    </li>
                                                )}

                                                <li className="hover:bg-red-500 duration-500">
                                                    <button
                                                        onClick={() => {
                                                            handleLogout();
                                                            setShowDropdown(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </li>

                            <li>
                                <Link to="/cart" className="hover:text-[#febd68] transition flex items-center gap-2 hover:scale-[105%] duration-300">
                                    Cart <i className="fa-solid fa-cart-shopping text-white"></i>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Mobile Nav */}
                {showDropdown && (
                    <div className="md:hidden px-4 pb-4">
                        <ul className="flex flex-col gap-4 text-lg font-medium">
                            <li>
                                <Link to="/" onClick={() => setShowDropdown(false)} className="block hover:text-[#febd68]">Home</Link>
                            </li>
                            <li>
                                <Link to="/order" onClick={() => setShowDropdown(false)} className="block hover:text-[#febd68]">Orders</Link>
                            </li>
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/login" onClick={() => setShowDropdown(false)} className="block hover:text-[#febd68]">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" onClick={() => setShowDropdown(false)} className="block hover:text-[#febd68]">Signup</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {isAdmin === "687489051558a43590790d33" && (
                                        <li>
                                            <Link to="/product/create" onClick={() => setShowDropdown(false)} className="block hover:text-[#febd68]">Create</Link>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setShowDropdown(false);
                                            }}
                                            className="block text-left w-full hover:text-[#febd68]"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to="/cart" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 hover:text-[#febd68]">
                                    Cart <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </Container>

    );
}

export default Header;
