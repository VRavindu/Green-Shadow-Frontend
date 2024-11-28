document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const modal = new bootstrap.Modal(document.getElementById("equipmentDetailsModal"));
  
    const equipmentData = [
      {
        id: "E001",
        name: "Tractor",
        type: "Machinery",
        status: "Operational",
        details: "The tractor is used for plowing fields and is in good condition."
      },
      {
        id: "E002",
        name: "Water Pump",
        type: "Irrigation",
        status: "Under Maintenance",
        details: "Water pump needs repairs before the next irrigation season."
      },
      {
        id: "E003",
        name: "Harvester",
        type: "Machinery",
        status: "Operational",
        details: "The harvester is ready for the upcoming harvest season."
      }
    ];
  
    equipmentData.forEach(equipment => {
      const row = document.createElement("tr");
      row.classList.add("equipment-row");
      row.setAttribute("data-id", equipment.id);
      row.setAttribute("data-name", equipment.name);
      row.setAttribute("data-type", equipment.type);
      row.setAttribute("data-status", equipment.status);
      row.setAttribute("data-details", equipment.details);
  
      const actionColumn = `
        <td>
          <button class="action-btn update btn btn-link p-0" title="Update">
            <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
          </button>
          <button class="action-btn delete btn btn-link p-0" title="Delete">
            <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
          </button>
        </td>
      `;
  
      row.innerHTML = `
        <td>${equipment.id}</td>
        <td>${equipment.name}</td>
        <td>${equipment.type}</td>
        <td>${equipment.status}</td>
        ${actionColumn} <!-- Action buttons -->
      
        
      `;
  
      row.addEventListener("click", () => {
        document.getElementById("modalId").textContent = equipment.id;
        document.getElementById("modalName").textContent = equipment.name;
        document.getElementById("modalType").textContent = equipment.type;
        document.getElementById("modalStatus").textContent = equipment.status;
        document.getElementById("modalDetails").textContent = equipment.details;
  
        modal.show();
      });
  
      const updateButton = row.querySelector(".update");
      updateButton.addEventListener("click", (e) => {
        e.stopPropagation(); 
        alert(`Update equipment with ID: ${equipment.id}`);
      });
  
      const deleteButton = row.querySelector(".delete");
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const confirmDelete = confirm(`Are you sure you want to delete equipment with ID: ${equipment.id}?`);
        if (confirmDelete) {
          alert(`Equipment with ID: ${equipment.id} has been deleted.`);
        }
      });
  
      tableBody.appendChild(row); 
    });
  });
  