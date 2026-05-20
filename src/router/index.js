import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:alpha3Code?",
    name: "details",
    component: () => import("../components/CountryDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;