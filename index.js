document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const dataTable = document.getElementById("dataTable");
  const tableBody = document.querySelector("#dataTable tbody");
  const dobError = document.getElementById("dobError");

  let formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];

  function updateTable() {
    tableBody.innerHTML = "";
    if (formDataList.length === 0) {
      dataTable.style.display = "none";
      return;
    }
    dataTable.style.display = "table";

    formDataList.forEach(entry => {
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

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dateInput = document.getElementById("date").value;
    const checkbox = document.getElementById("checkbox").checked;

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

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18 || age > 55) {
      dobError.style.display = "block";
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newData = { name, email, password, date: dateInput, checkbox };
    formDataList.push(newData);
    localStorage.setItem("formDataList", JSON.stringify(formDataList));

    alert("Registration successful");

    form.reset();
    updateTable();
  });

  updateTable();
});

