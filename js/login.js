// Function to toggle between Login and Registration forms
function toggleForms() {
    var loginForm = document.getElementById("login-form");
    var registrationForm = document.getElementById("registration-form");
    var welcomeSection = document.getElementById("welcome-section");
    var formSection = document.getElementById("form-section");

    if (loginForm.style.display === "none") {
      // Switch to Login Form
      loginForm.style.display = "block";
      registrationForm.style.display = "none";
      welcomeSection.style.order = "1";  // Moves Welcome Section to right
      formSection.style.order = "2";  // Moves Form Section to left
    } else {
      // Switch to Registration Form
      loginForm.style.display = "none";
      registrationForm.style.display = "block";
      welcomeSection.style.order = "2";  // Moves Welcome Section to left
      formSection.style.order = "1";  // Moves Form Section to right
    }
  }