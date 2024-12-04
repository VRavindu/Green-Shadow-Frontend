import { getAllEquipment, save } from "../../model/equipment.js"

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
            `<tr>
                <td>${element.equipmentId}</td>
                <td>${element.equipmentName}</td>
                <td>${element.equipmentType}</td>
                <td>${element.status}</td>
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
      const addEquipmentModal = new bootstrap.Modal(document.getElementById("addEquipmentModal"));
      addEquipmentModal.show();
  });
});
$("#saveEquipmentButton").on("click", () => {
    let equipmentName = $("#equipmentName").val();
    let equipmentType = $("#equipmentType").val();
    let equipment = {
      equipmentName: equipmentName,
      equipmentType: equipmentType,
      status : "Available"
    };
    save(equipment)
      .then(() => {
        alert("Equipment saved successfully!");
        console.log("Save successful:", response);
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });