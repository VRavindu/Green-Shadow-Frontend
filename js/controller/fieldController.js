import { deleteField, getAllFields, getFieldById, saveField, updateField } from "../../model/field.js"
var targetId = null;

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
                <div class="card mb-3" data-id="${field.fieldCode}">
                <img src="data:image/jpeg;base64,${field.image1}" class="card-img-top" alt="Field Image 1" style="height: 150px; object-fit: cover;">
                    <div class="card-content p-3">
                        <h5 class="card-title">${field.fieldName}</h5>
                        <p class="card-text">Size: ${field.fieldSize} sq. units</p>
                        <p class="card-text">Location: (${field.fieldLocationX}, ${field.fieldLocationY})</p>
                        <div class="card-actions">
                        <button class="action-btn update btn btn-link p-0" title="Update" data-id=${field.fieldCode}">
                            <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                        </button>
                        <button class="action-btn delete btn btn-link p-0" title="Delete" data-id=${field.fieldCode}">
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
//SAVE
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", function () {
        const addFieldModal = new bootstrap.Modal(document.getElementById("addFieldModal"));
        addFieldModal.show();
    });
});
$("#saveFieldButton").on("click", () => {
    const fieldName = $("#fieldName").val();
    const fieldLocationX = parseFloat($("#fieldLocationX").val()); // Convert to number if needed
    const fieldLocationY = parseFloat($("#fieldLocationY").val()); // Convert to number if needed
    const fieldSize = parseFloat($("#fieldSize").val()); // Convert to number if needed

    const image1 = $("#image1")[0]?.files[0]; // For file input, fetch the file object
    const image2 = $("#image2")[0]?.files[0]; // For file input, fetch the file object

    const formData = new FormData();

    formData.append("fieldName", fieldName);
    formData.append("fieldLocationX", fieldLocationX);
    formData.append("fieldLocationY", fieldLocationY);
    formData.append("fieldSize", fieldSize);

    if (image1) formData.append("image1", image1); // Append file1 if it exists
    if (image2) formData.append("image2", image2);

    saveField(formData);
});

//DELETE
$("#cardsContainer").on("click", ".delete", function (event) {
    event.stopPropagation(); // Prevent the card click from being triggered
    const targetId = $(this).data("id");
    let fieldCode = $(this).data("id");
    fieldCode = fieldCode.replace(/"/g, "");

    if (confirm("Are you sure you want to delete this field?")) {
        deleteField(fieldCode) // Call delete function
            .then(() => {
                alert("Field deleted successfully!");
                location.reload();
            })
            .catch((error) => {
                alert("Failed to delete field: " + error.responseText);
            });
    }
});

// GET
$("#cardsContainer").on("click", ".card", function (event) {
    event.stopPropagation();
    const viewDetailsModel = new bootstrap.Modal(document.getElementById("fieldDetailsModal"));
    viewDetailsModel.show();
    targetId = $(this).data("id"); 
    alert(targetId);
    getFieldById(targetId);
    getFieldDetails(); 
});
function getFieldDetails() {
    getFieldById(targetId).then((resp) => {
        console.log(resp);
        $("#modalCode").text(targetId);
        $("#modalName").text(resp.fieldName);
        $("#modalLocation").text(`${resp.fieldLocation.x}, ${resp.fieldLocation.y}`); 
        $("#modalSize").text(resp.fieldSize);
        if (resp.image1) {
            $("#modalImage1").attr("src", `data:image/jpeg;base64,${resp.image1}`);
        }
        if (resp.image2) {
            $("#modalImage2").attr("src", `data:image/jpeg;base64,${resp.image2}`);
        }
    }).catch((error) => {
        console.log(error);
    });
}

// UPDATE ##NOT WORK
$("#cardsContainer").on("click", ".update", function (event) {
        event.stopPropagation();
        const updateFieldModal = new bootstrap.Modal(document.getElementById("updateFieldModal"));
        updateFieldModal.show();
        targetId = $(this).data("id")
        targetId = targetId.replace(/"/g, "");
        loadDataToUpdate(); 
});
function loadDataToUpdate() {
    getFieldById(targetId).then((resp) => {
        console.log(targetId);
        console.log(resp);
        $("#updateFieldModal #updateFieldName").val(resp.fieldName);
        $("#updateFieldModal #updateFieldLocationX").val(resp.fieldLocation.x);  // Fixed potential error: fieldLocationX should be fieldLocation.x
        $("#updateFieldModal #updateFieldLocationY").val(resp.fieldLocation.y);  // Fixed potential error: fieldLocationY should be fieldLocation.y
        $("#updateFieldModal #updateFieldSize").val(resp.fieldSize);
        
    }).catch((error) => {
        console.log(error);
    });
}
$("#saveUpdatedFieldButton").on("click", () => {
    const fieldName = $("#fieldName").val();
    const fieldLocationX = parseFloat($("#fieldLocationX").val());
    const fieldLocationY = parseFloat($("#fieldLocationY").val());
    const fieldSize = parseFloat($("#fieldSize").val());

    const image1 = $("#image1")[0]?.files[0];
    const image2 = $("#image2")[0]?.files[0];

    const formData = new FormData();
    formData.append("fieldName", fieldName);
    formData.append("fieldLocationX", fieldLocationX);
    formData.append("fieldLocationY", fieldLocationY);
    formData.append("fieldSize", fieldSize);

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);

    updateField(formData);
});
