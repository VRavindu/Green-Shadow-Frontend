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