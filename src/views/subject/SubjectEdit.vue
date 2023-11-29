<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Edit subject</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <form v-on:submit="update">
          <div class="mb-3">
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-user me-2"></i>
                Subject
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="name"
                maxlength="60"
                id="name"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-user me-2"></i>
                Descr
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                v-model="description"
                maxlength="300"
                id="description"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-id-card me-2"></i>
                Credits
              </span>
              <input
                type="number"
                class="form-control"
                placeholder="credits"
                v-model="credits"
                min="1"
                max="30"
                maxlength="10"
                id="last_name"
                credits
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-phone me-2"></i>
                Knowledge area
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="knowledge area"
                v-model="knowledge_area"
                maxlength="30"
                id="knowledge_area"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-phone me-2"></i>
                Elective
              </span>
              <select v-model="elective" class="form-select" id="elective">
                <option value="1">S</option>
                <option value="0">N</option>
              </select>
            </div>
          </div>
          <div class="text-center">
            <button @click.prevent="update" class="btn btn-info">
              <i class="fa-solid fa-arrows-rotate"></i> Update
            </button>
            <router-link
              :to="{ name: 'HomeViewSubjects' }"
              class="btn btn-danger ms-2"
            >
              <i class="fa-regular fa-circle-xmark"></i> Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { showAlert, sendRequest } from "../../functions";
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
      url: "http://subjectassignmentsystem.test/api/subjects",
      loading: false,
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      axios.get(this.url).then((res) => {
        this.name = res.data.data.name;
        this.description = res.data.data.description;
        this.credits = res.data.data.credits;
        this.knowledge_area = res.data.data.knowledge_area;
        this.elective = res.data.data.elective;
      });
    },
    update() {
      const validationErrors = this.validateForm();

      if (validationErrors.length > 0) {
        showAlert(validationErrors.join("\n"), "warning");
        return;
      }

      this.loading = true;
      const params = {
        name: this.name,
        description: this.description,
        credits: this.credits,
        knowledge_area: this.knowledge_area,
        elective: this.elective,
      };

      sendRequest(
        "PUT",
        params,
        this.url,
        "Subject updated!",
        "/subject/HomeView"
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error saving subject:", error);
          let errorMessage = "Error updating subject. Please try again.";

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            errorMessage = error.response.data.message;
          }

          showAlert(errorMessage, "error");
        });
    },
    validateForm() {
      const validationErrors = [];

      if (!this.name.trim()) {
        validationErrors.push("Enter a name");
      }
      if (!this.description.trim()) {
        validationErrors.push("Enter a description");
      }
      if (!this.credits) {
        validationErrors.push("Enter the number of credits");
      }
      if (!this.knowledge_area.trim()) {
        validationErrors.push("Enter a knowledge area");
      }

      return validationErrors;
    },
  },
};
</script>
