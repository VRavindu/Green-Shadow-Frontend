import { deleteVehicle, getAllVehicles, getVehicleByCode, saveVehicle } from "../../model/vehicle.js"
var targetId = null;

$(document).ready(function () {
    loadTable()
})
//GET ALL
function loadTable(){
    const table = $(".table tbody")
    table.empty()    
    getAllVehicles().then((response)=> {
        console.log(response);
        response.forEach(vehicle => {
            table.append(
            `
            <tr data-id = "${vehicle.vehicleCode}">
                <td>${vehicle.vehicleCode}</td>
                <td>${vehicle.licensePlateNumber}</td>
                <td>${vehicle.vehicleCategory}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.status}</td>
                <td>
                    <button class="action-btn update btn btn-link p-0" title="Update" data-id = "${vehicle.vehicleCode}">
                        <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                    </button>
                    <button class="action-btn delete btn btn-link p-0" title="Delete" data-id = "${vehicle.vehicleCode}">
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
    console.log("add ek ebuw");
    
      const addVehicleModal = new bootstrap.Modal(document.getElementById("addVehicleModal"));
      addVehicleModal.show();
  });
});
$("#saveVehicle-btn").on("click", () => {
    let vehicle = {
        licensePlateNumber: $("#plateNo").val(),
        vehicleCategory: $("#vehicleCategory").val(),
        fuelType: $("#fuelType").val(),
        status: $("#status").val(),
        remarks: $("#remarks").val(),
    };

    saveVehicle(vehicle)
        .then(() => {
            alert("Vehicle saved successfully!");
            location.reload();
        })
        .catch((error) => {
            alert("Error saving vehicle: " + error.responseText);
        });
});

//GET BY VEHICLE CODE
$(".table #vehicleTableBody").on("click", "tr", function () {
    const viewDetailsModel = new bootstrap.Modal(document.getElementById("vehicleDetailsModal"));
    viewDetailsModel.show();
    targetId = $(this).data("id"); 
    console.log(targetId); 
    getVehicleByCode(targetId);
    loadDataToDetailsModel();
});
function loadDataToDetailsModel() {
    getVehicleByCode(targetId).then((resp) => {
        console.log(resp);
        $("#modalCode").text(targetId);
        $("#modalPlate").text(resp.licensePlateNumber);
        $("#modalCategory").text(resp.vehicleCategory);
        $("#modalFuelType").text(resp.fuelType);
        $("#modalStatus").text(resp.status);
        $("#modalRemarks").text(resp.remarks);
    }).catch((error) => {
        console.error("Error fetching vehicle details:", error);
    });
}

//DELETE
$(".table #vehicleTableBody").on("click", ".delete", function () {
    const targetId = $(this).data("id"); // Get the vehicleCode (ID)
    
    if (confirm("Are you sure you want to delete this vehicle?")) {
        deleteVehicle(targetId)
            .then(() => {
                alert("Vehicle deleted successfully!");
                loadTable(); // Reload the table after deletion (to update the list)
            })
            .catch((error) => {
                alert("Failed to delete vehicle: " + error.responseText);
            });
    }
});

//UPDATE
$(".table #vehicleTableBody").on("click", ".update", function () {
    const updateVehicleModal = new bootstrap.Modal(document.getElementById("updateVehicleModal"));
    updateVehicleModal.show();
    targetId = $(this).data("id");
    loadDataToUpdate();
});
function loadDataToUpdate() {
    getVehicleByCode(targetId).then((vehicle) => {
        console.log(vehicle);
        $("#plateNumber").val(vehicle.licensePlateNumber);
        $("#category").val(vehicle.vehicleCategory);
        $("#fuelType").val(vehicle.fuelType);
        $("#status").val(vehicle.status);
        $("#remarks").val(vehicle.remarks);
    }).catch((error) => {
        console.error("Error fetching vehicle data:", error);
    });
}
$("#updateVehicleButton").on("click", () => {
    const plateNumber = $("#plateNumber").val();
    const category = $("#category").val();
    const fuelType = $("#fuelType").val();
    const status = $("#status").val();
    const remarks = $("#remarks").val();

    const updatedVehicle = {
        plateNumber,
        category,
        fuelType,
        status,
        remarks,
    };

    updateVehicle(vehicleCode, updatedVehicle);
});