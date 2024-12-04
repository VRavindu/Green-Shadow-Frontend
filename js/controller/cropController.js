import { getAllCrops } from "../../model/crops.js";

$(document).ready(function () {
  loadCards();
  });

function loadCards() {
  const container = $("#cardsContainer");
  console.log(typeof viewCropDetails);

  getAllCrops().then((result) => {
    console.log("crop controller eke load table ekata awa", result);
    container.empty();
    result.forEach((crop) => {
      container.append(`
        <div class="col-md-4" style="width: 17rem;">
          <div class="card mb-3" onclick="viewCropDetails('${crop.cropCode}')">
            <img src="data:image/jpeg;base64,${crop.cropImage}" class="card-img-top" alt="Crop Image" style="height: 150px; object-fit: cover;">
            <div class="card-content p-3">
              <h5 class="card-title">${crop.cropCommonName}</h5>
              <p class="card-text">Scientific Name: ${crop.cropScientificName}</p>
              <p class="card-text">Category: ${crop.category}</p>
              <p class="card-text">Season: ${crop.cropSeason}</p>
              <div class="card-actions">
                <button class="action-btn update btn btn-link p-0" title="Update" onclick="updateCrop(event)">
                  <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
                </button>
                <button class="action-btn delete btn btn-link p-0" title="Delete" onclick="deleteCrop(event)">
                  <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
                </button>
              </div>
            </div>
          </div>
        </div>
      `);
      
      
    });
  });
}