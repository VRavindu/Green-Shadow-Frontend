import { getAllStaff } from "../../model/staff.js"

$(document).ready(function () {
    loadTable()
})
//GET ALL
function loadTable(){
    const table = $(".table #staffTableBody")
    table.empty()    
    getAllStaff().then((response)=> {
        console.log(response);
        response.forEach(item => {
            console.log(item.id);
            
            table.append(
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.addressLine1} ${item.addressLine2}</td>
                <td>${item.contactNo}</td>
                <td>${item.role}</td>
                <td>${item.gender}</td>
                <td>
                    <button class="action-btn edit btn btn-link p-0" title="Edit">
                        <img src="/assets/icon/update.svg" alt="Edit" style="width: 20px;">
                    </button>
                    <button class="action-btn delete btn btn-link p-0" title="Delete">
                        <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                    </button>
                </td>
            </tr>`
            )
        });
    })
}