<template>
  <div class="container mt-4 text-center">
    <h2 class="mb-4">Assign Subjects to Professor</h2>

    <div class="row">
      <!-- Formulario de asignación -->
      <div class="col-md-6">
        <form @submit.prevent="assignSubjects">
          <div class="mb-3">
            <label for="professor" class="form-label">Professor:</label>
            <select
              v-model="selectedProfessor"
              class="form-select"
              id="professor"
              @change="getAssignedSubjects"
            >
              <option
                v-for="professor in professors"
                :key="professor.id"
                :value="professor.id"
              >
                {{ professor.first_name }} {{ professor.last_name }} - ID:
                {{ professor.id }}
              </option>
            </select>
          </div>

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
      professors: [],
      subjects: [],
      selectedProfessor: null,
      selectedSubjects: [],
      assignedSubjects: [],
    };
  },
  mounted() {
    this.getProfessors();
    this.getSubjects();
  },
  methods: {
    getProfessors() {
      axios
        .get("http://subjectassignmentsystem.test/api/professors")
        .then((res) => {
          this.professors = res.data;
        })
        .catch((error) => {
          showAlert("Error fetching the list of professors.", "error");
          console.error("Error fetching the list of professors:", error);
        });
    },
    getSubjects() {
      axios
        .get("http://subjectassignmentsystem.test/api/subjects")
        .then((res) => {
          this.subjects = res.data;
        })
        .catch((error) => {
          showAlert("Error fetching the list of subjects.", "error");
          console.error("Error fetching the list of subjects:", error);
        });
    },
    getAssignedSubjects() {
      if (this.selectedProfessor) {
        axios
          .get(
            `http://subjectassignmentsystem.test/api/professors/${this.selectedProfessor}/assigned-subjects`
          )
          .then((response) => {
            this.assignedSubjects = response.data;
          })
          .catch((error) => {
            console.error("Error fetching assigned subjects:", error);
          });
      }
    },
    getSubjectsWithProfessors() {
      axios
        .get("http://subjectassignmentsystem.test/api/subjects-with-professors")
        .then((res) => {
          this.subjects = res.data;
        })
        .catch((error) => {
          showAlert("Error fetching the list of subjects", "error");
          console.log("Error fetching the list of subjects", error);
        });
    },
    assignSubjects() {
      if (!this.selectedProfessor) {
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
          `http://subjectassignmentsystem.test/api/professors/${this.selectedProfessor}/assign-subjects`,
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
      // Lógica para desasignar materia al profesor
      axios
        .delete(
          `http://subjectassignmentsystem.test/api/professors/${this.selectedProfessor}/subjects/${subjectId}/unassign`
        )
        .then((response) => {
          // Actualizar la lista de materias asignadas después de desasignar
          this.getAssignedSubjects();
        })
        .catch((error) => {
          console.error("Error unassigning subject:", error);
        });
    },
  },
};
</script>
