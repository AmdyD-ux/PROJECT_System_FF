import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("agent");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        try {
            await AuthService.register(username, password, fullName, role);
            setSuccessful(true);
            setMessage("Registration successful! You can now login.");
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(resMessage);
            setSuccessful(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            {!successful ? (
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="agent">Agent</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            ) : (
                <div className="text-center">
                    <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">
                        {message}
                    </div>
                    <Link to="/login" className="text-primary font-semibold hover:underline">Go to Login</Link>
                </div>
            )}

            {message && !successful && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Register;
