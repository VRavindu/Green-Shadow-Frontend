import { getCookie } from "./tokenService";

export function login(email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/cropmonitoringsystem/api/v1/auth/signin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email, password }),
        success: function (result) {
          console.log(result);
          resolve(result); // resolving with the response result
        },
        error: function (xhr, status, error) {
          reject(error); // rejecting on error
        },
      });
    });
  }
  
// Function to save the user
export function saveUser(user) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/cropmonitoringsystem/api/v1/auth.signup", // Adjust endpoint if needed
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(user),
          headers: {
              Authorization: "Bearer " + getCookie("authToken"), // Add token if authentication is required
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
