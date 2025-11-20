import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../Components/Container"

function Order() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/orders`, {
                    withCredentials: true
                });
                setOrders(res.data.orders);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center mt-15">
                <span class="loader"></span>
                <span>Loading orders...</span>
            </div>
        );
    }

    if (orders.length === 0) {
        return <div className="min-h-[60vh] text-center mt-20 text-xl font-serif ">No orders found 📦</div>;
    }

    return (
        <Container>
            <div className="min-h-screen bg-linear-to-br from-white to-rose-100 py-10 px-4 font-serif">
                <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>

                <div className="max-w-5xl mx-auto space-y-8">
                    {orders.map((order, index) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-lg font-semibold">Order #{index + 1}</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <span className={`px-4 py-1 text-sm rounded-full font-medium
                                    ${order.status === "Completed" ? "bg-green-100 text-green-700" :
                                        order.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.productId} className="flex justify-between items-center border-b py-2">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                                            <div>
                                                <p className="text-lg font-medium">{item.name}</p>
                                                <p className="text-gray-500 text-sm">₹{item.price} × {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-right mt-4 text-xl font-bold">
                                Total: ₹{order.totalAmount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default Order;
