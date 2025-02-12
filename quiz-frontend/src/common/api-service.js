import { API_URL } from "@/common/config";
import tokenService from "@/common/token-service";
const ApiService = {
    async get(resource, token = true) {
        try {
            const response = await fetch(`${API_URL}/${resource}`, {
                headers: {
                    "Authorization": token ? `Bearer ${tokenService.getToken()}` : ""
                }
            });
            const responseData = await response.json();
            if (!response.ok) {
                const errorMessage = Array.isArray(responseData.message)
                    ? responseData.message.join(', ')
                    : responseData.message;
                throw new Error(errorMessage);
            }
            return {
                success: response.ok,
                data: responseData,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Something went wrong",
                status: 500
            };
        }
    },

    async post(resource, data, token = true) {
        try {
            const response = await fetch(`${API_URL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${tokenService.getToken()}` : ""
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (!response.ok) {
                const errorMessage = Array.isArray(responseData.message)
                    ? responseData.message.join(', ')
                    : responseData.message;
                throw new Error(errorMessage);
            }
            return {
                success: response.ok,
                data: responseData,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Something went wrong",
                status: 500
            };
        }
    }
};

const AuthService = {
    async login(email, password) {
        const result = await ApiService.post("auth/login", { email, password }, false);
        if (result.success) {
            tokenService.saveToken(result.data.token);
        }
        return result;
    },
    async register(email, password, firstName, lastName) {
        const result = await ApiService.post("auth/signup",
            { email, password, firstName, lastName },
            false
        );
        if (result.success) {
            tokenService.saveToken(result.data.token);
        }
        return result;
    },
    async validate() {
        const result = await ApiService.get("auth/validate");
        return result;
    },
    async logout() {
        tokenService.destroyToken();
    },
};
const UserService = {
    async getUsers() {
        const result = ApiService.get("user/users");
        return result;
    },
    async transferCoins(toEmail, amount) {
        return ApiService.post("user/transfer", { toEmail, amount }, true);
    }
};


export default {
    AuthService,
    UserService
};