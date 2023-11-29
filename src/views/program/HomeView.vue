<template>
  <div class="row text-center d-flex justify-content-center mt-3">
    <h1>Programs list</h1>
    <div class="col-lg-10">
      <div class="table-responsive">
        <table
          class="table table-success table-hover align-middle table-bordered"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="content">
            <tr v-if="loading">
              <td colspan="7">
                <h3>Loading...</h3>
              </td>
            </tr>
            <tr v-else v-for="(program, i) in programs" :key="program.id">
              <td v-text="i + 1"></td>
              <td v-text="program.id"></td>
              <td v-text="program.name"></td>
              <td class="col-4">
                <span
                  class="text-truncate d-inline-block w-100"
                  style="max-width: 400px"
                >
                  {{ program.description }}
                </span>
              </td>

              <td>
                <router-link
                  :to="{ name: 'ProgramView', params: { id: program.id } }"
                  class="btn btn-info"
                >
                  <i class="fa-solid fa-eye"></i>
                </router-link>

                &nbsp;
                <router-link
                  :to="{ name: 'ProgramEdit', params: { id: program.id } }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>

                &nbsp;
                <button
                  :to="{ path: 'delete/' + program.id }"
                  class="btn btn-danger"
                  v-on:click="deleteRecord(program.id, program.name)"
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
import { confirm } from "../../functions";

export default {
  data() {
    return {
      program: null,
      loading: false,
    };
  },
  mounted() {
    this.getPrograms();
  },
  methods: {
    getPrograms() {
      this.loading = true;
      axios
        .get("http://subjectassignmentsystem.test/api/programs")
        .then((res) => {
          this.programs = res.data;
          this.loading = false;
        });
    },
    deleteRecord(id, name) {
      confirm(
        "http://subjectassignmentsystem.test/api/programs/",
        id,
        "Delete record",
        "Are you sure you want to delete to " + name + " ?"
      )
        .then(() => {
          sendRequest("DELETE", { id: id }, urlWithId, "Deleted successfully!")
            .then(() => {
              showAlert("Program deleted successfully!", "success");
              this.getPrograms();
            })
            .catch((error) => {
              showAlert(error.message, "error");
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
