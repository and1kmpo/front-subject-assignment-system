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

  return swalWithBootstrapButton
    .fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-check"></i> Yes, delete!',
      cancelButtonText: '<i class="fa fa-ban"></i> Cancel',
      confirmButtonIcon: "fa-check",
      cancelButtonIcon: "fa-ban",
    })
    .then((res) => {
      if (res.isConfirmed) {
        return sendRequest(
          "DELETE",
          { id: id },
          urlWithId,
          "Deleted successfully!"
        );
      } else {
        showAlert("Operation cancelled", "info");
        setTimeout(() => {
          swalWithBootstrapButton.close();
        }, 1000);
        return Promise.reject(new Error("Operation cancelled"));
      }
    });
}

export function sendRequest(method, params, url, successMessage, redirectPath) {
  return axios({ method: method, url: url, data: params })
    .then((response) => {
      if (response.status === 200) {
        showAlert(successMessage, "success");
        window.setTimeout(function () {
          if (redirectPath) {
            window.location.href = redirectPath;
          } else {
            window.location.href = "/";
          }
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
