import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ScanAttendance from "./components/ScanAttendance";

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to={"/"} className="text-xl font-bold text-primary">
                        FONAMIF Attendance
                    </Link>
                    <div className="flex gap-4 items-center">
                        {currentUser ? (
                            <>
                                <Link to={"/dashboard"} className="hover:text-primary transition">Dashboard</Link>
                                <Link to={"/scan"} className="hover:text-primary transition">Pointage</Link>
                                <span className="text-sm font-semibold text-gray-600">
                                    {currentUser.username} ({currentUser.roles[0]})
                                </span>
                                <button onClick={logOut} className="text-red-600 font-semibold hover:text-red-800 transition">
                                    LogOut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className="text-gray-600 hover:text-primary transition">Login</Link>
                                <Link to={"/register"} className="text-gray-600 hover:text-primary transition">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mx-auto mt-8 p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/scan" element={<ScanAttendance />} />
                </Routes>
            </div>
        </div>
    );
}

const Home = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FONAMIF</h1>
            <p className="text-xl text-gray-600">Bio/QR/Barcode Attendance Management System</p>
            <div className="mt-8">
                <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg mr-4 font-semibold hover:bg-blue-700 transition">Signin</Link>
                <Link to="/register" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Signup Agent</Link>
            </div>
        </div>
    )
}

export default App;
