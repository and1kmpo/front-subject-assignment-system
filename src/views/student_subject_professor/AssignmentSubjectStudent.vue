<template>
  <div class="container mt-4 text-center">
    <h2 class="mb-4">Assign Subjects to Student</h2>

    <div class="row">
      <!-- Formulario de asignación -->
      <div class="col-md-6">
        <form @submit.prevent="assignSubjects">
          <div class="container">
            <div class="mb-3 input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <div class="form-floating">
                <input
                  v-model="searchQuery"
                  @input="searchStudents"
                  type="text"
                  id="floatingInput"
                  placeholder=" "
                  class="form-control"
                />
                <label for="floatingInput">Search a student</label>
              </div>
            </div>

            <select
              v-model="selectedStudent"
              class="form-select mt-3"
              size="5"
              @change="getAssignedSubjects"
            >
              <option
                v-for="student in filteredStudents"
                :key="student.id"
                :value="student.id"
              >
                {{ student.first_name }} {{ student.last_name }} - DOC:
                {{ student.document }} - ID: {{ student.id }}
              </option>
            </select>

            <div class="mb-3">
              <label for="subjects" class="form-label">Subjects:</label>
              <select
                v-model="selectedSubjects"
                class="form-select"
                id="subjects"
                multiple
              >
                <option
                  v-for="subject in subjects"
                  :key="subject.id"
                  :value="subject.id"
                >
                  {{ subject.name }}
                </option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Assign Subjects</button>
        </form>
      </div>
      <!-- Lista de materias asignadas -->
      <div class="col-md-6">
        <h4>Assigned Subjects</h4>
        <ul v-if="assignedSubjects.length" class="list-group">
          <li
            v-for="subject in assignedSubjects"
            :key="subject.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ subject.name }}
            <button
              @click="unassignSubject(subject.id)"
              class="btn btn-sm btn-danger"
            >
              Unassign
            </button>
          </li>
        </ul>
        <div v-else class="alert alert-info">No subjects assigned.</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showAlert } from "../../functions";

export default {
  data() {
    return {
      students: [],
      subjects: [],
      selectedStudent: null,
      selectedSubjects: [],
      assignedSubjects: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.getStudents();
    this.getSubjects();
  },
  methods: {
    getStudents() {
      axios
        .get("http://subjectassignmentsystem.test/api/students")
        .then((res) => {
          this.students = res.data;
        })
        .catch((error) => {
          showAlert("Error fetching the list of students.", "error");
          console.error("Error fetching the list of students:", error);
        });
    },

    getSubjects() {
      axios
        .get("http://subjectassignmentsystem.test/api/subjects-with-professors")
        .then((res) => {
          this.subjects = res.data;
        })
        .catch((error) => {
          showAlert("Error fetching the list of subjects.", "error");
          console.error("Error fetching the list of subjects:", error);
        });
    },

    assignSubjects() {
      if (!this.selectedStudent) {
        showAlert("Select a professor first.", "warning");
        return;
      }

      if (this.selectedSubjects.length === 0) {
        showAlert("Select at least one subject.", "warning");
        return;
      }

      const data = {
        subjects: this.selectedSubjects,
      };

      axios
        .post(
          `http://subjectassignmentsystem.test/api/students/${this.selectedStudent}/assign-subjects`,
          data
        )
        .then((response) => {
          console.log(response.data);
          showAlert("Subjects assigned successfully!", "success");
          this.getAssignedSubjects();
          this.selectedSubjects = [];
        })
        .catch((error) => {
          console.error("Error assigning subjects:", error);
          showAlert("Error assigning subjects. Please try again.", "error");
        });
    },

    unassignSubject(subjectId) {
      // Lógica para desasignar materia al estudiante
      axios
        .post(
          `http://subjectassignmentsystem.test/api/students/${this.selectedStudent}/unassign-subjects`,
          { subjects: [subjectId] } // Pasar el ID de la asignatura que se desea desasignar
        )
        .then((response) => {
          // Actualizar la lista de materias asignadas después de desasignar
          this.getAssignedSubjects();
          showAlert("Subject unassigned successfully!", "success");
        })
        .catch((error) => {
          console.error("Error unassigning subject:", error);
          showAlert("Error unassigning subject. Please try again.", "error");
        });
    },

    getAssignedSubjects() {
      if (this.selectedStudent) {
        axios
          .get(
            `http://subjectassignmentsystem.test/api/students/${this.selectedStudent}/assigned-subjects`
          )
          .then((response) => {
            this.assignedSubjects = response.data;
          })
          .catch((error) => {
            console.error("Error fetching assigned subjects:", error);
          });
      }
    },

    searchStudents() {
      // Filtrar estudiantes según la consulta de búsqueda
      this.filteredStudents = this.students.filter((student) => {
        const fullName =
          `${student.first_name} ${student.last_name}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
      // Obtener asignaturas al seleccionar un estudiante
      this.getAssignedSubjects();
    },
  },
  computed: {
    filteredStudents() {
      // Computed property para manejar el filtrado de estudiantes
      return this.students.filter((student) => {
        const fullName =
          `${student.first_name} ${student.last_name}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>
