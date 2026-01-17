// -------------------------------
// GET all requests from storage
// -------------------------------
function getRequests() {
  var data = localStorage.getItem("requests");
  return data ? JSON.parse(data) : [];
}

// -------------------------------
// SAVE requests to storage
// -------------------------------
function saveRequests(requests) {
  localStorage.setItem("requests", JSON.stringify(requests));
}

// -------------------------------
// CREATE a new request
// -------------------------------
function createRequest(event) {
  event.preventDefault();

  var title = document.getElementById("title").value;
  var category = document.getElementById("category").value;
  var description = document.getElementById("description").value;
  var deadline = document.getElementById("deadline").value;

   var user = JSON.parse(localStorage.getItem("loggedInUser"));


  var request = {
    id: Date.now(),
    title: title,
    category: category,
    description: description,
    deadline: deadline,
    status: "OPEN",
    createdBy: user.email,
    acceptedBy: null
  };

  var requests = getRequests();
  requests.push(request);
  saveRequests(requests);

  alert("Request created successfully");
  window.location.href = "dashboard.html";
}

// -------------------------------
// LOAD OPEN requests (Browse page)
// -------------------------------
function loadOpenRequests() {
  var requests = getRequests();
  var list = document.getElementById("requestList");

  list.innerHTML = "";

  requests.forEach(function (req) {
    if (req.status === "OPEN") {
      var li = document.createElement("li");

      li.innerHTML =
        "<strong>" + req.title + "</strong><br>" +
        "Category: " + req.category + "<br>" +
        "Description: " + req.description + "<br>" +
        "<button onclick='acceptRequest(" + req.id + ")'>Accept</button>";

      list.appendChild(li);
    }
  });
}

// -------------------------------
// ACCEPT a request
// -------------------------------
function acceptRequest(id) {
 var user = JSON.parse(localStorage.getItem("loggedInUser"));

  var requests = getRequests();

  requests.forEach(function (req) {
    if (req.id === id && req.status === "OPEN") {
      req.status = "ACCEPTED";
      req.acceptedBy = user.email;
    }
  });

  saveRequests(requests);
  alert("Request accepted");
  loadOpenRequests();
}



// LOAD requests created by logged-in user
function loadMyRequests(showComplete) {
  var user = JSON.parse(localStorage.getItem("loggedInUser"));
  var requests = getRequests();
  var list = document.getElementById("myRequestList");

  list.innerHTML = "";

  requests.forEach(function (req) {
    if (req.createdBy === user.email) {
      var li = document.createElement("li");

      li.innerHTML =
        "<strong>" + req.title + "</strong><br>" +
        "Category: " + req.category + "<br>" +
        "Status: " + req.status;

      // show Complete button only if ACCEPTED
      if (showComplete && req.status === "ACCEPTED") {
        li.innerHTML +=
          "<br><button onclick='completeRequest(" + req.id + ")'>Mark Completed</button>";
      }

      list.appendChild(li);
    }
  });
}



// LOAD requests accepted by logged-in user
function loadAcceptedRequests() {
var user = JSON.parse(localStorage.getItem("loggedInUser"));

  var requests = getRequests();
  var list = document.getElementById("acceptedList");

  list.innerHTML = "";

  requests.forEach(function (req) {
    if (req.acceptedBy === user.email) {
      var li = document.createElement("li");

      li.innerHTML =
        "<strong>" + req.title + "</strong><br>" +
        "Category: " + req.category + "<br>" +
        "Status: " + req.status;

      list.appendChild(li);
    }
  });
}



// MARK request as COMPLETED (only creator)
function completeRequest(id) {
  var user = JSON.parse(localStorage.getItem("loggedInUser"));
  var requests = getRequests();

  requests.forEach(function (req) {
    if (req.id === id && req.createdBy === user.email && req.status === "ACCEPTED") {
      req.status = "COMPLETED";
    }
  });

  saveRequests(requests);
  alert("Request marked as completed");
  loadMyRequests(true);
}

function loadDashboardStats() {
  var user = JSON.parse(localStorage.getItem("loggedInUser"));
  var requests = getRequests();

  var total = 0;
  var accepted = 0;
  var completed = 0;

  requests.forEach(function (req) {
    if (req.createdBy === user.email) {
      total++;
      if (req.status === "ACCEPTED") accepted++;
      if (req.status === "COMPLETED") completed++;
    }
  });

  document.getElementById("totalCount").innerText = total;
  document.getElementById("acceptedCount").innerText = accepted;
  document.getElementById("completedCount").innerText = completed;
}
