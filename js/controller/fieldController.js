import { getAllFields } from "../../model/field.js"

$(document).ready(function () {
    loadCards()
})
//GET ALL
function loadCards(){
    const container = $("#cardsContainer");
    container.empty();
    
    getAllFields().then((response) => {
        console.log(response);
        response.forEach(field => {
            console.log(field.fieldCode);
            container.append(
            `
            <div class="col-md-4" style="width: 17rem;">
                <div class="card mb-3" data-fieldCode="${field.fieldCode}" onclick="viewFieldDetails('${field.fieldCode}')">
                <img src="data:image/jpeg;base64,${field.image1}" class="card-img-top" alt="Field Image 1" style="height: 150px; object-fit: cover;">
                    <div class="card-content p-3">
                        <h5 class="card-title">${field.fieldName}</h5>
                        <p class="card-text">Size: ${field.fieldSize} sq. units</p>
                        <p class="card-text">Location: (${field.fieldLocationX}, ${field.fieldLocationY})</p>
                        <div class="card-actions">
                        <button class="action-btn update btn btn-link p-0" title="Update" onclick="updateField(event)">
                            <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                        </button>
                        <button class="action-btn delete btn btn-link p-0" title="Delete" onclick="deleteField(event)">
                            <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                        </button>
                        </div>
                    </div>
                </div>
            </div>`
            )
        });
    })
} 