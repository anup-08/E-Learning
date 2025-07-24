import axios from "axios";
import config from "./Config/config";
import toast from "react-hot-toast";


const api = axios.create({
    baseURL: config.apiUrl
})

//Adding JWT token
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});



// Response: auto-refresh on 401
api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config

        const currentPath = window.location.pathname;
        const isOnLoginPage = ["/login", "/signup", "/getoption"].includes(currentPath);

        if (error.response?.status === 401 && !originalRequest._retry && !isOnLoginPage) {
            originalRequest._retry = true;

            try {

                const res = await axios.post(`${config.apiUrl}${localStorage.getItem("role")}/getToken`, { refreshToken: localStorage.getItem("refreshToken") }, { withCredentials: true })
               
                const newToken = res.data.accessToken;
                localStorage.setItem('accessToken', newToken)


                if (!originalRequest.headers) {
                    originalRequest.headers = {};

                }

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest)

            } catch (refreshError) {
                toast.error("Token Refresh failed..!")
                localStorage.removeItem('accessToken')
                localStorage.removeItem("refreshToken");
                // window.location.href = `/getoption`
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api