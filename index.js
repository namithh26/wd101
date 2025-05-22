document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const dataTable = document.getElementById("dataTable");
  const tableBody = document.querySelector("#dataTable tbody");
  const dobError = document.getElementById("dobError");

  // Load existing data from localStorage
  let formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];

  // Function to update table
  function updateTable() {
    tableBody.innerHTML = ""; // Clear current rows

    if (formDataList.length === 0) {
      dataTable.style.display = "none";
      return;
    }

    dataTable.style.display = "table";

    formDataList.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>•••••••</td>
        <td>${entry.date}</td>
        <td>${entry.checkbox ? "Yes" : "No"}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dateInput = document.getElementById("date").value;
    const checkbox = document.getElementById("checkbox").checked;

    // Show DOB error or clear it
    dobError.style.display = "none";

    if (!dateInput) {
      dobError.textContent = "Please select a valid date.";
      dobError.style.display = "block";
      return;
    }

    const dob = new Date(dateInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18 || age > 55) {
      dobError.style.display = "block";
      return;
    }

    // If all validations pass, proceed to save data
    const newData = { name, email, password, date: dateInput, checkbox };

    formDataList.push(newData);
    localStorage.setItem("formDataList", JSON.stringify(formDataList));

    alert("Registration successful");

    form.reset(); // Reset form fields
    updateTable(); // Update table
  });

  // Initial table population
  updateTable();
});

