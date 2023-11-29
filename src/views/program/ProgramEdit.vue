<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Edit program</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <form v-on:submit="update">
          <div class="mb-3">
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Subject"
                v-model="name"
                maxlength="60"
                id="first_name"
                required
              />
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Description"
                v-model="description"
                maxlength="800"
                id="description"
                required
                style="min-height: 100px"
              ></textarea>
              <label for="floatingTextarea">Description</label>
            </div>
          </div>
          <div class="text-center">
            <button @click.prevent="update" class="btn btn-info">
              <i class="fa-solid fa-arrows-rotate"></i> Update
            </button>
            <router-link
              :to="{ name: 'HomeViewProfessors' }"
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
      url: "http://subjectassignmentsystem.test/api/programs",
      loading: false,
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getPrograms();
  },
  methods: {
    getPrograms() {
      axios.get(this.url).then((res) => {
        this.name = res.data.data.name;
        this.description = res.data.data.description;
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
      };

      sendRequest(
        "PUT",
        params,
        this.url,
        "Program updated!",
        "/program/HomeView"
      )
        .then((response) => {
          console.log(response);
          this.$router.push("/program/HomeView");
        })
        .catch((error) => {
          console.error("Error saving program:", error);
          let errorMessage = "Error updating program. Please try again.";

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
      return validationErrors;
    },
  },
};
</script>
