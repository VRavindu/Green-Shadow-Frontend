document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cardsContainer");
    const modal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));
  
    const cropData = [
      {
        id: "C001",
        commonName: "Rice",
        scientificName: "Oryza sativa",
        details: "Rice is a staple food grown in the monsoon season with proper irrigation.",
        season: "Monsoon",
        image: "/assets/img/crop-img.jpg"
      },
      {
        id: "C002",
        commonName: "Carrot",
        scientificName: "Daucus carota",
        details: "Carrots are planted in the spring season and require well-drained soil.",
        season: "Spring",
        image: "/assets/img/carrot-img.jpeg"
      },
      {
        id: "C003",
        commonName: "Spinach",
        scientificName: "Spinacia oleracea",
        details: "Spinach grows best in cooler weather and can be harvested in 6 weeks.",
        season: "Winter",
        image: "/assets/img/spinach-img.jpg"
      }
    ];
  
    cropData.forEach(crop => {
      const card = document.createElement("div");
      card.classList.add("card", "crop-card");
      card.style.width = "17rem";
      card.setAttribute("data-id", crop.id);
      card.setAttribute("data-common-name", crop.commonName);
      card.setAttribute("data-scientific-name", crop.scientificName);
      card.setAttribute("data-details", crop.details);
      card.setAttribute("data-season", crop.season);
  
      card.innerHTML = `
        <img src="${crop.image}" class="card-img-top" alt="${crop.commonName}" style="height: 150px; object-fit: cover;">
        <div class="card-content p-3">
          <h5 class="card-title">${crop.commonName}</h5>
          <p class="card-text">Scientific Name: ${crop.scientificName}</p>
          <p class="card-text">Season: ${crop.season}</p>
          <div class="card-actions">
              <button class="action-btn update btn btn-link p-0" title="Update">
                  <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
              </button>
              <button class="action-btn delete btn btn-link p-0" title="Delete">
                  <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
              </button>
            </div>
        </div>
      `;
  
      card.addEventListener("click", () => {
        document.getElementById("modalId").textContent = crop.id;
        document.getElementById("modalCommonName").textContent = crop.commonName;
        document.getElementById("modalScientificName").textContent = crop.scientificName;
        document.getElementById("modalSeason").textContent = crop.season;
        document.getElementById("modalDetails").textContent = crop.details;
        document.getElementById("modalImage").src = crop.image;
  
        modal.show();
      });
  
      cardsContainer.appendChild(card);
    });
  });