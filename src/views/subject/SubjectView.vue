<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Subject details</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>ID:</strong> <span v-text="id"></span>
          </li>
          <li class="list-group-item">
            <strong>Name:</strong> <span v-text="name"></span>
          </li>
          <li class="list-group-item">
            <strong>Description:</strong> <span v-text="description"></span>
          </li>
          <li class="list-group-item">
            <strong>Credits:</strong> <span v-text="credits"></span>
          </li>
          <li class="list-group-item">
            <strong>Knowledge Area:</strong>
            <span v-text="knowledge_area"></span>
          </li>
          <li class="list-group-item">
            <strong>Elective:</strong>
            <span v-text="elective === 1 ? 'S' : 'N'"></span>
          </li>
          <li class="list-group-item">
            <strong>Created At:</strong>
            <span v-text="formattedCreatedAt"></span>
          </li>
          <li class="list-group-item">
            <strong>Updated At:</strong>
            <span v-text="formattedUpdatedAt"></span>
          </li>
        </ul>

        <div class="d-grid col-6 mx-auto mt-4">
          <router-link :to="{ name: 'HomeViewPrograms' }" class="btn btn-info">
            <i class="fa-solid fa-arrow-left"></i> Return programs list
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

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
    };
  },
  computed: {
    formattedCreatedAt() {
      return this.created_at ? this.formatDate(this.created_at) : "N/A";
    },
    formattedUpdatedAt() {
      return this.updated_at ? this.formatDate(this.updated_at) : "N/A";
    },
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getProfessor();
  },
  methods: {
    getProfessor() {
      axios.get(this.url).then((res) => {
        console.log(res);
        this.id = res.data.data.id;
        this.name = res.data.data.name;
        this.description = res.data.data.description;
        this.credits = res.data.data.credits;
        this.knowledge_area = res.data.data.knowledge_area;
        this.elective = res.data.data.elective;
        this.created_at = res.data.data.created_at;
        this.updated_at = res.data.data.updated_at;
      });
    },
    formatDate(date) {
      try {
        return dayjs(date).format("LLL");
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
      }
    },
  },
};
</script>
