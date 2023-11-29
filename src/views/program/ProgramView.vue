<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Programs details</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <div class="mb-3">
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-user"></i>
            </span>
            <label class="form-control" v-text="name"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-user"></i>
            </span>
            <label class="form-control" v-text="description"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-calendar-days me-2"></i> Created At:
            </span>
            <label class="form-control" v-text="formattedCreatedAt"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-clock-rotate-left me-2"></i> Updated At:
            </span>
            <label class="form-control" v-text="formattedUpdatedAt"></label>
          </div>

          <div class="d-grid col-6 mx-auto mt-4">
            <router-link
              :to="{ name: 'HomeViewPrograms' }"
              class="btn btn-info"
            >
              <i class="fa-solid fa-arrow-left"></i> Return programs list
            </router-link>
          </div>
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
      created_at: "",
      updated_at: "",
      url: "http://subjectassignmentsystem.test/api/programs",
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
        this.id = res.data.data.id;
        this.name = res.data.data.name;
        this.description = res.data.data.description;
        this.created_at = res.data.data.created_at;
        this.updated_at = res.data.data.updated_at;
      });
    },
    formatDate(date) {
      try {
        return dayjs(date).format("LLL"); // 'LLL' es el formato localizado que incluye día, mes, año, hora, minuto y am/pm
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
      }
    },
  },
};
</script>
