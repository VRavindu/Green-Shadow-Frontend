document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");
  const modal = new bootstrap.Modal(document.getElementById("cropDetailsModal"));

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

    cardsContainer.appendChild(card);
  });
});
