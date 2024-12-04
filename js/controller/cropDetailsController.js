import { getAllLogs } from "../../model/cropDetails.js";

$(document).ready(function () {
    loadCards();
    });
  
  function loadCards() {
    const container = $("#cardsContainer");
    console.log(typeof viewCropDetails);
  
    getAllLogs().then((result) => {
      container.empty();
      result.forEach((cardData) => {
        container.append(`
            <div class="col-md-4" style="width: 17rem;">
                <div class="card mb-3" onclick="viewLogDetails('${cardData.logCode}')">
                    <img src="data:image/jpeg;base64,${cardData.observedImage}" class="card-img-top" alt="Log Image" style="height: 150px; object-fit: cover;">
                    <div class="card-content p-3">
                    <p class="card-text">Log Date: ${cardData.logDate}</p>
                    <p class="card-text">Log Details: ${cardData.logDetails}</p>
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