var urlBase = "http://contactfulDelivery.club/LAMPAPI";
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

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

  // var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
  var jsonPayload =
    '{"login" : "' + login + '", "password" : "' + password + '"}';
  var url = urlBase + "/Login." + extension;

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

$("#addContact").on("click", function (event) {
  event.preventDefault();

  var newContact = {
    FirstName: $("#first-name").val().trim(),
    LastName: $("#last-name").val().trim(),
    Email: $("#user-email").val().trim(),
    Phone: $("#number").val().trim(),
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("user info valid");
        console.log(
          "Name:" +
            FirstName +
            " " +
            LastName +
            "Email: " +
            email +
            " Phone: " +
            Phone
        );

        saveCookie();

        window.location.href = "index.html";
      }
    };
    xhr.send(newContact);
    console.log("Login info sent");
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

// TODO: Reformat to search Contact
function searchContact() {
  var srch = $("#search").val().trim();

  // how to get user ID???
  var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + "}";
  var url = urlBase + "/SearchContacts." + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var jsonObject = JSON.parse(xhr.responseText);

		console.log(jsonObject.results);

		//$("#found-contact").append(jsonObject.results.);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("colorSearchResult").innerHTML = err.message;
  }
}
