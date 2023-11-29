<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Edit student</h4>
      </div>
      <div class="card-body bg-body-secondary">
        <form v-on:submit="update">
          <div class="row mb-3">
            <div class="col-6 mx-auto text-center">
              <img
                v-if="picture"
                height="100"
                :src="picture"
                class="img-thumbnail"
                id="pictureImg"
                alt="Profile picture"
              />
              <img
                v-else
                height="100"
                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png"
                id="pictureImg"
                class="img-thumbnail"
                alt="Profile picture"
              />
            </div>
          </div>

          <div class="mb-3">
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="first_name"
                maxlength="60"
                id="first_name"
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
                v-model="last_name"
                maxlength="60"
                id="last_name"
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
                placeholder="Document ID"
                v-model="document"
                maxlength="60"
                id="last_name"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-phone"></i>
              </span>
              <input
                type="number"
                class="form-control"
                placeholder="Phone Number"
                v-model="phone"
                maxlength="20"
                id="phone"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-at"></i>
              </span>
              <input
                type="email"
                class="form-control"
                placeholder="Email address"
                v-model="email"
                maxlength="70"
                id="email"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-home"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                v-model="address"
                maxlength="70"
                id="address"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-city"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="City"
                v-model="city"
                maxlength="70"
                id="city"
                required
              />
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">
                <i class="fa-solid fa-camera"></i>
              </span>
              <input
                type="file"
                class="form-control"
                accept="image/jpeg, image/png, image/jpg"
                v-on:change="previewPicture"
                required
              />
            </div>
            <div class="input-group mb-2">
              <label class="input-group-text" for="program">
                <i class="fa-solid fa-building-columns"></i>
              </label>
              <select
                class="form-select"
                v-model="selectedProgram"
                id="program"
                required
              >
                <option value="" disabled>Select a program</option>
                <option
                  v-for="program in programs"
                  :key="program.id"
                  :value="program.id"
                >
                  {{ program.name }}
                </option>
              </select>
            </div>
            <div class="input-group mb-2">
              <label class="input-group-text" for="semester">
                <i class="fa-solid fa-building-columns"></i>
              </label>
              <select
                class="form-select"
                v-model="selectedSemester"
                id="semester"
                required
              >
                <option value="" disabled>Select a semester</option>
                <option
                  v-for="semesterOption in semesters"
                  :key="semesterOption"
                  :value="semesterOption"
                >
                  {{ semesterOption }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-center">
            <button @click.prevent="update" class="btn btn-info">
              <i class="fa-solid fa-arrows-rotate"></i> Update
            </button>
            <router-link :to="{ path: '/' }" class="btn btn-danger ms-2">
              <i class="fa-regular fa-circle-xmark"></i>
              Cancel
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
      first_name: "",
      last_name: "",
      document: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      picture: "",
      programs: [],
      selectedProgram: "",
      selectedSemester: "",
      semesters: Array.from({ length: 10 }, (_, index) => index + 1),
      url: "http://subjectassignmentsystem.test/api/students",
      loading: false,
    };
  },
  mounted() {
    this.fetchPrograms();

    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getStudent();
  },
  methods: {
    getStudent() {
      axios.get(this.url).then((res) => {
        this.first_name = res.data.data.first_name;
        this.last_name = res.data.data.last_name;
        this.document = res.data.data.document;
        this.phone = res.data.data.phone;
        this.email = res.data.data.email;
        this.address = res.data.data.address;
        this.city = res.data.data.city;
        this.picture = res.data.data.picture;
        this.selectedProgram = res.data.data.program_id;
        this.selectedSemester = res.data.data.semester;
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
        program_id: this.selectedProgram,
        semester: this.selectedSemester,
      };

      sendRequest("PUT", params, this.url, "Student updated!", "/")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error saving student:", error);
          let errorMessage = "Error updating student. Please try again.";

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
      if (!this.selectedProgram) {
        validationErrors.push("Select a program");
      }
      if (!this.selectedSemester) {
        validationErrors.push("Select a semester");
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

    fetchPrograms() {
      axios
        .get("http://subjectassignmentsystem.test/api/programs")
        .then((response) => {
          this.programs = response.data;
        })
        .catch((error) => {
          console.error("Error fetching programs:", error);
        });
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
