import { getAllVehicles, save } from "../../model/vehicle.js"

$(document).ready(function () {
    loadTable()
    save()
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
            <tr>
                <td>${vehicle.vehicleCode}</td>
                <td>${vehicle.licensePlateNumber}</td>
                <td>${vehicle.vehicleCategory}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.status}</td>
                <td>
                    <button class="action-btn update btn btn-link p-0" title="Update">
                        <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                    </button>
                    <button class="action-btn delete btn btn-link p-0" title="Delete">
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
      const addVehicleModal = new bootstrap.Modal(document.getElementById("addVehicleModal"));
      addVehicleModal.show();
  });
});
$("#saveVehicle-btn").on("click", () => {
    let plateNo = $("#plateNo").val();
    let vehicleCategory = $("#vehicleCategory").val();
    let fuelType = $("#fuelType").val();
    let status = $("#status").val();
    let remark = $("#remark").val();

    // Validate required fields
    if (!plateNo || !vehicleCategory || !fuelType || !status) {
        alert("All fields are required!");
        return;
    }

    let vehicle = {
        vehicleCode: "",  // You can provide logic to generate or fill this if needed
        licensePlateNumber: plateNo,
        vehicleCategory: vehicleCategory,
        fuelType: fuelType,
        status: status,
        remarks: remark,
        staffId: ""  // You can provide logic to get this if needed
    };

    saveVehicle(vehicle)
        .then((response) => {
            alert("Vehicle saved successfully!");
            location.reload();
        })
        .catch((error) => {
            console.error("Error saving vehicle:", error);
        });
});

