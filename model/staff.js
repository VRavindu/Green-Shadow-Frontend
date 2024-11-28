document.addEventListener("DOMContentLoaded", () => {
    const staffTableBody = document.getElementById("staffTableBody");
    const modal = new bootstrap.Modal(document.getElementById("staffDetailsModal"));

    const staffData = [
        {
            id: "S001",
            firstName: "John",
            lastName: "Doe",
            designation: "Manager",
            gender: "Male",
            joinedDate: "2020-05-10",
            dob: "1990-12-01",
            contactNo: "1234567890",
            email: "john.doe@example.com",
            role: "Admin",
            address: ["123 Main Street", "Suite 200", "Springfield", "State", "Country"]
        },
        {
            id: "S002",
            firstName: "Jane",
            lastName: "Smith",
            designation: "Technician",
            gender: "Female",
            joinedDate: "2021-08-15",
            dob: "1995-07-22",
            contactNo: "9876543210",
            email: "jane.smith@example.com",
            role: "Staff",
            address: ["456 Elm Street", "Apt 5B", "Metropolis", "Region", "Country"]
        },
        {
            id: "S003",
            firstName: "Alice",
            lastName: "Johnson",
            designation: "HR Specialist",
            gender: "Female",
            joinedDate: "2022-07-15",
            dob: "1992-03-25",
            contactNo: "2345678901",
            email: "alice.johnson@example.com",
            role: "HR",
            address: ["789 Oak Avenue", "Building 3", "Downtown", "State", "Country"]
        }
    ];

    staffData.forEach(staff => {
        const row = document.createElement("tr");
        row.classList.add("staff-row");
        row.setAttribute("data-id", staff.id);
        row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.firstName} ${staff.lastName}</td>
            <td>${staff.address[0]}</td>
            <td>${staff.contactNo}</td>
            <td>${staff.role}</td>
            <td>${staff.gender}</td>
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
            document.getElementById("modalId").textContent = staff.id;
            document.getElementById("modalFirstName").textContent = staff.firstName;
            document.getElementById("modalLastName").textContent = staff.lastName;
            document.getElementById("modalDesignation").textContent = staff.designation;
            document.getElementById("modalGender").textContent = staff.gender;
            document.getElementById("modalJoinedDate").textContent = staff.joinedDate;
            document.getElementById("modalDOB").textContent = staff.dob;
            document.getElementById("modalContact").textContent = staff.contactNo;
            document.getElementById("modalEmail").textContent = staff.email;
            document.getElementById("modalRole").textContent = staff.role;

            const addressList = document.getElementById("modalAddressList");
            addressList.innerHTML = "";
            staff.address.forEach(line => {
                const li = document.createElement("li");
                li.textContent = line;
                addressList.appendChild(li);
            });

            modal.show();
        });

        const updateButton = row.querySelector(".update");
        updateButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            alert(`Update staff with ID: ${staff.id}`);
        });

        const deleteButton = row.querySelector(".delete");
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const confirmDelete = confirm(`Are you sure you want to delete staff with ID: ${staff.id}?`);
            if (confirmDelete) {
                alert(`Staff with ID: ${staff.id} has been deleted.`);
            }
        });

        staffTableBody.appendChild(row);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const addStaffModal = new bootstrap.Modal(document.getElementById("addStaffModal"));
    const staffTableBody = document.getElementById("staffTableBody");
  
    const addStaffButton = document.querySelector(".add-button");
    addStaffButton.addEventListener("click", () => {
      document.getElementById("addStaffForm").reset();
      addStaffModal.show();
    });
  
    const saveStaffButton = document.getElementById("saveStaffButton");
    saveStaffButton.addEventListener("click", () => {
      const staffId = document.getElementById("staffId").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const designation = document.getElementById("designation").value.trim();
      const gender = document.getElementById("gender").value;
      const joinedDate = document.getElementById("joinedDate").value;
      const dob = document.getElementById("dob").value;
      const contactNo = document.getElementById("contactNo").value.trim();
      const email = document.getElementById("email").value.trim();
      const role = document.getElementById("role").value;
      const address1 = document.getElementById("address1").value.trim();
      const address2 = document.getElementById("address2").value.trim();
      const address3 = document.getElementById("address3").value.trim();
      const address4 = document.getElementById("address4").value.trim();
      const address5 = document.getElementById("address5").value.trim();
  
      if (!staffId || !firstName || !lastName || !designation || !gender || !joinedDate || !dob || !contactNo || !email || !role || !address1 || !address2 || !address3 || !address4 || !address5) {
        alert("Please fill all fields!");
        return;
      }
        const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${staffId}</td>
        <td>${firstName} ${lastName}</td>
        <td>${address1}, ${address2}, ${address3}, ${address4}, ${address5}</td>
        <td>${contactNo}</td>
        <td>${role}</td>
        <td>${gender}</td>
        <td>
          <button class="btn btn-info view-btn">View</button>
          <button class="btn btn-warning edit-btn">Edit</button>
          <button class="btn btn-danger delete-btn">Delete</button>
        </td>
      `;
    staffTableBody.appendChild(newRow);
    addStaffModal.hide();
    });
  });
  