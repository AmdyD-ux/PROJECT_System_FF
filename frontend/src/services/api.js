// MOCK API IMPLEMENTATION FOR DEMO (Backend Unavailable)
import axios from "axios";

// Mock Data
const MOCK_USER = {
    id: 1,
    username: "jean",
    fullName: "Jean Dupont",
    roles: ["ROLE_AGENT"],
    token: "mock-jwt-token"
};

const MOCK_ADMIN = {
    id: 2,
    username: "admin",
    fullName: "Admin User",
    roles: ["ROLE_ADMIN"],
    token: "mock-admin-token"
};

// Simulate Async Delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
    create: () => api,
    interceptors: {
        request: { use: (fn) => fn({ headers: {} }) },
        response: { use: () => { } }
    },
    get: async (url) => {
        await delay(500);
        console.log(`[MOCK API] GET ${url}`);

        if (url.includes("dashboard/agent")) {
            return { data: { presentCount: 5, lateCount: 1, absentCount: 0, totalAgents: 1 } };
        }
        if (url.includes("dashboard")) {
            return { data: { presentCount: 12, lateCount: 3, absentCount: 2, totalAgents: 50 } };
        }
        return { data: {} };
    },

    post: async (url, body) => {
        await delay(800);
        console.log(`[MOCK API] POST ${url}`, body);

        if (url.includes("auth/signin")) {
            if (body.username === "admin") return { data: MOCK_ADMIN };
            if (body.username === "jean") return { data: MOCK_USER };
            // Default login success for demo
            return { data: { ...MOCK_USER, username: body.username } };
        }

        if (url.includes("auth/signup")) {
            return { data: { message: "User registered successfully!" } };
        }

        if (url.includes("attendance/scan")) {
            return { data: { message: `Attendance recorded: IN for ${body.data}` } };
        }

        return { data: {} };
    }
};

export default api;
