import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        Quantity: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id.replaceAll(' ', '-')}`);
                console.log(res.data)
                setFormData({
                    name: res.data.product.name,
                    price: res.data.product.price,
                    Quantity: res.data.product.Quantity,
                    image: res.data.product.image,
                });
            } catch (err) {
                console.error("Error fetching product:", err);
                alert("Failed to load product.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {  // to convert in array
            payload.append(key, value);
        });
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, payload,
                { withCredentials: true }
            );
            alert("Product updated successfully.");
            navigate("/");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-rose-100 px-4 py-10 font-serif">
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg mb-1">Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-1">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-1">Quantity:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.Quantity}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-1">Product Image:</label>
                        {formData.image && (
                            <img src={formData.image} alt="preview" className="w-32 h-32 object-cover rounded mb-2" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={() => formData.image(e.target.files[0])}
                            className="w-full border p-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
