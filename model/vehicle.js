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
export function save(vehicle) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/cropmonitoringsystem/api/v1/vehicle",
          type: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
          }, // HTTP method
          contentType: "application/json",
          data: JSON.stringify(vehicle),
          success: (response) => {
              console.log("Vehicle saved successfully:", response);
              resolve(response);
          },
          error: (jqXHR, textStatus, errorThrown) => {
              reject(`Save failed: ${textStatus}, ${errorThrown}`);
          }
      });
  });
}