import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Bootstrap Stylesheets importieren
import "bootstrap/dist/css/bootstrap.css";

// App erstellen, Router hinzufügen und einbinden
createApp(App).use(router).mount("#app");