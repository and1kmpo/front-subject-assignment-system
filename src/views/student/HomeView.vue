<template>
  <div class="row text-center d-flex justify-content-center mt-3">
    <h1>Students list</h1>
    <div class="col-lg-10">
      <div class="table-responsive">
        <table
          class="table table-success table-hover align-middle table-bordered"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Last name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="content">
            <tr v-if="loading">
              <td colspan="7">
                <h3>Loading...</h3>
              </td>
            </tr>
            <tr v-else v-for="(student, i) in students" :key="student.id">
              <td v-text="i + 1"></td>
              <td v-text="student.document"></td>
              <td>
                <img
                  v-if="student.picture"
                  :src="student.picture"
                  alt="Profile picture"
                  style="width: 50px !important"
                  class="img-thumbnail"
                />
                <img
                  v-else="student.picture"
                  src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png"
                  alt="Profile picture"
                  style="width: 50px !important"
                  class="img-thumbnail"
                />
              </td>
              <td v-text="student.first_name"></td>
              <td v-text="student.last_name"></td>
              <td>
                <router-link
                  :to="{ path: 'student/viewStudent/' + student.id }"
                  class="btn btn-info"
                >
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <router-link
                  :to="{ path: 'student/editStudent/' + student.id }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button
                  :to="{ path: 'delete/' + student.id }"
                  class="btn btn-danger"
                  v-on:click="
                    deleteRecord(
                      student.id,
                      student.first_name + ' ' + student.last_name
                    )
                  "
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { confirm, showAlert } from "../../functions";

export default {
  data() {
    return {
      students: null,
      loading: false,
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.loading = true;
      axios
        .get("http://subjectassignmentsystem.test/api/students")
        .then((res) => {
          this.students = res.data;
          this.loading = false;
        })
        .catch((error) => {
          // Manejar errores de la solicitud, si es necesario
          console.error("Error fetching students:", error);
          this.loading = false;
        });
    },
    deleteRecord(id, name) {
      confirm(
        "http://subjectassignmentsystem.test/api/students/",
        id,
        "Delete record",
        "Are you sure you want to delete " + name + " ?"
      )
        .then((result) => {
          if (!result.canceled) {
            // La operación no fue cancelada
            // Puedes hacer algo adicional si es necesario
            this.getStudents(); // Actualizar la lista después de eliminar
          } else {
            // La operación fue cancelada
            showAlert("Delete operation cancelled", "info");
          }
        })
        .catch((error) => {
          // Manejar otros errores si es necesario
          console.error("Error confirming delete:", error);
        });
    },
  },
};
</script>
