<template>
  <div class="row text-center d-flex justify-content-center mt-3">
    <h1>Subjects list</h1>
    <div class="col-lg-10">
      <div class="table-responsive">
        <table
          class="table table-success table-hover align-middle table-bordered"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Credits</th>
              <th scope="col">Knowledge area</th>
              <th scope="col">Elective</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="content">
            <tr v-if="loading">
              <td colspan="7">
                <h3>Loading...</h3>
              </td>
            </tr>
            <tr v-else v-for="(subject, i) in subjects" :key="subject.id">
              <td v-text="i + 1"></td>
              <td v-text="subject.name"></td>
              <td v-text="subject.credits"></td>
              <td v-text="subject.knowledge_area"></td>
              <td>{{ subject.elective === 0 ? "N" : "S" }}</td>
              <td>
                <router-link
                  :to="{ name: 'SubjectView', params: { id: subject.id } }"
                  class="btn btn-info"
                >
                  <i class="fa-solid fa-eye"></i>
                </router-link>

                &nbsp;
                <router-link
                  :to="{ name: 'SubjectEdit', params: { id: subject.id } }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>

                &nbsp;
                <button
                  :to="{ path: 'delete/' + subject.id }"
                  class="btn btn-danger"
                  v-on:click="deleteRecord(subject.id, subject.name)"
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
      subjects: null,
      loading: false,
    };
  },
  mounted() {
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      this.loading = true;
      axios
        .get("http://subjectassignmentsystem.test/api/subjects")
        .then((res) => {
          this.subjects = res.data;
          this.loading = false;
        });
    },
    deleteRecord(id, name) {
      confirm(
        "http://subjectassignmentsystem.test/api/subjects/",
        id,
        "Delete record",
        "Are you sure you want to delete to " + name + " ?"
      );
      this.loading = false;
    },
  },
};
</script>
