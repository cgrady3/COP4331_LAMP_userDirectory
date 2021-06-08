var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";
var hrefBase = "";
var UserID = 0;
var FirstName = "";
var LastName = "";

function loginUser() {
  console.log("User details recieved");
  UserID = 0;
  FirstName = "";
  LastName = "";

  var login = $("#user-Email").val().trim().toLowerCase();
  var Password = $("#user-Password").val().trim();
  // hashing password
  Password = md5(Password);

  console.log("Login: " + login + "    Password: " + Password);

  var jsonPayload =
    '{"login" : "' + login + '", "Password" : "' + Password + '"}';
  var url = urlBase + "/Login" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Login info valid");
        console.log("Login:" + login + "    Password: " + Password);
        var jsonObject = JSON.stringify(xhr.responseText);
        UserID = jsonObject.UserID;

        if (UserID < 1) {
          $("loginResult").innerHTML = "User/Password combination incorrect";
          return;
        }

        FirstName = jsonObject.FirstName;
        LastName = jsonObject.LastName;

        saveCookie();

        window.location.href = "/pages/contact.html";
      }
    };
    xhr.send(jsonPayload);
    console.log("Login info sent");
  } catch (err) {
      alert(err.message);
  }
}

function signUp() {
  console.log("User details recieved");
  FirstName = "";
  LastName = "";
  Email = "";
  var error = false;

  var Email = $("#user-Email").val().trim().toLowerCase();
  var Password = $("#user-Password").val().trim();
  FirstName = $("#first-name").val().trim().toLowerCase();
  LastName = $("#last-name").val().trim().toLowerCase();

  // validating password length
  if (Password.length < 8 || Password.length > 15) {
    alert("Password must be 8-15 characters long");
    error= true;
  }

  // hashing password
  Password = md5(Password);

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  if (!regex.test(Email)) {
    alert("Please Enter Valid Email Address");
    error = true;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  if (error){
     location.reload();
     return;
  }

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
        console.log("SignUp Info Valid");
        console.log("Login:" + Email + "    Password: " + Password);
        var jsonObject = JSON.stringify(xhr.responseText);

        UserID = jsonObject.UserID;
        FirstName = jsonObject.FirstName;
        LastName = jsonObject.LastName;

        saveCookie();

        window.location.href = "contact.html"
      }
    };
    xhr.send(jsonPayload);
    console.log("Login info sent");
  } catch (err) {
    // what is this displaying???
    alert(err);
    location.reload();
  }
}

// create user
// delete user

$("#addContact").on("click", function (event) {
  event.preventDefault();

  var Phone = $("#number").val().trim();
  var Email = $("#user-Email").val().trim().toLowerCase();
  var error = false;

  // allow only numbers for phone number (not (123)345-3453 format)
  if (!$.isNumeric(Phone)) {
    alert("Please Enter Only Numbers for Contact Phone Number");
    error = true;
  }

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  if (!regex.test(Email)) {
    alert("Please Enter Valid Email Address");
    error = true;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  if (error){
    location.reload();
    return;
  }

  var newContact = {
    FirstName: $("#first-name").val().trim().toLowerCase(),
    LastName: $("#last-name").val().trim().toLowerCase(),
    Email: Email,
    Phone: Phone,
  };

  var url = urlBase + "/AddContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
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
      }
    };
    xhr.send(newContact);
    console.log("Contact info sent");
  } catch (err) {
      alert(err.message);
  }
});

$("#searchContacts").input(function (event) {
  event.preventDefault();

  var input = $(this).val().toLowerCase();
  var url = urlBase + "/SearchContacts" + extension;
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url + "?search=" + input + "&UserID=" + UserID, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("retrieving");
      }

      window.location.href = "contacts.html";
    };

    xhr.send();
  } catch (err) {
    $("#contactResult").innerHTML = err.message;
  }
});

$(".result").on("click", function (event) {
  event.preventDefault();

  var url = urlBase + "/DisplayContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    url + "?ContactID=" + $(this).attr("data-ID") + "&UserID=" + UserID,
    true
  );

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("retrieving selected contact");
        var jsonObject = JSON.parse(xhr.responseText);

        $("#info").text(jsonObject.FirstName);
        $("#info").text(jsonObject.LastName);
        $("#info").text(jsonObject.Phone);
        $("#info").text(jsonObject.Email);
      }

      window.location.href = "contacts.html";
    };

    xhr.send();
  } catch (err) {
     $("#info").text(err.message);
  }
});

function validUser(){
  readCookie();
}

function saveCookie() {
  var minutes = 20;
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "FirstName=" +
    FirstName +
    ",LastName=" +
    LastName +
    ",UserID=" +
    UserID +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  UserID = -1;
  var data = document.cookie;
  var splits = data.split(",");
  for (let i = 0; i < splits.length; i++) {
    var thisOne = splits[i].trim();
    var tokens = thisOne.split("=");
    if (tokens[0] === "FirstName") {
      FirstName = tokens[1];
    } else if (tokens[0] === "LastName") {
      LastName = tokens[1];
    } else if (tokens[0] === "UserID") {
      UserID = parseInt(tokens[1].trim());
    }
  }

  if (UserID <= 0) {
    window.location.href = "index.html";
  } else {
    $("userName").innerHTML = "Logged in as " + FirstName + " " + LastName;
  }
}

function doLogout() {
  UserID = 0;
  FirstName = "";
  LastName = "";
  document.cookie = "FirstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
