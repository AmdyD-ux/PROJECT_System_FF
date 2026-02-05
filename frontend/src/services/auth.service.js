import api from "./api";

const AuthService = {
    login: async (username, password) => {
        const response = await api.post("auth/signin", {
            username,
            password,
        });
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("user");
    },

    register: (username, password, fullName, role) => {
        return api.post("auth/signup", {
            username,
            password,
            fullName,
            role,
        });
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("user"));
    },
};

export default AuthService;
