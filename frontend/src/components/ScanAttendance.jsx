import React, { useState } from "react";
import api from "../services/api";

const ScanAttendance = () => {
    const [method, setMethod] = useState("BIOMETRIC");
    const [data, setData] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // success or error

    const handleScan = async (e) => {
        e.preventDefault();
        setMessage("");
        setStatus("");

        try {
            const response = await api.post("attendance/scan", {
                method,
                data
            });
            setMessage(response.data.message);
            setStatus("success");
            setData(""); // Clear input after success
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setStatus("error");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulate Pointage</h2>
            <p className="text-gray-600 mb-6">Enter the Biometric string, QR Code string, or Barcode to clock in/out.</p>

            <form onSubmit={handleScan} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['BIOMETRIC', 'QR_CODE', 'BARCODE'].map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMethod(m)}
                                className={`py-2 text-sm font-semibold rounded-lg border ${method === m
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data / ID String</label>
                    <input
                        type="text"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder={method === 'BIOMETRIC' ? 'e.g. BIO-john' : method === 'QR_CODE' ? 'e.g. QR-john' : 'e.g. BAR-john'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Hint: Use "BIO-username", "QR-username", or "BAR-username" as set during signup.</p>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition shadow-lg">
                    SCAN NOW
                </button>
            </form>

            {message && (
                <div className={`mt-6 p-4 rounded-lg text-center font-medium ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ScanAttendance;
