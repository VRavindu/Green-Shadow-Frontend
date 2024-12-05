import { deleteStaff, getAllStaff, getStaffMember, save, update } from "../../model/staff.js"
var targetId = null;

$(document).ready(function () {
    loadTable()
})

//GET ALL - #Works
function loadTable(){
    const table = $(".table #staffTableBody")
    table.empty()    
    getAllStaff().then((response)=> {
        console.log(response);
        response.forEach(item => {
            console.log(item.id);
            
            table.append(
            `
            <tr data-id=${item.id}>
                <td>${item.id}</td>
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.addressLine1} ${item.addressLine2}</td>
                <td>${item.contactNo}</td>
                <td>${item.role}</td>
                <td>${item.gender}</td>
                <td>
                    <button class="action-btn edit btn btn-link p-0" title="Edit" data-id=${item.id}>
                        <img src="/assets/icon/update.svg" alt="Edit" style="width: 20px;">
                    </button>
                    <button class="action-btn delete btn btn-link p-0" title="Delete" data-id=${item.id}>
                        <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                    </button>
                </td>
            </tr>`
            )
        });
    })
}

// SAVE - #Works
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", function () {
        const addStaffModal = new bootstrap.Modal(document.getElementById("addStaffModal"));
        addStaffModal.show();
    });
  });
$("#save-btn").on("click", ()=>{
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const dob = $("#dob").val();
    const gender = $("#gender").val();
    const contactNo = $("#contactNo").val();
    const email = $("#email").val();
    const joinedDate = $("#joinedDate").val();
    const designation = $("#designation").val();
    const role = $("#role").val();
    const addressLine1 = $("#addressLine1").val();
    const addressLine2 = $("#addressLine2").val();
    const addressLine3 = $("#addressLine3").val();
    const addressLine4 = $("#addressLine4").val();

    const staff = {
        firstName:firstName,
        lastName:lastName,
        dob:dob,
        gender:gender,
        contactNo:contactNo,
        email:email,
        joinedDate:joinedDate,
        designation:designation,
        role:role,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        addressLine4:addressLine4
    }
    save(staff)
})

//UPDATE ##NOT WORKING
$(".table #staffTableBody").on("click", ".edit", function () {
    const updateStaffModal = new bootstrap.Modal(document.getElementById("updateStaffModal"));
    updateStaffModal.show();
    targetId = $(this).data("id")
    alert(targetId)
    loadDataToUpdate()
  });
  $("#update-btn").on("click", ()=>{
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const dob = $("#dob").val();
    const gender = $("#gender").val();
    const contactNo = $("#contactNo").val();
    const email = $("#email").val();
    const joinedDate = $("#joinedDate").val();
    const designation = $("#designation").val();
    const role = $("#role").val();
    const addressLine1 = $("#addressLine1").val();
    const addressLine2 = $("#addressLine2").val();
    const addressLine3 = $("#addressLine3").val();
    const addressLine4 = $("#addressLine4").val();

    const updatedStaff = {
        id:"",
        firstName:firstName,
        lastName:lastName,
        DOB:dob,
        gender:gender,
        contactNo:contactNo,
        email:email,
        joinedDate:joinedDate,
        designation:designation,
        role:role,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        addressLine4:addressLine4
    }

    update(targetId, updatedStaff)
  })
  function loadDataToUpdate(){
    getStaffMember(targetId).then((resp)=>{
        console.log(resp);
        $("#updateStaffModal #staffId").val(targetId);
        $("#updateStaffModal #firstName").val(resp.firstName);
        $("#updateStaffModal #lastName").val(resp.lastName);
        $("#updateStaffModal #dob").val(resp.dob);
        $("#updateStaffModal #gender").val(resp.gender)
        $("#updateStaffModal #contactNo").val(resp.contactNo)
        $("#updateStaffModal #email").val(resp.email)
        $("#updateStaffModal #joinedDate").val(resp.joinedDate)
        $("#updateStaffModal #designation").val(resp.designation)
        $("#updateStaffModal #role").val(resp.role)
        $("#updateStaffModal #addressLine1").val(resp.addressLine1)
        $("#updateStaffModal #addressLine2").val(resp.addressLine2)
        $("#updateStaffModal #addressLine3").val(resp.addressLine3)
        $("#updateStaffModal #addressLine4").val(resp.addressLine4)

    }).catch((error)=>{
        console.log(error);
        
    })
  }

  //DELETE - #Works
  $(".table #staffTableBody").on("click", ".delete", function () {
    targetId = $(this).data("id")
    if (confirm("Are you sure you want to delete this staff member?")) {
        deleteStaff(targetId)
            .then(() => {
                alert("Staff member deleted successfully!");
                loadTable(); // Reload the table after deletion
            })
            .catch((error) => {
                alert("Failed to delete staff member: " + error.responseText);
            });
    }
  });

  //GET BY ID - #Works
  $(".table #staffTableBody").on("click", "tr", function () {
    const viewDetailsModel = new bootstrap.Modal(document.getElementById("staffDetailsModal"));
    viewDetailsModel.show();
    targetId = $(this).data("id")
    alert(targetId)
    getStaffMember(targetId)
    loadDataToDetailsModel()

  });
  function loadDataToDetailsModel(){
    getStaffMember(targetId).then((resp)=>{
        console.log(resp);
        $("#modalId").text(targetId);
        $("#modalFullName").text(`${resp.firstName} ${resp.lastName}`);
        $("#modalDesignation").text(resp.designation)
        $("#modalContact").text(resp.contactNo)
        $("#modalEmail").text(resp.email)
        $("#modalJoinedDate").text(resp.joinedDate)
        $("#modalRole").text(resp.role)
        $("#modalGender").text(resp.gender)
        $("#modalDOB").text(resp.dob)
        const addresses = [
            resp.addressLine1,
            resp.addressLine2,
            resp.addressLine3,
            resp.addressLine4,
        ].filter(line => line).join(", ");
    
        $("#modalAddressList").text(addresses);

    }).catch((error)=>{
        console.log(error);
        
    })
  }