import React, { useState, useEffect } from "react";
import api from "../services/api";
import AuthService from "../services/auth.service";

const Dashboard = () => {
    const [stats, setStats] = useState({ presentCount: 0, lateCount: 0, absentCount: 0, totalAgents: 0 });
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
            fetchStats(currentUser);
        }
    }, []);

    const fetchStats = async (currentUser) => {
        // Simple logic to fetch admin or manager stats
        // Agents would fetch their own history (not implemented in this minimal scope, showing general stats for simplicity or message)
        const role = currentUser.roles.includes("ROLE_ADMIN") ? "admin" :
            currentUser.roles.includes("ROLE_MANAGER") ? "manager" : "agent";

        if (role === "agent") return;

        try {
            const response = await api.get(`dashboard/${role}`);
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    if (!user) return null;

    if (user.roles.includes("ROLE_AGENT")) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-gray-800">My Dashboard</h2>
                <div className="mt-8 p-6 bg-white rounded-xl shadow inline-block">
                    <p className="text-xl">Welcome, {user.fullName}</p>
                    <p className="text-gray-500 mt-2">Check your pointage history functionality coming soon...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {user.roles.includes("ROLE_ADMIN") ? "Admin Dashboard" : "Manager Dashboard"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Agents" value={stats.totalAgents || 0} color="bg-blue-500" />
                <StatCard title="Present Today" value={stats.presentCount || 0} color="bg-green-500" />
                <StatCard title="Late" value={stats.lateCount || 0} color="bg-yellow-500" />
                <StatCard title="Absent" value={stats.absentCount || 0} color="bg-red-500" />
            </div>

            {/* Placeholder for more complex charts */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Attendance Trends</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    [Chart Placeholder: Weekly Attendance Graph]
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div className={`${color} text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300`}>
        <h3 className="text-lg font-semibold opacity-90">{title}</h3>
        <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
);

export default Dashboard;
