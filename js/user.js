var UserID = 0;
var updatePass = false;
var updateEmail = false;
var updateFirst = false;
var updateLast = false;

window.onload = function () {
  //validateUser();
  $("#edit-error-message").text("");
  if (UserID >= 0) getNumContacts();
};

function validateUser() {
  readCookie();
  if (UserID <= 0) doLogout();
}

var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";

$("#edit-user-btn").on("click", function (event) {
  event.preventDefault();

  var Email = $("#edit-user-email").val().trim().toLowerCase();
  var FirstName = $("#edit-user-firstName").val().trim().toLowerCase();
  var LastName = $("#edit-user-lastName").val().trim().toLowerCase();
  var Password = $("#edit-user-password").val().trim();

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  if (updateEmail && !regex.test(Email)) {
    $("#edit-error-message").text("Please Enter Valid Email Address");
    return;
  }

  if (updatePass) {
    if (Password.length < 8 || Password.length > 15) {
      $("#edit-error-message").text("Invalid password length");
      return;
    } else {
      // hashing password
      Password = md5(Password);
    }
  }

  if (updateFirst || updateLast) {
    if (!FirstName.length || !LastName.length) {
      $("#edit-error-message").text("Please enter a new name for your account");
      return;
    }
  }


  if (updateEmail) updateUserEmail(Email);
  if (updatePass) updateUserPass(Password);
  if (updateFirst) updateUserFirst(FirstName);
  if (updateLast) updateUserLast(LastName);
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

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        $("#edit-user-firstName").val(jsonObject.FirstName);
        $("#edit-user-lastName").val(jsonObject.LastName);
        $("#edit-user-email").val(jsonObject.Email);
        $("#update-firstName").show();
        $("#edit-user-firstName").hide();
        $("#update-lastName").show();
        $("#edit-user-lastName").hide();
        $("#update-email").show();
        $("#edit-user-email").hide();
        $("#update-pass").show();
        $("#edit-user-password").hide();
        $("#edit-error-message").text("");
      }
    };

    xhr.send(search);
  } catch (err) {
    console.log(err.message);
  }
});

$("#update-pass").on("click", function (event) {
  event.preventDefault();
  $("#update-pass").hide();
  $("#edit-user-password").show();
  updatePass = true;
});

$("#update-email").on("click", function (event) {
  event.preventDefault();
  $("#update-email").hide();
  $("#edit-user-email").show();
  updateEmail = true;
});

$("#update-firstName").on("click", function (event) {
  event.preventDefault();
  $("#update-firstName").hide();
  $("#edit-user-firstName").show();
  updateFirst = true;
});

$("#update-lastName").on("click", function (event) {
  event.preventDefault();
  $("#update-lastName").hide();
  $("#edit-user-lastName").show();
  updateLast = true;
});

function getNumContacts() {
  var url = urlBase + "/SearchAllContacts" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"UserID" : "' + UserID + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

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

function updateUserEmail(Email) {
  var user = '{"Email" : "' + Email + '", "UserID" : "' + UserID + '"}';

  var url = urlBase + "/UpdateUserEmail" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject == -1) {
          $("#edit-error-message").text("Email is already registed with Contactful Delivery");
        }
        else
        {
          $("#edit-error-message").text("Your Account Information has been Successfully Updated");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
}

function updateUserPass(Password) {
  var user = '{"UserID" : "' + UserID + '", "Password" : "' + Password + '"}';

  var url = urlBase + "/UpdateUserPass" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
              "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
        updatePass = false;
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
}

function updateUserFirst(FirstName) {
  var user = '{"FirstName" : "' + FirstName + '", "UserID" : "' + UserID + '"}';

  var url = urlBase + "/UpdateUserFirst" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
              "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
        updateFirst = false;
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
}

function updateUserLast(LastName) {
  var user = '{"LastName" : "' + LastName + '", "UserID" : "' + UserID + '"}';

  var url = urlBase + "/UpdateUserLast" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
              "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
        updateLast = false;
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
}

$("#signOut-Btn").on("click", function (event) {
  event.preventDefault();
  doLogout();
});

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
  document.cookie = "UserID = 0; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
