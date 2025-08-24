import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    // Feteh Cart Items
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                    withCredentials: true
                });
                setCartItems(res.data.cart);
            } catch (err) {
                console.error("Error fetching cart:", err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);



    // Handle Remove Items
    const handleRemove = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${productId}`, {
                withCredentials: true
            });
            setCartItems((prev) => prev.filter((item) => item.productId !== productId));
        } catch (err) {
            console.error("Remove error:", err);
        }
    };



    // Total Amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);



    // Hanlde Payment
    const handlePayment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
                amount: totalAmount
            }, { withCredentials: true });
            const { order } = res.data;

            const resUser = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/auth`, {
                withCredentials: true
            });
            const user = resUser.data.user;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "CSIR-CEERI Cafeteria",
                description: "Coupon Booking",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, { withCredentials: true });
                        alert("Payment Successful!");
                        navigate("/order");
                    } catch (err) {
                        console.error("Verification failed:", err);
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: user.username,
                    email: user.email || "support@ceeri.res.in",
                    contact: "9999999999"
                },
                theme: { color: "#28a745" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            alert("Payment failed");
            console.error(err);
        }
    };





    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center mt-15">
                <span class="loader"></span>
                <span>Loading cart...</span>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return <div className="min-h-[60vh] text-center mt-20 text-xl font-serif">Your cart is empty 🛒</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-rose-100 py-10 px-4 font-serif">
            <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
            <div className="max-w-4xl mx-auto space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={item.productId}
                        className="flex justify-between items-center bg-white rounded-lg shadow p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 rounded object-cover" />
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                            <button
                                onClick={() => handleRemove(item.productId)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="text-xl font-bold flex justify-end items-center gap-4">
                    <p>Total: ₹{totalAmount}</p>
                    <button
                        onClick={handlePayment}
                        className="bg-[#28a745] hover:bg-green-700 rounded text-white px-3 py-1 text-lg cursor-pointer" >
                        proceed to pay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
