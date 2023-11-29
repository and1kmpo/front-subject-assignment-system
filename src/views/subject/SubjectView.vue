<template>
  <div class="m-4">
    <div class="card col-8 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Subject details</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <table
          class="table table-bordered table-hover table-bordered border-success"
        >
          <tbody>
            <tr>
              <th scope="row" class="w-25">ID</th>
              <td>{{ id }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Name</th>
              <td>{{ name }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Description</th>
              <td>{{ description }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Credits</th>
              <td>{{ credits }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Knowledge Area</th>
              <td>{{ knowledge_area }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Elective</th>
              <td>{{ elective === "1" ? "S" : "N" }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Created at</th>
              <td>{{ created_at }}</td>
            </tr>
            <tr>
              <th scope="row" class="w-25">Updated at</th>
              <td>{{ updated_at }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-grid col-6 mx-auto mt-4">
          <router-link :to="{ name: 'HomeViewSubjects' }" class="btn btn-info">
            <i class="fa-solid fa-arrow-left"></i> Return subjects list
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      id: 0,
      name: "",
      description: "",
      credits: "",
      knowledge_area: "",
      elective: "",
      created_at: "",
      updated_at: "",
      url: "http://subjectassignmentsystem.test/api/subjects",
      loading: false,
      isMounted: ref(true), // Agrega la propiedad isMounted
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getSubject();
  },
  onUnmounted() {
    this.isMounted.value = false;
  },
  methods: {
    getSubject() {
      axios.get(this.url).then((res) => {
        if (this.isMounted.value) {
          this.name = res.data.data.name;
          this.description = res.data.data.description;
          this.credits = res.data.data.credits;
          this.knowledge_area = res.data.data.knowledge_area;
          this.elective = res.data.data.elective;
          this.created_at = res.data.data.created_at;
          this.updated_at = res.data.data.updated_at;
        }
      });
    },
    deleteRecord(id, name) {
      confirm(
        "http://subjectassignmentsystem.test/api/subjects/",
        id,
        "Delete record",
        "Are you sure you want to delete to " + name + " ?"
      ).then((result) => {
        if (!result.canceled && this.isMounted.value) {
          this.loading = false;
        }
      });
    },
  },
};
</script>
