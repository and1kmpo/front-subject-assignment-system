import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/student/HomeView.vue";
import StudentNew from "../views/student/StudentNew.vue";
import StudentEdit from "../views/student/StudentEdit.vue";
import StudentView from "../views/student/StudentView.vue";
import HomeViewProfessors from "../views/professor/HomeView.vue";
import ProfessorNew from "../views/professor/ProfessorNew.vue";
import ProfessorEdit from "../views/professor/ProfessorEdit.vue";
import ProfessorView from "../views/professor/ProfessorView.vue";
import HomeViewSubjects from "../views/subject/HomeView.vue";
import SubjectNew from "../views/subject/SubjectEdit.vue";
import SubjectEdit from "../views/subject/SubjectEdit.vue";
import SubjectView from "../views/subject/SubjectView.vue";

const routes = [
  /* Students */
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/student/StudentNew",
    name: "StudentNew",
    component: StudentNew,
  },
  {
    path: "/student/editStudent/:id",
    name: "StudentEdit",
    component: StudentEdit,
  },
  {
    path: "/student/viewStudent/:id",
    name: "StudentView",
    component: StudentView,
  },

  /* Professors */
  {
    path: "/professor/HomeView",
    name: "HomeViewProfessors",
    component: HomeViewProfessors,
  },
  {
    path: "/professor/ProfessorNew",
    name: "ProfessorNew",
    component: ProfessorNew,
  },
  {
    path: "/professor/ProfessorEdit/:id",
    name: "ProfessorEdit",
    component: ProfessorEdit,
  },
  {
    path: "/professor/ProfessorView/:id",
    name: "ProfessorView",
    component: ProfessorView,
  },

  /* Subjects */
  {
    path: "/subject/HomeView",
    name: "HomeViewSubjects",
    component: HomeViewSubjects,
  },
  {
    path: "/subject/SubjectNew",
    name: "SubjectNew",
    component: SubjectNew,
  },
  {
    path: "/subject/SubjectEdit/:id",
    name: "SubjectEdit",
    component: SubjectEdit,
  },
  {
    path: "/subject/SubjectView/:id",
    name: "SubjectView",
    component: SubjectView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
