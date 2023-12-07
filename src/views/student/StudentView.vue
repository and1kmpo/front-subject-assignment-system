<template>
  <div class="m-4">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-header bg-dark text-white text-center">
        <h4>Student Details</h4>
      </div>
      <div class="card-body bg-body-secondary">
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

        <ul class="list-group list-group-flush">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>First Name</strong>
            <span v-text="first_name"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Last Name</strong>
            <span v-text="last_name"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Document</strong>
            <span v-text="document"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Phone</strong>
            <span v-text="phone"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Email</strong>
            <span v-text="email"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Address</strong>
            <span v-text="address"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>City</strong>
            <span v-text="city"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Program</strong>
            <span v-text="selectedProgram"></span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>Semester</strong>
            <span v-text="selectedSemester"></span>
          </li>
        </ul>

        <div class="d-grid col-6 mx-auto mt-4">
          <router-link :to="{ name: 'Home' }" class="btn btn-info">
            <i class="fa-solid fa-arrow-left"></i> Return to Student List
          </router-link>
        </div>
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
      programs: {},
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

      sendRequest("PUT", params, this.url, "Student updated!")
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
      if (!this.address.trim()) {
        validationErrors.push("Enter an address");
      }
      if (!this.city.trim()) {
        validationErrors.push("Enter a city");
      }
      if (!this.selectedProgram) {
        validationErrors.push("Select a program");
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
