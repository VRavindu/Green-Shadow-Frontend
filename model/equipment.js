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

export function getEquipmentById(equipmentId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/cropmonitoringsystem/api/v1/equipment/${equipmentId}`,
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

export function deleteEquipment(equipmentId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/cropmonitoringsystem/api/v1/equipment/${equipmentId}`,
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

export function updateEquipment(equipmentId, updatedEquipmentData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/cropmonitoringsystem/api/v1/equipment/${equipmentId}`,
      type: "PATCH",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"),
      },
      data: JSON.stringify(updatedEquipmentData), 
      contentType: "application/json", 
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}