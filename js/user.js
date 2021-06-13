var UserID = 0;

window.onload = function () {
  validateUser();
  $("#edit-error-message").text("");
  getNumContacts();
};

function validateUser() {
  readCookie();
  if (UserID <= 0) doLogout();
}

var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";

$("#edit-user-Btn").on("click", function (event) {
  event.preventDefault();

  var Email = $("#edit-user-email").val().trim().toLowerCase();
  var FirstName = $("#edit-user-firstName").val().trim().toLowerCase();
  var LastName = $("#edit-user-lastName").val().trim().toLowerCase();
  var Password = $("#edit-user-password").val().trim();

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  if (!regex.test(Email)) {
    $("#edit-error-message").text("Please Enter Valid Email Address");
    return;
  }

  var user =
    '{"Email" : "' +
    Email +
    '", "FirstName" : "' +
    FirstName +
    '", "LastName" : "' +
    LastName +
    '", "UserID" : "' +
    UserID +
    '", "Password" : "' +
    Password +
    '"}';

  var url = urlBase + "/UpdateUser" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // something to let them know their info has been updated
        alert("Your Account Information has been Successfully Updated");
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

$("#delete-user-Btn").on("click", function (event) {
  event.preventDefault();
  if (
    confirm(
      "Are you sure you want to delete your account with Contactful Delivery?"
    )
  ) {
    // get contact info
    var payload = '{"UserID" : "' + UserID + '"}';
    // send request to api
    var url = urlBase + "/DeleteUser" + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          doLogout();
        }
      };
      xhr.send(payload);
    } catch (err) {
      console.log(err.message);
    }
  }
});

$("#update-userBtn").on("click", function (event) {
  event.preventDefault();

  var url = urlBase + "/GetUser" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"UserID" : "' + UserID + '"}';
  console.log(search);

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);

        $("#edit-user-firstName").val(jsonObject.FirstName);
        $("#edit-user-lastName").val(jsonObject.LastName);
        $("#edit-user-email").val(jsonObject.Email);
        $("#edit-user-password").val(jsonObject.Password);
        $("#edit-error-message").text("");
      }
    };

    xhr.send(search);
  } catch (err) {
    console.log(err.message);
  }
});

function getNumContacts(){

  var url = urlBase + "/SearchAllContacts" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"UserID" : "' + UserID + '"}';
  console.log(search);

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        if (jsonObject.length === undefined) {
          $("#numContacts").text("Number of Contacts: 0");
        } else {
          $("#numContacts").text("Number of Contacts: " + jsonObject.length);
        }
       
      }
    };

    xhr.send(search);
  } catch (err) {
    console.log(err.message);
  }
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
}

function doLogout() {
  UserID = 0;
  document.cookie = "expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
