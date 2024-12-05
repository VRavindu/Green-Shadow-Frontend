import { getCookie } from "./tokenService.js"

export function getAllFields(){  
  return new Promise((resolve,reject) => {
      $.ajax({
          url:"http://localhost:5055/cropmonitoringsystem/api/v1/field",
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
export function getFieldById(fieldId) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: `http://localhost:5055/cropmonitoringsystem/api/v1/field/${fieldId}`,
          type: "GET",
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          },
      });
  });
}
export function saveField(fieldData) {
  return new Promise((resolve, reject) => {

      $.ajax({
        url: "http://localhost:5055/cropmonitoringsystem/api/v1/field", // Ensure this is the correct API endpoint
        type: "POST",
        data: fieldData,  // Pass the FormData object
        processData: false,  // Don't process the data
        contentType: false,  // Don't set content-type header for file uploads
        headers: {
            Authorization: "Bearer " + getCookie("authToken"),  // Include Authorization header
        },
        success: (response) => {
          alert("Field saved successfully")
          console.log("Field saved successfully", response);
          location.reload();
        },
        error: (error) => {
          alert("Error saving field")
            console.log("Error saving field", error);
        }
    });
    
  });
}
export function updateField(fieldId, fieldData) {
  return new Promise((resolve, reject) => {
      
    $.ajax({
          url: `http://localhost:5055/cropmonitoringsystem/api/v1/field/${fieldId}`,
          type: "PATCH",
          processData: false,
          contentType: false,
          data: fieldData,
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          },
      });
  });
}
export function deleteField(fieldId) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: `http://localhost:5055/cropmonitoringsystem/api/v1/field/${fieldId}`,
          type: "DELETE",
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          },
      });
  });
}
