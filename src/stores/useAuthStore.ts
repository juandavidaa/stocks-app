import { defineStore } from "pinia";
import axios from "axios";

const authApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
});

interface LoginResponse {
	jwt: string;
	exp: number;
	jwt_type: string;
}

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("jwt") || "",
	}),
	actions: {
		async login() {
			if (this.token) return;
			const email = import.meta.env.VITE_LOGIN_EMAIL;
			const password = import.meta.env.VITE_LOGIN_PASSWORD;

			const { data } = await authApi.post<LoginResponse>("/users/login", {
				email,
				password,
			});

			this.token = data.jwt;
			localStorage.setItem("jwt", this.token);
		},
	},
});
