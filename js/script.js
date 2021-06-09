var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";
var hrefBase = "";
var UserID = 0;

function loginUser() {
  console.log("User details recieved");
  UserID = 0;
  FirstName = "";
  LastName = "";

  var form = document.getElementById("login-form");
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
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
        UserID = jsonObject.results[0];


        if (jsonObject.error === "User Name / Password do not match OR user does not exist") {
          alert("Invalid Email/Password");
          location.reload();
          return;
        }
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

  var Email = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();
  FirstName = $("#first-name").val().trim().toLowerCase();
  LastName = $("#last-name").val().trim().toLowerCase();
  var form = document.getElementById("login-form");
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
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
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.error === "User Already Exists")
        {
          alert(jsonObject.error);
          location.reload();
          return;
        }
        UserID = jsonObject.UserID;

        saveCookie();

        window.location.href = "contact.html"
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
  document.cookie =
      "UserID=" +
      UserID +
      ";expires=" +
      date.toGMTString();
  console.log(document.cookie);
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



