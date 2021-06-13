var UserID = 0;

window.onload = function () {
  validateUser();
  $("#add-error-message").text("");
  $("#edit-error-message").text("");
};

function validateUser() {
  readCookie();
  if (UserID <= 0) doLogout();
}

var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";

$("#edit-user-Btn").on("click", function (event) {
    event.preventDefault();
  
    var error = false;
    var Email = $("#edit-user-email").val().trim().toLowerCase();
    var FirstName = $("#edit-user-firstName").val().trim().toLowerCase();
    var LastName = $("#edit-user-lastName").val().trim().toLowerCase();
    var Password = $("#edit-user-password").val().trim();
  
    // validate email format
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
  
    if (!regex.test(Email)) {
      alert("Please Enter Valid Email Address");
      error = true;
    }
  
    // if validation error reload the page and exit
    // this function before API call starts
    if (error) {
      location.reload();
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
          alert("Your Account Information has been Successfully Updated")
        }
      };
      xhr.send(user);
    } catch (err) {
      document.getElementById("contactResult").innerHTML = err.message;
    }
  });

  $("#delete-user-Btn").on("click", function (event) {
    event.preventDefault();
    if (
        confirm("Are you sure you want to delete your account with Contactful Delivery?")
    ) {
      // get contact info
      var payload =
          '{"UserID" : "' +
          UserID +
          '"}';
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
        document.getElementById("contactResult").innerHTML = err.message;
      }
      // Close modal
      $("#deleteModal").modal("hide");
    }
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
    document.cookie = "expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "../index.html";
  }