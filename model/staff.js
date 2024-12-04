import { getCookie } from "./tokenService.js" 

//document.addEventListener('DOMContentLoaded', function () {
//     const addMemberButton = document.querySelector('.add-button');
//     const addStaffModal = new bootstrap.Modal(document.getElementById('addStaffModal'));
//     const addStaffForm = document.getElementById('addStaffForm');



//     addMemberButton.addEventListener('click', function () {
//         addStaffModal.show();
//     });

//     addStaffForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent form from submitting normally

//         // Validate required fields
//         const requiredFields = ['firstName', 'lastName', 'dob', 'email', 'gender', 'contactNo', 'designation', 'role', 'joinedDate', 'addressLine1', 'addressLine2', 'addressLine3'];
//         let isValid = true;
//         let errorMessage = '';

//         requiredFields.forEach(field => {
//             const input = document.getElementById(field);
//             if (!input || !input.value.trim()) {
//                 isValid = false;
//                 errorMessage += `Field "${input.placeholder}" is required.\n`;
//             }
//         });

//         if (!isValid) {
//             alert(errorMessage); // Show a message if validation fails
//             return; // Prevent form submission if validation fails
//         }

//         // Collect form data
//         const formData = new FormData(addStaffForm);
//         const staffData = {};
//         formData.forEach((value, key) => {
//             staffData[key] = value;
//         });

//         // Send data to backend via AJAX
//         fetch('http://localhost:5055/cropmonitoringsystem/api/v1/staff', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(staffData),
//         })
//             .then(response => {
//                 if (response.status === 201) {
//                     alert('Staff added successfully');
//                     addStaffModal.hide();
//                     addStaffForm.reset(); // Reset form
//                 } else if (response.status === 400) {
//                     alert('Failed to add staff: Bad Request');
//                 } else {
//                     alert('Error: ' + response.statusText);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('An error occurred');
//             });
//     });
// });

export function getAllStaff(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:5055/cropmonitoringsystem/api/v1/staff",
            type :"GET",
            headers: {
              Authorization: "Bearer " + getCookie("authToken"),
            },
            success:(response)=>{
                resolve(response)
            },
            error:(error)=> {
                reject(error)
            }
        })
    })
  }