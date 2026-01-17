// register user
 function registerUser(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var year = document.getElementById("year").value;
  var department = document.getElementById("department").value;
  var password = document.getElementById("password").value;

  var users = JSON.parse(localStorage.getItem("users")) || [];

  // check if email already exists
  var exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists");
    return;
  }

  var user = {
    name: name,
    email: email,
    year: year,
    department: department,
    password: password
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");
  window.location.href = "login.html";
}

// login user

function loginUser(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Wrong email or password");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  alert("Login successful");
  window.location.href = "dashboard.html";
}


// LOGOUT USER
function logoutUser() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}


// CHECK LOGIN STATUS
function checkLogin() {
  var loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    window.location.href = "login.html";
  }
}

function loadProfile() {
  var user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profileYear").innerText = user.year;
    document.getElementById("profileDept").innerText = user.department;
  }
}



