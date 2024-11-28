document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");
  const addCropModal = new bootstrap.Modal(document.getElementById("addCropModal"));
  const cropDetailsModal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));

  const cropData = [
    {
      cropCode: "C001",
      commonName: "Rice",
      scientificName: "Oryza sativa",
      details: "Rice is a staple food grown in the monsoon season with proper irrigation.",
      season: "Monsoon",
      image: "/assets/img/crop-img.jpg",
      category: "Cereal"
    },
    {
      cropCode: "C002",
      commonName: "Carrot",
      scientificName: "Daucus carota",
      details: "Carrots are planted in the spring season and require well-drained soil.",
      season: "Spring",
      image: "/assets/img/carrot-img.jpeg",
      category: "Root"
    },
    {
      cropCode: "C003",
      commonName: "Spinach",
      scientificName: "Spinacia oleracea",
      details: "Spinach grows best in cooler weather and can be harvested in 6 weeks.",
      season: "Winter",
      image: "/assets/img/spinach-img.jpg",
      category: "Leafy"
    }
  ];

  const addCropButton = document.querySelector('.add-button');
  addCropButton.addEventListener('click', () => {
    document.getElementById('addCropForm').reset();
    addCropModal.show();
  });

  function addCropCard(crop) {
    const card = document.createElement("div");
    card.classList.add("card", "crop-card");
    card.style.width = "17rem";
    card.setAttribute("data-id", crop.cropCode);
    card.setAttribute("data-common-name", crop.commonName);
    card.setAttribute("data-scientific-name", crop.scientificName);
    card.setAttribute("data-image", crop.image);
    card.setAttribute("data-category", crop.category);
    card.setAttribute("data-season", crop.season);

    card.innerHTML = `
      <img src="${crop.image}" class="card-img-top" alt="Crop Image" style="height: 150px; object-fit: cover;">
      <div class="card-content p-3">
        <h5 class="card-title">${crop.commonName}</h5>
        <p class="card-text">Scientific Name: ${crop.scientificName}</p>
        <p class="card-text">Category: ${crop.category}</p>
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
      document.getElementById("modalId").textContent = crop.cropCode;
      document.getElementById("modalCommonName").textContent = crop.commonName;
      document.getElementById("modalScientificName").textContent = crop.scientificName;
      document.getElementById("modalCategory").textContent = crop.category;
      document.getElementById("modalSeason").textContent = crop.season;
      document.getElementById("modalImage").src = crop.image;
      cropDetailsModal.show();
    });

    const updateButton = card.querySelector(".update");
    updateButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
      alert(`Update action triggered for Crop Code: ${crop.cropCode}`);
    });

    const deleteButton = card.querySelector(".delete");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
      alert(`Delete action triggered for Crop Code: ${crop.cropCode}`);
    });

    cardsContainer.appendChild(card);
  }

  cropData.forEach(crop => {
    addCropCard(crop);
  });

  document.getElementById('saveCropButton').addEventListener('click', (event) => {
    event.preventDefault();

    const cropCode = document.getElementById('cropCode').value.trim();
    const commonName = document.getElementById('commonName').value.trim();
    const scientificName = document.getElementById('scientificName').value.trim();
    const cropImage = document.getElementById('cropImage').files[0];
    const category = document.getElementById('category').value.trim();
    const season = document.getElementById('season').value.trim();

    if (!cropCode || !commonName || !scientificName || !cropImage || !category || !season) {
      alert('Please fill all the fields and upload an image!');
      return;
    }

    const imageUrl = URL.createObjectURL(cropImage);

    const newCrop = {
      cropCode: cropCode,
      commonName: commonName,
      scientificName: scientificName,
      image: imageUrl,
      category: category,
      season: season
    };

    addCropCard(newCrop);
    addCropModal.hide();
    cropData.push(newCrop);
  });
});
