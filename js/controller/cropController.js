import { deleteCrop, getAllCrops, getCropById, saveCrop } from "../../model/crops.js";
import { getFieldCodes } from "../../model/field.js";

$(document).ready(function () {
  loadCards();
  });

  //GET ALL
function loadCards() {
  const container = $("#cardsContainer");
  console.log(typeof viewCropDetails);

  getAllCrops().then((result) => {
    console.log("crop controller eke load table ekata awa", result);
    container.empty();
    result.forEach((crop) => {
      console.log("Crop Code " + crop.cropCode);
      container.append(`
        <div class="col-md-4" style="width: 17rem;">
          <div class="card mb-3" data-id="${crop.cropCode}">
            <img src="data:image/jpeg;base64,${crop.cropImage}" class="card-img-top" alt="Crop Image" style="height: 150px; object-fit: cover;">
            <div class="card-content p-3">
              <h5 class="card-title">${crop.cropCommonName}</h5>
              <p class="card-text">Category: ${crop.category}</p>
              <p class="card-text">Season: ${crop.cropSeason}</p>
              <div class="card-actions">
                <button class="action-btn update btn btn-link p-0" title="Update" data-id="${crop.cropCode}">
                  <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                </button>
                <button class="action-btn delete btn btn-link p-0" title="Delete" data-id="${crop.cropCode}">
                  <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                </button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  });
}

//SAVE
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add-button");
  addButton.addEventListener("click", function () {
      const addCropModal = new bootstrap.Modal(document.getElementById("addCropModal"));
      addCropModal.show();

      getAllFieldCodes().then((fieldCodes) => {
          const fieldCodeSelector = $("#fieldCodeSelector");
          fieldCodeSelector.empty(); // Clear previous options
          fieldCodes.forEach((fieldCode) => {
              fieldCodeSelector.append(new Option(fieldCode, fieldCode));
          });
      }).catch((error) => {
          console.log("Error fetching field codes:", error);
      });
  });
});
$("#saveCropButton").on("click", (event) => {
  event.preventDefault();
  const cropCommonName = $("#commonName").val();
  const cropScientificName = $("#scientificName").val();
  const cropImage = $("#cropImage")[0]?.files[0];
  const category = $("#category").val();
  const cropSeason = $("#season").val();
  const fieldCode = $("#fieldCodeSelector").val();
  console.log("Crop name:", cropCommonName);

  const formData = new FormData();
  formData.append("cropName", cropCommonName);
  formData.append("cropScientificName", cropScientificName);
  formData.append("cropType", category);
  formData.append("cropSeason", cropSeason);
  formData.append("FieldCode", fieldCode); 

  if (cropImage) {
      formData.append("cropImage", cropImage);
  }
  saveCrop(formData);

  const addCropModal = new bootstrap.Modal(document.getElementById("addCropModal"));
  addCropModal.hide();
});

//DELETE
$("#cardsContainer").on("click", ".delete", function (event) {
  event.stopPropagation();
  const targetId = $(this).data("id");
  let cropId = $(this).data("id");
  cropId = cropId.replace(/"/g, "");

  if (confirm("Are you sure you want to delete this crop?")) {
      deleteCrop(cropId)
          .then(() => {
              alert("Crop deleted successfully!");
              location.reload();
          })
          .catch((error) => {
              alert("Failed to delete crop: " + error.responseText);
          });
  }
});

//GET FIELD IDs
export function populateFieldCodesInCropForm() {
    const selector = document.getElementById("fieldCodeSelector");
    getFieldCodes()
        .then((fieldData) => {
            selector.innerHTML = ""; // Clear existing options

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Select Field Code";
            selector.appendChild(placeholder);

            fieldData.forEach((field) => {
                const option = document.createElement("option");
                option.value = field.fieldCode; // Assuming each object has a fieldCode property
                option.textContent = field.fieldCode; // Display the fieldCode as the option text
                selector.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching field codes:", error);
        });
}
document.getElementById("addCropModal").addEventListener("show.bs.modal", populateFieldCodesInCropForm);

//GET CROP BY ID
$("#cardsContainer").on("click", ".card", function (event) {
  event.stopPropagation();
  const viewDetailsModal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));
  viewDetailsModal.show();

  const cropCode = $(this).data("id"); // Get the cropCode from the clicked card
  alert(cropCode); // Optional: For debugging purposes
  getCropDetails(cropCode);
});

function getCropDetails(cropCode) {
  getCropById(cropCode).then((resp) => {
      console.log(resp);
      $("#modalCode").text(resp.cropCode); // Update modal with crop details
      $("#modalCommonName").text(resp.cropCommonName);
      $("#modalScientificName").text(resp.cropScientificName);
      $("#modalCategory").text(resp.category);
      $("#modalSeason").text(resp.cropSeason);
      if (resp.cropImage) {
          $("#modalImage").attr("src", `data:image/jpeg;base64,${resp.cropImage}`);
      }
  }).catch((error) => {
      console.log(error);
      alert("Failed to load crop details.");
  });
}
