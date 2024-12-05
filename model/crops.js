import { getCookie } from "./tokenService.js";

export function getAllCrops(){
    console.log("model eke crop eke get all ekata enawa")
    return new Promise((resolve, reject) => {
        $.ajax({
            url : "http://localhost:5055/cropmonitoringsystem/api/v1/crop",
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

export function saveCrop(cropData) {
    console.log("Saving new crop data");
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/cropmonitoringsystem/api/v1/crop",
            type: "POST",
            data: cropData,
            processData: false,  // Don't process the data
            contentType: false, 
            headers: {
                Authorization: "Bearer " + getCookie("authToken")
            },
             // Let jQuery set the content type (this is important for FormData)
            success: function (result) {
                console.log("Crop saved successfully:", result);
                resolve(result);
            },
            error: function (xhr, status, error) {
                console.log("Failed to save crop:", error);
                reject(error);
            }
        });
    });
}

export function deleteCrop(cropId) {
    console.log("Deleting crop with ID: " + cropId);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/cropmonitoringsystem/api/v1/crop/${cropId}`,
            type: "DELETE",
            headers: {
                Authorization: "Bearer " + getCookie("authToken")
            },
            success: function (result) {
                console.log("Crop deleted successfully:", result);
                resolve(result);
            },
            error: function (xhr, status, error) {
                console.log("Failed to delete crop:", error);
                reject(error);
            }
        });
    });
}

export function getCropById(cropId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/cropmonitoringsystem/api/v1/crop/${cropId}`,
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
export function getCropCodes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/cropmonitoringsystem/api/v1/crop",  
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            success: function (response) {
                resolve(response); 
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });
    });
}
