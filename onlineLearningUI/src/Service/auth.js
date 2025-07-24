import toast from "react-hot-toast"
import api from "../api"


export const login = async (idNo, password) => {

    const route = localStorage.getItem("role")

    try {
        const res = await api.post(`${route}/login`, { idNo, password })
        toast.success("You are logged in!");

        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

        return res.data
    }
    catch (error) {
        toast.error("Invalid userName or Password");
        return null;
    }

}

export const register = async (userData) => {

    const route = localStorage.getItem("role")
    if (!route) {
        toast.error("No role found in localStorage.");
        return null;
    }
    try {
        console.log("In the inner route");
        console.log(userData);

        const res = await api.post(`${route}/register`, userData)
        console.log("Done");

        if (res.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
        }
        if (res.data?.refreshToken) {
            localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        return res.data

    } catch (error) {
        const messages = error?.response?.data;
        if (messages && typeof messages === "object") {
            // Multiple field errors — loop and show each
            Object.values(messages).forEach(msg => toast.error(msg));
        } else {
            // Single fallback message
            toast.error(error?.response?.data?.message || "Registration failed");
        }
        return null; // Important: ensure it returns something
    }
}

export const logout = async () => {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("role")
}