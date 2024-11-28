document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");
  const modal = new bootstrap.Modal(document.getElementById("fieldDetailsModal"));
  const addFieldModal = new bootstrap.Modal(document.getElementById("addFieldModal"));

  const fieldData = [
    {
      fieldCode: "F001",
      name: "Rice Field",
      location: "North Side",
      size: "50 acres",
      image1: "/assets/img/field-img.jpg",
      image2: "/assets/img/field1-img.jpg"
    },
    {
      fieldCode: "F002",
      name: "Corn Field",
      location: "South Side",
      size: "30 acres",
      image1: "/assets/img/field-img.jpg",
      image2: "/assets/img/field1-img.jpg"
    },
    {
      fieldCode: "F003",
      name: "Wheat Field",
      location: "West Side",
      size: "40 acres",
      image1: "/assets/img/field-img.jpg",
      image2: "/assets/img/field1-img.jpg"
    }
  ];

  const addFieldButton = document.querySelector('.add-button');
  addFieldButton.addEventListener('click', () => {
    document.getElementById('addFieldForm').reset();
    addFieldModal.show();
  });

  function addFieldCard(field) {
    const card = document.createElement("div");
    card.classList.add("card", "field-card");
    card.style.width = "17rem";
    card.setAttribute("data-code", field.fieldCode);
    card.setAttribute("data-name", field.name);
    card.setAttribute("data-location", field.location);
    card.setAttribute("data-size", field.size);
    card.setAttribute("data-image1", field.image1);
    card.setAttribute("data-image2", field.image2);

    card.innerHTML = `
      <img src="${field.image1}" class="card-img-top" alt="Field Image 1" style="height: 150px; object-fit: cover;">
      <div class="card-content p-3">
        <h5 class="card-title">${field.name}</h5>
        <p class="card-text">Size: ${field.size}</p>
        <p class="card-text">Location: ${field.location}</p>
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

    card.addEventListener("click", (event) => {
      if (event.target.closest(".action-btn")) {
        return;
      }

      document.getElementById("modalCode").textContent = field.fieldCode;
      document.getElementById("modalName").textContent = field.name;
      document.getElementById("modalLocation").textContent = field.location;
      document.getElementById("modalSize").textContent = field.size;
      document.getElementById("modalImage1").src = field.image1;
      document.getElementById("modalImage2").src = field.image2;

      modal.show();
    });

    const updateButton = card.querySelector(".update");
    const deleteButton = card.querySelector(".delete");

    updateButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
      alert(`Update clicked for ${field.fieldCode}`);
    });
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
      const confirmation = confirm(`Are you sure you want to delete ${field.fieldCode}?`);
      if (confirmation) {
        const index = fieldData.findIndex(f => f.fieldCode === field.fieldCode);
        if (index !== -1) {
          fieldData.splice(index, 1);
          cardsContainer.removeChild(card);
        }
      }
    });

    cardsContainer.appendChild(card);
  }

  fieldData.forEach(field => {
    addFieldCard(field);
  });

  document.getElementById('saveFieldButton').addEventListener('click', (event) => {
    event.preventDefault();

    const fieldCode = document.getElementById('fieldCode').value.trim();
    const fieldName = document.getElementById('fieldName').value.trim();
    const fieldLocation = document.getElementById('fieldLocation').value.trim();
    const fieldSize = document.getElementById('fieldSize').value.trim();
    const fieldImage1 = document.getElementById('fieldImage1').files[0];
    const fieldImage2 = document.getElementById('fieldImage2').files[0];

    if (!fieldCode || !fieldName || !fieldLocation || !fieldSize || !fieldImage1 || !fieldImage2) {
      alert('Please fill all the fields and upload both images!');
      return;
    }

    const image1Url = URL.createObjectURL(fieldImage1);
    const image2Url = URL.createObjectURL(fieldImage2);

    const newField = {
      fieldCode: fieldCode,
      name: fieldName,
      location: fieldLocation,
      size: fieldSize,
      image1: image1Url,
      image2: image2Url
    };

    addFieldCard(newField);
    addFieldModal.hide();
    fieldData.push(newField);
  });
});
