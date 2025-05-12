const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#userTable tbody");
const dobInput = document.getElementById("dob");
const tableContainer = document.getElementById("userTableContainer");

const today = new Date();
const maxDob = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
const minDob = new Date(
  today.getFullYear() - 55,
  today.getMonth(),
  today.getDate()
);
dobInput.max = maxDob.toISOString().split("T")[0];
dobInput.min = minDob.toISOString().split("T")[0];

function addRow(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted}</td>
      `;
  tableBody.appendChild(row);
}

function displayTable() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  tableBody.innerHTML = "";
  users.forEach(addRow);
  tableContainer.style.display = "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("terms").checked;

  const dobDate = new Date(dob);
  const age = today.getFullYear() - dobDate.getFullYear();
  const ageMonthDiff = today.getMonth() - dobDate.getMonth();
  const isTooYoung = age < 18 || (age === 18 && ageMonthDiff < 0);
  const isTooOld = age > 55 || (age === 55 && ageMonthDiff > 0);
  if (isTooYoung || isTooOld) {
    alert("Age must be between 18 and 55");
    return;
  }

  const user = { name, email, password, dob, termsAccepted };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  form.reset();
  displayTable();
});
