document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");
  const modal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));
  const addLogModal = new bootstrap.Modal(document.getElementById("addLogModal"));

  const cropDetailsData = [
    {
      id: "C001",
      date: "2024-11-26",
      details: "Rice plantation started with proper irrigation.",
      season: "Monsoon",
      image: "/assets/img/crop-img.jpg"
    },
    {
      id: "C002",
      date: "2024-11-15",
      details: "Carrot seeds planted, monitoring soil moisture.",
      season: "Spring",
      image: "/assets/img/carrot-img.jpeg"
    },
    {
      id: "C003",
      date: "2024-10-20",
      details: "Spinach planted, expected harvest in 6 weeks.",
      season: "Winter",
      image: "/assets/img/spinach-img.jpg"
    },
    {
      id: "C004",
      date: "2024-11-10",
      details: "Potato tubers planted in well-prepared soil.",
      season: "Autumn",
      image: "/assets/img/potato-img.jpg"
    }
  ];

  const renderCropCards = () => {
    cardsContainer.innerHTML = ''; 
    cropDetailsData.forEach(cardData => {
      const card = document.createElement("div");
      card.classList.add("card", "crop-card");
      card.style.width = "17rem";
      card.setAttribute("data-id", cardData.id);
      card.setAttribute("data-date", cardData.date);
      card.setAttribute("data-details", cardData.details);
      card.setAttribute("data-season", cardData.season);

      card.innerHTML = `
        <img src="${cardData.image}" class="card-img-top" alt="Log Image" style="height: 150px; object-fit: cover;">
        <div class="card-content p-3">
          <h2 class="fs-5">Log Date: ${cardData.date}</h2>
          <p class="mb-1">Log Details: ${cardData.details}</p>
          <p class="mb-2">Season: ${cardData.season}</p>
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
        document.getElementById("modalId").textContent = cardData.id;
        document.getElementById("modalDate").textContent = cardData.date;
        document.getElementById("modalDetails").textContent = cardData.details;
        document.getElementById("modalSeason").textContent = cardData.season;
        document.getElementById("modalImage").src = cardData.image;

        modal.show();
      });

      const updateButton = card.querySelector(".update");
      updateButton.addEventListener("click", (event) => {
        event.stopPropagation(); 
        alert(`Update action triggered for Log ID: ${cardData.id}`);
      });

      const deleteButton = card.querySelector(".delete");
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); 
        alert(`Delete action triggered for Log ID: ${cardData.id}`);
      });

      cardsContainer.appendChild(card);
    });
  };

  renderCropCards();

  document.querySelector(".add-button").addEventListener("click", () => {
    addLogModal.show();
  });

  document.getElementById("addLogForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const logId = document.getElementById("logId").value;
    const logDate = document.getElementById("logDate").value;
    const logDetails = document.getElementById("logDetails").value;
    const logSeason = document.getElementById("logSeason").value;
    const logImage = document.getElementById("logImage").files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
      const newLog = {
        id: logId,
        date: logDate,
        details: logDetails,
        season: logSeason,
        image: event.target.result
      };
      
      cropDetailsData.push(newLog); 
      renderCropCards(); 

      addLogModal.hide(); 
    };

    if (logImage) {
      reader.readAsDataURL(logImage); 
    } else {
      const newLog = {
        id: logId,
        date: logDate,
        details: logDetails,
        season: logSeason,
        image: "/assets/img/default-crop-img.jpg" 
      };
      
      cropDetailsData.push(newLog); 
      renderCropCards(); 

      addLogModal.hide();
    }
  });
});
