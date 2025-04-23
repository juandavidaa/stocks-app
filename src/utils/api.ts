import axios from "axios";

import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
	const auth = useAuthStore();
	if (auth.token) {
		config.headers.Authorization = `Bearer ${auth.token}`;
	}
	return config;
});
