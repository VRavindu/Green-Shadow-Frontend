document.addEventListener("DOMContentLoaded", () => {
  const vehicleTableBody = document.getElementById("vehicleTableBody");
  const vehicleDetailsModal = new bootstrap.Modal(document.getElementById("vehicleDetailsModal"));
  const addVehicleModal = new bootstrap.Modal(document.getElementById("addVehicleModal"));

  const vehicleData = [
    {
      code: "V001",
      plateNo: "AB123CD",
      category: "Truck",
      fuelType: "Diesel",
      status: "Available",
      remarks: "Good condition"
    },
    {
      code: "V002",
      plateNo: "EF456GH",
      category: "SUV",
      fuelType: "Petrol",
      status: "In Use",
      remarks: "Scheduled for maintenance"
    },
    {
      code: "V003",
      plateNo: "IJ789KL",
      category: "Van",
      fuelType: "Electric",
      status: "Under Maintenance",
      remarks: "Battery replacement required"
    }
  ];
  function renderVehicleTable() {
    vehicleTableBody.innerHTML = "";
    vehicleData.forEach(vehicle => {
      const row = document.createElement("tr");
      row.classList.add("vehicle-row");
      row.setAttribute("data-code", vehicle.code);

      row.innerHTML = `
        <td>${vehicle.code}</td>
        <td>${vehicle.plateNo}</td>
        <td>${vehicle.category}</td>
        <td>${vehicle.fuelType}</td>
        <td>${vehicle.status}</td>
        <td>
          <button class="action-btn update btn btn-link p-0" title="Update">
            <img src="/assets/icon/update.svg" alt="Update" style="width: 20px;">
          </button>
          <button class="action-btn delete btn btn-link p-0" title="Delete">
            <img src="/assets/icon/trash-delete-bin.svg" alt="Delete" style="width: 20px;">
          </button>
        </td>
      `;

      row.addEventListener("click", () => {
        document.getElementById("modalCode").textContent = vehicle.code;
        document.getElementById("modalPlate").textContent = vehicle.plateNo;
        document.getElementById("modalCategory").textContent = vehicle.category;
        document.getElementById("modalFuelType").textContent = vehicle.fuelType;
        document.getElementById("modalStatus").textContent = vehicle.status;
        document.getElementById("modalRemarks").textContent = vehicle.remarks;
        vehicleDetailsModal.show();
      });

      row.querySelector(".update").addEventListener("click", (e) => {
        e.stopPropagation(); 
        alert(`Update vehicle with code: ${vehicle.code}`);
      });

      row.querySelector(".delete").addEventListener("click", (e) => {
        e.stopPropagation(); 
        const confirmDelete = confirm(`Are you sure you want to delete the vehicle with code: ${vehicle.code}?`);
        if (confirmDelete) {
          const index = vehicleData.findIndex(v => v.code === vehicle.code);
          if (index > -1) {
            vehicleData.splice(index, 1); 
            renderVehicleTable(); 
          }
        }
      });

      vehicleTableBody.appendChild(row);
    });
  }

  renderVehicleTable();

  const addVehicleButton = document.querySelector(".add-button");
  addVehicleButton.addEventListener("click", () => {
    document.getElementById("addVehicleForm").reset(); 
    addVehicleModal.show();
  });

  const addVehicleForm = document.getElementById("addVehicleForm");
  addVehicleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const vehicleCode = document.getElementById("vehicleCode").value.trim();
    const plateNo = document.getElementById("plateNo").value.trim();
    const category = document.getElementById("vehicleCategory").value.trim();
    const fuelType = document.getElementById("fuelType").value.trim();
    const status = document.getElementById("status").value;
    const remarks = document.getElementById("remarks").value.trim();

    if (!vehicleCode || !plateNo || !category || !fuelType || !status) {
      alert("Please fill in all the required fields!");
      return;
    }

    vehicleData.push({
      code: vehicleCode,
      plateNo: plateNo,
      category: category,
      fuelType: fuelType,
      status: status,
      remarks: remarks
    });

    renderVehicleTable();
    addVehicleModal.hide();
  });
});
