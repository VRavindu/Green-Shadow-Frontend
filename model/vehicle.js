import { getCookie } from "./tokenService.js";

export function getAllVehicles(){
  return new Promise((resolve,reject) => {
      $.ajax({
          url:"http://localhost:5055/cropmonitoringsystem/api/v1/vehicle",
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
export function saveVehicle(vehicle) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/cropmonitoringsystem/api/v1/vehicle",
          type: "POST",
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          contentType: "application/json",
          data: JSON.stringify(vehicle),
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          }
      });
  });
}
export function deleteVehicle(vehicleCode) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: `http://localhost:5055/cropmonitoringsystem/api/v1/vehicle/${vehicleCode}`,
          type: "DELETE",
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          }
      });
  });
}
export function getVehicleByCode(vehicleCode) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: `http://localhost:5055/cropmonitoringsystem/api/v1/vehicle/${vehicleCode}`,
          type: "GET",
          headers: {
              Authorization: "Bearer " + getCookie("authToken"),
          },
          success: (response) => {
              resolve(response);
          },
          error: (error) => {
              reject(error);
          }
      });
  });
}
export function updateVehicle(vehicleCode, updatedVehicle) {
  $.ajax({
      url: `http://localhost:5055/cropmonitoringsystem/api/v1/vehicle/${vehicleCode}`,
      type: "PATCH",
      headers: {
          Authorization: "Bearer " + getCookie("authToken"),
      },
      data: JSON.stringify(updatedVehicle),
      contentType: "application/json",
      success: (response) => {
          alert("Vehicle updated successfully!");
          location.reload(); // Reload the page or table to reflect changes
      },
      error: (error) => {
          alert("Failed to update vehicle: " + error.responseText);
      }
  });
}
