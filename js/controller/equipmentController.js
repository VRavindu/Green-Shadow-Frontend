import { deleteEquipment, getAllEquipment, getEquipmentById, save, updateEquipment } from "../../model/equipment.js"
import { getFieldCodes } from "../../model/field.js"
import { getStaffIds } from "../../model/staff.js"

var targetId = null

$(document).ready(function () {
    loadTable()
    save()
})
//GET ALL
function loadTable(){
    const table = $(".table tbody")
    table.empty()    
    getAllEquipment().then((response)=> {
        console.log(response);
        response.forEach(element => {
            table.append(
            `<tr data-id = "${element.equipmentId}">
                <td>${element.equipmentId}</td>
                <td>${element.equipmentName}</td>
                <td>${element.equipmentType}</td>
                <td>${element.status}</td>
                <td>
                  <button class="action-btn update btn btn-link p-0" title="Update" data-id = "${element.equipmentId}">
                    <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                  </button>
                  <button class="action-btn delete btn btn-link p-0" title="Delete" data-id = "${element.equipmentId}">
                    <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                  </button>
                </td>
              </tr>`
            )
        });
    })
}
//SAVE
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add-button");
  addButton.addEventListener("click", function () {
      const addEquipmentModal = new bootstrap.Modal(document.getElementById("addEquipmentModal"));
      addEquipmentModal.show();
  });
});
$("#saveEquipmentButton").on("click", () => {
    let equipmentName = $("#equipmentName").val();
    let equipmentType = $("#equipmentType").val();
    let equipmentStatus = $("#equipmentStatus").val();
    let equipment = {
      equipmentName: equipmentName,
      equipmentType: equipmentType,
      status: equipmentStatus
    };

    save(equipment)
      .then(() => {
        alert("Equipment saved successfully!");
        location.reload();  // Reload page after saving
      })
      .catch((error) => {
        console.error("Error saving equipment:", error);
      });
});

//DELETE
$(".table #tableBody").on("click", ".delete", function () {
  const targetId = $(this).data("id");  // Get the equipment ID from the data-id attribute
  if (confirm("Are you sure you want to delete this equipment?")) {
      deleteEquipment(targetId)
          .then(() => {
              alert("Equipment deleted successfully!");
              loadEquipmentTable(); // Reload the table after deletion
          })
          .catch((error) => {
              alert("Failed to delete equipment: " + error.responseText);
          });
  }
});

//UPDATE ##NOT WORK
$(".table #tableBody").on("click", ".update", function () {  
  const updateEquipmentModal = new bootstrap.Modal(document.getElementById("updateEquipmentModal"));
  updateEquipmentModal.show();
  targetId = $(this).data("id");
  alert(targetId);
  loadDataToUpdate();  // Load data to the form when edit button is clicked
});
$("#updateEquipmentModal").on("click","#updateEquipmentButton", () => {
  
  const equipmentName = $("#updateEquipmentName").val();
  const equipmentType = $("#updateEquipmentType").val();
  const equipmentStatus = $("#updateEquipmentStatus").val();
  const fieldCode = $("#fieldCodeSelector").val();
  const staffId = $("#staffIdSelector").val();

  const updatedEquipment = {
      equipmentName: equipmentName,
      equipmentType: equipmentType,
      status: equipmentStatus,
      fieldCode: fieldCode,
      staffId: staffId
  };

  updateEquipment(targetId, updatedEquipment);  // Call update function to save the changes
});
function loadDataToUpdate() {
  getEquipmentById(targetId).then((resp) => {
      console.log(resp);
      // Populate the modal fields with the current equipment data
      $("#updateEquipmentModal #updateEquipmentName").val(resp.equipmentName);
      $("#updateEquipmentModal #updateEquipmentType").val(resp.equipmentType);
      $("#updateEquipmentModal #updateEquipmentStatus").val(resp.status);

  }).catch((error) => {
      console.log("Error loading equipment data:", error);
  });
}
export async function populateFieldCodesInEqupmenm() {
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
document.getElementById("updateEquipmentModal").addEventListener("show.bs.modal", populateFieldCodesInEqupmenm);

//GET BY ID
$(".table #tableBody").on("click", "tr", function () {
  const viewDetailsModal = new bootstrap.Modal(document.getElementById("equipmentDetailsModal"));
  viewDetailsModal.show();
  targetId = $(this).data("id");
  alert(targetId);
  getEquipmentById(targetId);
  loadDataToDetailsModel();
});

function loadDataToDetailsModel() {
  getEquipmentById(targetId).then((resp) => {
      console.log(resp);
      $("#modalId").text(targetId);
      $("#modalName").text(resp.equipmentName);
      $("#modalType").text(resp.equipmentType);
      $("#modalStatus").text(resp.status);
  }).catch((error) => {
      console.log(error);
  });
}