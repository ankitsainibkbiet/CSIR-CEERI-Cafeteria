import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function CreateProduct() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
        image: null,
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData();
        data.append("name", form.name);
        data.append("price", form.price);
        data.append("quantity", form.quantity);
        data.append("image", form.image);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/create`, data, {
                withCredentials: true,
            });
            alert("Product created successfully!");
            navigate("/")
        } catch (err) {
            alert("Failed to create product");
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen  bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center font-serif">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[400px] space-y-4">
                <h2 className="text-xl font-bold text-center">Create New Product</h2>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="w-full px-3 py-2 border rounded"
                />

                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="w-full px-3 py-2 border rounded"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full border p-1"
                />

                {!loading ? (
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Create Product
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Creating Product...
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreateProduct;
