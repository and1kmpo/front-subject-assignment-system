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
                <i class="fa-solid fa-user"></i>
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
                <i class="fa-solid fa-user"></i>
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
                <i class="fa-solid fa-id-card"></i>
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
                <i class="fa-solid fa-phone"></i>
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
                <i class="fa-solid fa-phone"></i>
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
        first_name: this.first_name,
        last_name: this.last_name,
        document: this.document,
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        picture: this.picture,
      };

      sendRequest("PUT", params, this.url, "Professor updated!")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error saving professor:", error);
          let errorMessage = "Error updating professor. Please try again.";

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

      if (!this.first_name.trim()) {
        validationErrors.push("Enter a name");
      }
      if (!this.last_name.trim()) {
        validationErrors.push("Enter a last name");
      }
      if (!this.document.trim()) {
        validationErrors.push("Enter a document");
      }
      if (!this.address.trim()) {
        validationErrors.push("Enter an address");
      }
      if (!this.city.trim()) {
        validationErrors.push("Enter a city");
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!this.phone || !phoneRegex.test(this.phone)) {
        showAlert("Enter a valid 10-digit phone number", "warning", "phone");
        validationErrors.push("Enter a valid 10-digit phone number");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim() || !emailRegex.test(this.email)) {
        validationErrors.push("Enter a valid email address");
      }

      return validationErrors;
    },
    previewPicture(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        let myPicture = document.getElementById("pictureImg");
        myPicture.src = reader.result;
        this.picture = myPicture.src;
      };
    },
  },
};
</script>
