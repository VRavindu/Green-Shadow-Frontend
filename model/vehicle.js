document.addEventListener("DOMContentLoaded", () => {
    const vehicleTableBody = document.getElementById("vehicleTableBody");
    const modal = new bootstrap.Modal(document.getElementById("vehicleDetailsModal"));
  
    const vehicleData = [
      {
        code: "V001",
        plate: "AB-1234",
        category: "Car",
        fuelType: "Petrol",
        status: "Active",
        remarks: "Recently serviced"
      },
      {
        code: "V002",
        plate: "CD-5678",
        category: "Truck",
        fuelType: "Diesel",
        status: "Inactive",
        remarks: "Needs repair"
      },
      {
        code: "V003",
        plate: "EF-9101",
        category: "Van",
        fuelType: "Hybrid",
        status: "Active",
        remarks: "On loan"
      }
    ];
  
    vehicleData.forEach(vehicle => {
      const row = document.createElement("tr");
      row.classList.add("vehicle-row");
      row.setAttribute("data-code", vehicle.code);
      row.setAttribute("data-plate", vehicle.plate);
      row.setAttribute("data-category", vehicle.category);
      row.setAttribute("data-fuelType", vehicle.fuelType);
      row.setAttribute("data-status", vehicle.status);
      row.setAttribute("data-remarks", vehicle.remarks);
  
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
        <td>${vehicle.code}</td>
        <td>${vehicle.plate}</td>
        <td>${vehicle.category}</td>
        <td>${vehicle.fuelType}</td>
        <td>${vehicle.status}</td>
        ${actionColumn}
      `;
  
      row.addEventListener("click", () => {
        document.getElementById("modalCode").textContent = vehicle.code;
        document.getElementById("modalPlate").textContent = vehicle.plate;
        document.getElementById("modalCategory").textContent = vehicle.category;
        document.getElementById("modalFuelType").textContent = vehicle.fuelType;
        document.getElementById("modalStatus").textContent = vehicle.status;
        document.getElementById("modalRemarks").textContent = vehicle.remarks;
  
        modal.show();
      });
  
      const updateButton = row.querySelector(".update");
      updateButton.addEventListener("click", (e) => {
        e.stopPropagation();
        alert(`Update vehicle with Code: ${vehicle.code}`);
      });
  
      const deleteButton = row.querySelector(".delete");
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const confirmDelete = confirm(`Are you sure you want to delete vehicle with Code: ${vehicle.code}?`);
        if (confirmDelete) {
          alert(`Vehicle with Code: ${vehicle.code} has been deleted.`);
        }
      });
  
      vehicleTableBody.appendChild(row);
    });
  });
  