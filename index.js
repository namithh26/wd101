document.addEventListener('DOMContentLoaded', function () {
  displayUsersFromStorage();

  document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('acceptTerms').checked;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate age
    const age = getAge(dob);
    if (age < 18 || age > 55) {
      alert("You must be between 18 and 55 years old.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      dob,
      termsAccepted
    };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Update table display
    displayUsersFromStorage();

    // Reset form
    document.getElementById('registrationForm').reset();
  });
});

// Utility: calculate age from DOB
function getAge(dobString) {
  const today = new Date();
  const dob = new Date(dobString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// Display table from stored users
function displayUsersFromStorage() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const tableBody = document.querySelector('#userTable tbody');
  tableBody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.dob}</td>
      <td>${user.termsAccepted}</td>
    `;
    tableBody.appendChild(row);
  });

  // Show or hide the table
  const tableContainer = document.getElementById('userTableContainer');
  tableContainer.style.display = users.length > 0 ? 'block' : 'none';
}

