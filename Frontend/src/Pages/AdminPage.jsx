import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
                withCredentials: true
            });
            setOrders(res.data.orders);
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, status) => {
        await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, {
            status
        }, { withCredentials: true });

        setOrders((prev) =>
            prev.map((order) =>
                order._id === id ? { ...order, status } : order
            )
        );
    };

    return (
        <div className="p-6 max-w-6xl mx-auto font-serif bg-gradient-to-r from-rose-100 to-teal-100 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            {orders.map((order, index) => (
                <div key={order._id} className="bg-white rounded shadow p-4 mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Order #{index + 1}</p>
                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="border px-2 py-1 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="mt-4 space-y-2">
                        {order.items.map((item) => (
                            <div key={item.productId} className="flex justify-between items-center border-b py-2">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-bold">₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-right mt-2 font-bold text-xl">Total: ₹{order.totalAmount}</p>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;
