import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StudentNew from "../views/StudentNew.vue";
import StudentEdit from "../views/StudentEdit.vue";
import StudentView from "../views/StudentView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/createStudent",
    name: "createStudent",
    component: StudentNew,
  },
  {
    path: "/editStudent/:id",
    name: "editStudent",
    component: StudentEdit,
  },
  {
    path: "/viewStudent/:id",
    name: "viewStudent",
    component: StudentView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
