import Swal from "sweetalert2";
import axios from "axios";

export function showAlert(title, icon, focus = "") {
  if (focus !== "") {
    {
      document.getElementById(focus).focus();
    }
  }

  Swal.fire({
    title: title,
    icon: icon,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoomIn" },
    buttonsStyling: false,
  });
}

export function confirm(url, id, title, message, icon = "question") {
  let urlWithId = url + id;
  const swalWithBootstrapButton = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
  });

  swalWithBootstrapButton
    .fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButton: '<i class="fa-solid fa-check"></i> Yes, delete!',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
    })
    .then((res) => {
      if (res.isConfirmed) {
        sendRequest("DELETE", { id: id }, urlWithId, "Deleted successfully!");
      } else {
        showAlert("Operation cancelled", "info");
      }
    });
}

export function sendRequest(method, params, url, successMessage) {
  return axios({ method: method, url: url, data: params })
    .then((response) => {
      if (response.status === 200) {
        showAlert(successMessage, "success");
        window.setTimeout(function () {
          window.location.href = "/";
        }, 2000);
        return response.data;
      } else {
        throw new Error("Could not retrieve response");
      }
    })
    .catch((error) => {
      let errorMessage = "Error saving student. Please try again.";
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      showAlert(errorMessage, "error");
      throw error;
    });
}
