var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";

var UserID = 0;
var FirstName = "";
var LastName = "";

function loginUser() {
  console.log("User details recieved");
  UserID = 0;
  FirstName = "";
  LastName = "";

  var login = document.getElementById("user-email").value;
  var password = document.getElementById("user-password").value;
  password = md5(password);

  console.log("Login: " + login + "    Password: " + password);

  //document.getElementById("errorMessage").innerHTML = "Logged in";

  var jsonPayload =
      '{"login" : "' + login + '", "password" : "' + password + '"}';
  var url = urlBase + "/Login" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Login info valid");
        console.log("Login:" + login + "    password: " + password);
        var jsonObject = JSON.stringify(xhr.responseText);
        UserID = jsonObject.UserID;

        if (UserID < 1) {
          document.getElementById("loginResult").innerHTML =
              "User/Password combination incorrect";
          return;
        }

        FirstName = jsonObject.FirstName;
        LastName = jsonObject.LastName;

        saveCookie();

        // TODO: Update to actual contact page for logged in user
        window.location.href = "/pages/contact.html";
      }
    };
    xhr.send(jsonPayload);
    console.log("Login info sent");
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function signUp() {
  console.log("User details recieved");
  FirstName = "";
  LastName = "";
  Email = "";


  var email = document.getElementById("user-email").value;
  var password = document.getElementById("user-password").value;
  var firstName = document.getElementById('first-name').value;
  var lastName = document.getElementById('last-name').value;


  password = md5(password);

  console.log("Login: " + email + "    Password: " + password + "   First:" + firstName + "    Last: " + lastName );

  //document.getElementById("errorMessage").innerHTML = "Logged in";

  var jsonPayload =
      '{"Email" : "' + email + '", "Password" : "' + password +'", "FirstName" : "' + firstName + '", "LastName" : "' + lastName +'"}';
  var url = urlBase + "/RegisterUser" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("SignUp Info Valid");
        console.log("Login:" + email + "    password: " + password);
        var jsonObject = JSON.stringify(xhr.responseText);
        UserID = jsonObject.UserID;

        if (UserID < 1) {
          document.getElementById("loginResult").innerHTML =
              "User/Password combination incorrect";
          return;
        }

        FirstName = jsonObject.FirstName;
        LastName = jsonObject.LastName;

        saveCookie();

        // TODO: Update to actual contact page for logged in user
        window.location.href = "../index.html";
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

  if (UserID < 0) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").innerHTML =
        "Logged in as " + FirstName + " " + LastName;
  }
}

function doLogout() {
  UserID = 0;
  FirstName = "";
  LastName = "";
  document.cookie = "FirstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}

export{urlBase, extension, UserID, readCookie, doLogout};