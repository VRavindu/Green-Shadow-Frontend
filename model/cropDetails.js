import { getCookie } from "./tokenService.js";

export function getAllLogs(){
  console.log("model eke crop eke get all ekata enawa")
  return new Promise((resolve, reject) => {
      $.ajax({
          url : "http://localhost:5055/cropmonitoringsystem/api/v1/cropDetails",
          type : "GET",
          headers: {
              Authorization: "Bearer " + getCookie("authToken")
          },
          success: function(result){
              
              console.log(result)
              resolve(result);
              
          },
          error: function(xhr, status, error){
              reject(error);
          },
      })
  })
}

export function saveCropLog(cropLogData) {
    console.log("Saving new crop log data");
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/cropmonitoringsystem/api/v1/cropDetails",
        type: "POST",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        data: cropLogData,  // FormData
        contentType: false, // Let jQuery handle the content type
        processData: false, // Let jQuery handle the form data
        success: (result) => {
          console.log("Crop log saved successfully:", result);
          resolve(result);
        },
        error: (error) => {
          console.log("Failed to save crop log:", error);
          reject(error);
        },
      });
    });
}

export function getLogById(logId) {
    console.log("Fetching log by ID: ", logId);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/cropmonitoringsystem/api/v1/cropDetails/${logId}`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken")
            },
            success: function(result){
                console.log(result);
                resolve(result);
            },
            error: function(xhr, status, error){
                reject(error);
            },
        });
    });
}

export function deleteLogById(logId) {
    console.log("Deleting log with ID: ", logId);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/cropmonitoringsystem/api/v1/cropDetails/${logId}`,
            type: "DELETE",
            headers: {
                Authorization: "Bearer " + getCookie("authToken")
            },
            success: function(result){
                console.log("Log deleted:", result);
                resolve(result);
            },
            error: function(xhr, status, error){
                reject(error);
            },
        });
    });
}
  
export function updateCropLog(cropLogId, cropLogData) {
    console.log("Updating crop log with ID:", cropLogId);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/cropmonitoringsystem/api/v1/cropDetails/${cropLogId}`,  // Add cropLogId in the URL
        type: "PATCH", 
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        data: cropLogData,  
        contentType: false,  
        processData: false,  
        success: (result) => {
          console.log("Crop log updated successfully:", result);
          resolve(result);
        },
        error: (error) => {
          console.log("Failed to update crop log:", error);
          reject(error);
        },
      });
    });
  }
  
  