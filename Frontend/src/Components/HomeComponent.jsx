import Container from "./Container"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HomeComponent() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [quantities, setQuantities] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState('')

    // Check Auth
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
    }, [isAuthenticated]);


    // Fetch Products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`)
                setProducts(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [])


    // Initialize the Quantity
    useEffect(() => {
        const initialQuantities = {};
        products.forEach((item) => {
            if (item.name === "Tea Coupon" || item.name === "Coffee/Snacks Coupon") {
                initialQuantities[item._id] = 10; // special case
            } else {
                initialQuantities[item._id] = 1;
            }
        });
        setQuantities(initialQuantities);
    }, [products]);


    // Handle Increment
    const handleIncrement = (id, name) => {
        setQuantities((prev) => {
            const isSpecial = name === "Tea Coupon" || name === "Coffee/Snacks Coupon";
            const increment = isSpecial ? 10 : 1;
            return { ...prev, [id]: prev[id] + increment };
        });
    };


    // Handle Decrement
    const handleDecrement = (id, name) => {
        setQuantities((prev) => {
            const isSpecial = name === "Tea Coupon" || name === "Coffee/Snacks Coupon";
            const minQty = isSpecial ? 10 : 1;
            const decrement = isSpecial ? 10 : 1;
            const newQty = prev[id] - decrement;
            if (newQty < minQty) {
                if (isSpecial) {
                    alert("Minimum Quantity of Tea or Coffee/Snacks Coupon is 10")
                } else {
                    alert("Minimum Quantity of Lunch/Dinner items is 1")
                }
            }
            return { ...prev, [id]: newQty < minQty ? minQty : newQty };
        });
    };


    // Handle AddToCart
    const handleAddToCart = async (item) => {
        try {
            const payload = {
                productId: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: quantities[item._id],
            };
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, payload, {
                withCredentials: true,
            });
            alert("Item is added to your cart !")
        } catch (err) {
            console.error("Add to cart failed:", err.response?.data?.message || err.message);
            alert("Failed to add to cart. Make sure you're logged in.");
        }
    };


    // Handle Delete
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`, {
                withCredentials: true,
            });
            alert("Product deleted successfully.");
            // Optionally refetch product list or remove from local state
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
            alert("Failed to delete product.");
        }
    };



    return (
        <Container>
            <div>
                {/* Hero Image */}
                <div className="relative">
                    <img
                        src="/images/csir_ceeri_cover.jpg"
                        alt="heroImg"
                        className="w-full max-h-[450px] object-cover object-top"
                    />
                    <div className="w-full overflow-hidden bg-[#fff] font-serif text-[#000] text-base sm:text-lg group absolute md:bottom-23 bottom-2">
                        <div className="animate-marquee whitespace-nowrap">
                            <span className="px-4 py-1 font-bold block">
                                Coupon Booking Time: Before 05:00 PM, Lunch Booking Time: Before 11:00 AM, Dinner Booking Time: Before 5:30 PM!
                                Coupon Delivery Time: 2:30 PM to 3:00 PM and 5:00 PM to 5:30 PM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Products */}
                {loading ? (
                    <div className="h-screen flex flex-col items-center mt-15">
                        <span class="loader"></span>
                        <span>Loading products...</span>
                    </div>
                ): (
                    <div className = "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-serif relative mt-5 md:-mt-20 mb-5 px-2 sm:px-5">
                    {products.map((item) => (
                <div
                    key={item._id}
                    className="p-2 sm:p-3 space-y-3 bg-white hover:scale-[105%] duration-500 shadow rounded-md"
                >
                    <p className="text-base sm:text-xl">{item.name}</p>

                    <img
                        src={item.image}
                        alt="image 404"
                        className="object-cover object-top w-full h-[140px] sm:h-[200px] rounded"
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 text-sm mt-2">
                        {/* Price */}
                        <span className="text-sm sm:text-lg">&#8377;{item.price}</span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleDecrement(item._id, item.name)}
                                className="w-6 h-6 bg-gray-300 text-lg font-bold rounded-full hover:bg-gray-400 transition duration-200 flex justify-center items-center"
                            >-</button>

                            <span className="text-sm">
                                QTY: <span className="text-lg font-semibold">{quantities[item._id]}</span>
                            </span>

                            <button
                                onClick={() => handleIncrement(item._id, item.name)}
                                className="w-6 h-6 bg-gray-300 text-lg font-bold rounded-full hover:bg-gray-400 transition duration-200 flex justify-center items-center"
                            >+</button>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {isAuthenticated && isAdmin === "687489051558a43590790d33" && (
                        <div className="flex flex-col sm:flex-row justify-around items-center text-sm gap-2 mt-2">
                            <Link to={`/product/edit/${item._id}`} className="w-full sm:w-auto">
                                <button className="hover:bg-blue-600 text-white border duration-300 bg-blue-400 w-full sm:w-auto px-4 py-1 font-bold rounded">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="hover:bg-red-600 text-white border duration-300 bg-red-400 w-full sm:w-auto px-4 py-1 font-bold rounded"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                    ))}
            </div>
                )}

        </div>
        </Container >

    )
}

export default HomeComponent