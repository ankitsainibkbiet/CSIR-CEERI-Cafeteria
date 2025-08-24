import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                formData,
                { withCredentials: true }
            );
            if (res.data.success) {
                navigate("/"); // redirect after login
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center px-4 font-serif">
            <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block mb-1 text-gray-600 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm sm:text-base"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-gray-600 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm sm:text-base"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#333] text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#333] hover:underline font-medium">Sign Up</Link>
                </p>
            </div>
        </div>

    );
}

export default Login;
