import { createRouter, createWebHistory } from "vue-router";
/* Students */
import HomeView from "../views/student/HomeView.vue";
import StudentNew from "../views/student/StudentNew.vue";
import StudentEdit from "../views/student/StudentEdit.vue";
import StudentView from "../views/student/StudentView.vue";
/* Progfessors */
import HomeViewProfessors from "../views/professor/HomeView.vue";
import ProfessorNew from "../views/professor/ProfessorNew.vue";
import ProfessorEdit from "../views/professor/ProfessorEdit.vue";
import ProfessorView from "../views/professor/ProfessorView.vue";
/* Subjects */
import HomeViewSubjects from "../views/subject/HomeView.vue";
import SubjectNew from "../views/subject/SubjectEdit.vue";
import SubjectEdit from "../views/subject/SubjectEdit.vue";
import SubjectView from "../views/subject/SubjectView.vue";
/* Programs */
import HomeViewPrograms from "../views/program/HomeView.vue";
import ProgramNew from "../views/program/ProgramNew.vue";
import ProgramEdit from "../views/program/ProgramEdit.vue";
import ProgramView from "../views/program/ProgramView.vue";
/* Assignment subject */
import AssignmentSubjectProfessor from "../views/professor_subject/AssignmentSubjectProfessor.vue";
import AssignmentSubjectStudent from "../views/student_subject_professor/AssignmentSubjectStudent.vue";

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
  /* Programs */
  {
    path: "/program/HomeView",
    name: "HomeViewPrograms",
    component: HomeViewPrograms,
  },
  {
    path: "/program/ProgramNew",
    name: "ProgramNew",
    component: ProgramNew,
  },
  {
    path: "/program/ProgramEdit/:id",
    name: "ProgramEdit",
    component: ProgramEdit,
  },
  {
    path: "/program/ProgramView/:id",
    name: "ProgramView",
    component: ProgramView,
  },
  /* Assignment subject to professor */
  {
    path: "/professor_subject/AssignmentSubjectProfessor",
    name: "AssignmentSubject",
    component: AssignmentSubjectProfessor,
  },
  /* Assignment subject to student */
  {
    path: "/student_subject_professor/AssignmentSubjectStudent",
    name: "AssignmentSubjectStudent",
    component: AssignmentSubjectStudent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
