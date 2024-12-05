import { getCookie } from "./tokenService.js" 

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

export function save(staff){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:5055/cropmonitoringsystem/api/v1/staff",
            type :"POST",
            contentType : "application/json",
            data : JSON.stringify(staff),
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

export function getStaffMember(staff_id){
return new Promise((resolve, reject) => {
    $.ajax({
    url: `http://localhost:5055/cropmonitoringsystem/api/v1/staff/${staff_id}`,
    type: "GET",
    contentType: "application/json",
    headers: {
        Authorization: "Bearer " + getCookie("authToken"),
    },
    success: function (result) {
        console.log(result);
        resolve(result);
    },
    error: function (xhr, status, error) {
        reject(error);
    },
    });
});
}

export function update(staffId, updatedStaff) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/cropmonitoringsystem/api/v1/staff/${staffId}`, 
            contentType: "application/json",
            data: JSON.stringify(updatedStaff), 
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

export function deleteStaff(staffId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/cropmonitoringsystem/api/v1/staff/${staffId}`, 
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
export function getStaffIds() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/cropmonitoringsystem/api/v1/staff",
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
  
