import { getCookie, saveCookie } from "../../model/tokenService.js";
import { login, saveUser } from "../../model/userService.js";

$("#login-btn").click(function(){
    const email = $("#login-form #email").val()
    const password = $("#login-form #password").val()

    login(email, password)
      .then((response) => {
        //alert("awaaa");
        localStorage.setItem("userEmail", email);
        const token = response.token;
        saveCookie("authToken", token);
        saveCookie("authToken", response.token)
        console.log("Token saved as cookie:", getCookie("authToken") );
        window.location = "/pages/dashboard.html";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
})

$("#registration-form button[type='submit']").on("click", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Collect form data
  const email = $("#email-reg").val();
  const password = $("#password-reg").val();
  const confirmPassword = $("#confirm-password").val();
  const role = $(".form-select").val();

  // Input validation
  if (!email || !password || !confirmPassword || role === "Select your Role") {
      alert("Please fill all the fields correctly.");
      return;
  }

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  // Create user object
  const newUser = {
      email: email,
      password: password,
      role: role,
  };

  // Save user
  saveUser(newUser)
      .then((response) => {
          alert("User registered successfully!");
          console.log("Registered user:", response);
          // Reset the form
          $("#registration-form")[0].reset();
      })
      .catch((error) => {
          alert("Error registering user: " + error.responseText);
          console.error(error);
      });
});
