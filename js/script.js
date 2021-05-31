var urlBase = "http://contactfulDelivery.club/LAMPAPI";
var extension = ".php";

var userId = 0;
var firstName = "";
var lastName = "";
var selection = searchBy.value;

function loginUser() {
  console.log("User details recieved");
  userId = 0;
  firstName = "";
  lastName = "";

  var login = document.getElementById("user-email").value;
  var password = document.getElementById("user-password").value;
  //	var hash = md5( password );

  console.log("Login: " + login + "    Password: " + password);

  document.getElementById("errorMessage").innerHTML = "Logged in";

  var jsonPayload =
    '{"login" : "' + login + '", "password" : "' + password + '"}';
  var url = urlBase + "/Login" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Login info valid");
        console.log("Login:" + login + "    password: " + password);
        var jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        // TODO: Update to actual contact page for logged in user
        window.location.href = "contacts.html";
      }
    };
    xhr.send(jsonPayload);
    console.log("Login info sent");
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

$("#addContact").on("click", function (event) {
  event.preventDefault();

  var newContact = {
    FirstName: $("#first-name").val().trim().toLowerCase(),
    LastName: $("#last-name").val().trim().toLowerCase(),
    Email: $("#user-email").val().trim().toLowerCase(),
    Phone: $("#number").val().trim().toLowerCase(),
  };

  // where to redirect for url???
  var url = urlBase + "/addContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact Added");
        console.log(
          "Name: " +
            FirstName +
            " " +
            LastName +
            " Email: " +
            Email +
            " Phone: " +
            Phone
        );

        window.location.href = "home.html";
      }
    };
    xhr.send(newContact);
    console.log("Contact info sent");
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$("#searchContacts").input(function (event) {
  event.preventDefault();

  if (!selection)
    alert("Choose to Search By First or Last Name Before Continuing");

  var input = $this.val().toLowerCase();
  var url = urlBase + "/search" + extension;
  var xhr = new XMLHttpRequest();

  readCookie();

  xhr.open(
    "GET",
    "/LAMPAPI/search.php?name=" +
      input +
      "&UserID=" +
      userId +
      "&selection=" +
      selection,
    true
  );

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("retrieving");
      }

      window.location.href = "home.html";
    };

    xhr.send();
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$(".result").on("click", function (event) {
  event.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "/LAMPAPI/search.php?ContactID=" + $(this).attr("data-ID"),
    true
  );

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("retrieving selected contact");
        var jsonObject = JSON.parse(xhr.responseText);

        $("#info").text(jsonObject.firstName);
        $("#info").text(jsonObject.lastName);
        $("#info").text(jsonObject.Phone);
        $("#info").text(jsonObject.Email);
      }

      window.location.href = "home.html";
    };

    xhr.send();
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});


function saveCookie() {
  var minutes = 20;
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  userId = -1;
  var data = document.cookie;
  var splits = data.split(",");
  for (let i = 0; i < splits.length; i++) {
    var thisOne = splits[i].trim();
    var tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").innerHTML =
      "Logged in as " + firstName + " " + lastName;
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}
