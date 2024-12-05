import { deleteLogById, getAllLogs, getLogById, saveCropLog } from "../../model/cropDetails.js";
import { getCropCodes } from "../../model/crops.js";
import { getFieldCodes } from "../../model/field.js";
import { getStaffIds } from "../../model/staff.js";

$(document).ready(function () {
    loadCards();
});

//GET ALL
function loadCards() {
  const container = $("#cardsContainer");
  console.log(typeof viewCropDetails);
  getAllLogs().then((result) => {
    container.empty();
    result.forEach((cardData) => {
      container.append(`
          <div class="col-md-4" style="width: 17rem;">
              <div class="card mb-3" data-id="${cardData.logCode}">
                  <img src="data:image/jpeg;base64,${cardData.observedImage}" class="card-img-top" alt="Log Image" style="height: 150px; object-fit: cover;">
                  <div class="card-content p-3">
                  <p class="card-text">Log Date: ${cardData.logDate}</p>
                  <p class="card-text">Log Details: ${cardData.logDetails}</p>
                  <div class="card-actions">
                      <button class="action-btn update btn btn-link p-0" title="Update" data-id="${cardData.logCode}">
                          <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                      </button>
                      <button class="action-btn delete btn btn-link p-0" title="Delete" data-id="${cardData.logCode}">
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
      const addCropModal = new bootstrap.Modal(document.getElementById("addLogModal"));
      addCropModal.show();

      getFieldCodes().then((fieldCodes) => {
        const fieldCodeSelector = $("#fieldCodeSelector");
        fieldCodeSelector.empty();
        fieldCodes.forEach((field) => {
            fieldCodeSelector.append(new Option(field.fieldCode, field.fieldCode));
        });
      }).catch((error) => {
        console.log("Error fetching field codes:", error);
      });

      getCropCodes().then((cropCodes) => {
        const cropCodeSelector = $("#cropCodeSelector");
        cropCodeSelector.empty();
        cropCodes.forEach((cropCode) => {
            cropCodeSelector.append(new Option(cropCode.cropCode, cropCode.cropCode));
        });
    }).catch((error) => {
        console.log("Error fetching crop codes:", error);
    });

    getStaffIds().then((staffIds) => {
      const staffIdSelector = $("#staffIdSelector");
      staffIdSelector.empty();
      staffIds.forEach((staff) => {
          staffIdSelector.append(new Option(staff.staffId, staff.staffId));
      });
    }).catch((error) => {
      console.log("Error fetching staff IDs:", error);
    });

  });
});
$("#saveCropDetailsButton").on("click", (event) => {
  event.preventDefault();
  
  const fieldCode = $("#fieldCodeSelector").val();
  const cropCode = $("#cropCodeSelector").val();
  const staffId = $("#staffIdSelector").val();
  const logDetails = $("#logDetails").val();
  const observedImg = $("#logImage")[0]?.files[0];
  
  console.log("Saving crop details");

  const formData = new FormData();
  formData.append("fieldCode", fieldCode);
  formData.append("cropCode", cropCode);
  formData.append("staffId", staffId);
  formData.append("logDetails", logDetails);

  if (observedImg) {
      formData.append("observedImg", observedImg);
  }
  saveCropLog(formData);
  location.reload();

  const addCropModal = new bootstrap.Modal(document.getElementById("addCropModal"));
  addCropModal.hide();
});
export async function populateFieldCodesInCropForm() {
  const cropCodeSelector = document.getElementById("cropCodeSelector");
  const fieldCodeSelector = document.getElementById("fieldCodeSelector");
  const staffIdSelector = document.getElementById("staffIdSelector");

  try {
    const fieldData = await getFieldCodes();
    fieldCodeSelector.innerHTML = "";  // Clear the previous options
    const fieldCodePlaceholder = document.createElement("option");
    fieldCodePlaceholder.value = "";
    fieldCodePlaceholder.textContent = "Select Field Code";
    fieldCodeSelector.appendChild(fieldCodePlaceholder);

    fieldData.forEach((field) => {
      const option = document.createElement("option");
      option.value = field.fieldCode;
      option.textContent = field.fieldCode;  // Display the correct field code
      fieldCodeSelector.appendChild(option);
    });

    const cropData = await getCropCodes();  // Get crop codes
    cropCodeSelector.innerHTML = "";  // Clear previous crop codes
    const cropCodePlaceholder = document.createElement("option");
    cropCodePlaceholder.value = "";
    cropCodePlaceholder.textContent = "Select Crop Code";
    cropCodeSelector.appendChild(cropCodePlaceholder);

    cropData.forEach((crop) => {
      const option = document.createElement("option");
      option.value = crop.cropCode;
      option.textContent = crop.cropCode;  // Display the correct crop code
      cropCodeSelector.appendChild(option);
    });

    const staffData = await getStaffIds();  // Get staff IDs
    console.log("Staff Data:", staffData);
    staffIdSelector.innerHTML = "";  // Clear previous staff options
    const staffPlaceholder = document.createElement("option");
    staffPlaceholder.value = "";
    staffPlaceholder.textContent = "Select Staff ID";
    staffIdSelector.appendChild(staffPlaceholder);

    if (Array.isArray(staffData)) {
      staffData.forEach((staff) => {
        console.log("Staff:", staff);
        if (staff.id && staff.firstName && staff.lastName) {
          const option = document.createElement("option");
          option.value = staff.id;
          option.textContent = `${staff.firstName} ${staff.lastName} (${staff.id})`;  // Display staff name and ID
          staffIdSelector.appendChild(option);
        } else {
          console.warn("Invalid staff data", staff);
        }
      });
    } else {
      console.error("Staff data is not an array or is empty:", staffData);
    }
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
}

document.getElementById("addLogModal").addEventListener("show.bs.modal", populateFieldCodesInCropForm);

//DELETE
$("#cardsContainer").on("click", ".delete", function (event) {
  event.stopPropagation(); // Prevent the card click from being triggered
  let cropCode = $(this).data("id");  // Same, cropCode or the unique identifier
  cropCode = cropCode.replace(/"/g, "");  // Clean up if needed (remove quotes or special chars)

  if (confirm("Are you sure you want to delete this crop log?")) {
      deleteLogById(cropCode) // Call delete function
          .then(() => {
              alert("Crop log deleted successfully!");
              location.reload();  // Reload the page to reflect changes
          })
          .catch((error) => {
              alert("Failed to delete crop log: " + error.responseText);
          });
  }
});

//GET
$("#cardsContainer").on("click", ".card", function (event) {
  event.stopPropagation();
  const cropDetailsModal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));
  cropDetailsModal.show();
  
  const targetId = $(this).data("id"); // Get the crop log ID
  alert(targetId);  // For debugging purposes

  getCropLogDetails(targetId); // Fetch and populate crop log details
});

function getCropLogDetails(cropLogId) {
  getLogById(cropLogId)  // Assuming this function fetches crop log by ID
      .then((resp) => {
          console.log(resp.logCode); // Debug: log the response
          $("#modalId").text(resp.logCode);  // Display crop log ID
          $("#modalDate").text(resp.logDate);  // Display log date
          $("#modalDetails").text(resp.logDetails);  // Display log details

          if (resp.observedImage) {  // Assuming the image is available in the response
              $("#modalImage").attr("src", `data:image/jpeg;base64,${resp.observedImage}`);  // Display image
          }
      })
      .catch((error) => {
          console.log(error);  // Handle error
      });
}
