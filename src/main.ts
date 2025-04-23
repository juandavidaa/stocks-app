import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";

async function bootstrap() {
    const app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
    
    const auth = useAuthStore();
    await auth.login();

    app.mount("#app");
}
bootstrap();

