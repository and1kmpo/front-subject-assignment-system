<template>
  <div class="m-4">
    <div class="card col-6 mx-auto">
      <div class="card-header bg-dark text-white text-center">
        <h4>Professor details</h4>
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

        <div class="mb-3">
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-user"></i>
            </span>
            <label class="form-control" v-text="first_name"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-user"></i>
            </span>
            <label class="form-control" v-text="last_name"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-id-card"></i>
            </span>
            <label class="form-control" v-text="document"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-phone"></i>
            </span>
            <label class="form-control" v-text="phone"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-at"></i>
            </span>
            <label class="form-control" v-text="email"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-home"></i>
            </span>
            <label class="form-control" v-text="address"></label>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">
              <i class="fa-solid fa-city"></i>
            </span>
            <label class="form-control" v-text="city"></label>
          </div>
          <div class="d-grid col-6 mx-auto mt-4">
            <router-link
              :to="{ name: 'HomeViewProfessors' }"
              class="btn btn-info"
            >
              <i class="fa-solid fa-arrow-left"></i> Return professor list
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
      url: "http://subjectassignmentsystem.test/api/professors",
      loading: false,
    };
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
        this.first_name = res.data.data.first_name;
        this.last_name = res.data.data.last_name;
        this.document = res.data.data.document;
        this.phone = res.data.data.phone;
        this.email = res.data.data.email;
        this.address = res.data.data.address;
        this.city = res.data.data.city;
        this.picture = res.data.data.picture;
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
