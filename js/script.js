var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";
var UserID = 0;

window.onload = function () {
  $("#login-error").text("");
  $("#signup-error").text("");
};

function loginUser() {
  UserID = 0;

  var form = document.getElementById("login-form");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);
  var login = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();
  // hashing password
  Password = md5(Password);

  var jsonPayload =
    '{"Email" : "' + login + '", "Password" : "' + Password + '"}';
  var url = urlBase + "/Login" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        if (jsonObject.error !== "") {
          $("#login-error").text("Invalid username/password");
          return;
        }

        UserID = jsonObject.results[0];
        saveCookie();
        window.location.href = "/pages/contact.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err.message);
  }
}

function signUp() {
  var error = true;

  var Email = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();
  var FirstName = $("#first-name").val().trim().toLowerCase();
  var LastName = $("#last-name").val().trim().toLowerCase();
  var form = document.getElementById("login-form");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  var errorMsg = "";
  // validating password length
  if (!regex.test(Email)) {
    errorMsg = "Invalid email";
  } else if (Password.length < 8 || Password.length > 15) {
    errorMsg = "Invalid password length";
  } else {
    error = false;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  if (error) {
    $("#signup-error").text(errorMsg);
    return;
  }

  // hashing password
  Password = md5(Password);

  var jsonPayload =
    '{"Email" : "' +
    Email +
    '", "Password" : "' +
    Password +
    '", "FirstName" : "' +
    FirstName +
    '", "LastName" : "' +
    LastName +
    '"}';

  var url = urlBase + "/RegisterUser" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        if (jsonObject.error != "") {
          $("#signup-error").text(jsonObject.error);
          return;
        }

        UserID = jsonObject.results[0];
        saveCookie();

        window.location.href = "contact.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    // what is this displaying???
    alert(err);
    location.reload();
  }
}

function saveCookie() {
  var minutes = 20;
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = "UserID=" + UserID + ";expires=" + date.toGMTString();
}

function readCookie() {
  UserID = -1;
  var data = document.cookie;
  var splits = data.split(",");
  for (let i = 0; i < splits.length; i++) {
    var thisOne = splits[i].trim();
    var tokens = thisOne.split("=");
    if (tokens[0] === "UserID") {
      UserID = parseInt(tokens[1].trim());
    }
  }

  if (UserID <= 0) {
    window.location.href = "index.html";
  } else {
    $("userName").innerHTML = "Logged in as " + FirstName + " " + LastName;
  }
}
