// REGISTER USER
function registerUser(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var year = document.getElementById("year").value;
  var department = document.getElementById("department").value;
  var password = document.getElementById("password").value;

  var user = {
    name: name,
    email: email,
    year: year,
    department: department,
    password: password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful");

  window.location.href = "login.html";
}

// LOGIN USER
function loginUser(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser === null) {
    alert("No user found. Please register first.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("loggedIn", "true");

    alert("Login successful");


    window.location.href = "dashboard.html";
  } else {
    alert("Wrong email or password");
  }
}

// LOGOUT USER
function logoutUser() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// CHECK LOGIN STATUS
function checkLogin() {
  var loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    window.location.href = "login.html";
  }
}

// LOAD USER DATA ON PROFILE PAGE
function loadProfile() {
  var user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profileYear").innerText = user.year;
    document.getElementById("profileDept").innerText = user.department;
  }
}


