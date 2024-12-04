import { getCookie } from "./tokenService.js"

export function getAllEquipment(){
  return new Promise((resolve,reject) => {
      $.ajax({
          url:"http://localhost:5055/cropmonitoringsystem/api/v1/equipment",
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
export function save(equipment) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/cropmonitoringsystem/api/v1/equipment",
          type: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
          }, // HTTP method
          contentType: "application/json",
          data: JSON.stringify(equipment),
          success: (response) => {
              console.log("Equipment saved successfully:", response);
              resolve(response);
          },
          error: (jqXHR, textStatus, errorThrown) => {
              reject(`Save failed: ${textStatus}, ${errorThrown}`);
          }
      });
  });
}