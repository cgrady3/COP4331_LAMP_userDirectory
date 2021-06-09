window.onload = function () {
  readCookie();
};
var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";
var UserID = 0;
var contactCards = [];
const row = $("#row-1");

$("#searchBox").on("input", function (event) {
  event.preventDefault();

  var input = $(this).val().toLowerCase();
  var url = urlBase + "/SearchContacts" + extension;
  var xhr = new XMLHttpRequest();

  xhr.open("PUT", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Searching: " + input);

        var jsonObject = JSON.parse(xhr.responseText);

        $("#info").text(jsonObject.FirstName);
        $("#info").text(jsonObject.LastName);
        $("#info").text(jsonObject.Phone);
        $("#info").text(jsonObject.Email);
      }

      window.location.href = " contact.html";
    };

    xhr.send();
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$("#add-contact-btn").on("click", function (event) {
  event.preventDefault();

  var error = false;
  var Email = $("#add-contact-email").val().trim().toLowerCase();
  var Phone = $("#add-contact-number").val().trim();

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
  if (error) {
    location.reload();
    return;
  }

  var contact = {
    UserID: UserID,
    FirstName: $("#add-contact-firstName").val().trim().toLowerCase(),
    LastName: $("#add-contact-lastName").val().trim().toLowerCase(),
    Email: Email,
    Phone: Phone,
  };

  var url = urlBase + "/AddContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
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

        window.location.href = "contact.html";
      }
    };
    xhr.send(contact);
    console.log("Contact info sent");
    addCard(contact);
    $("#add-contact-email").val("");
    $("#add-contact-number").val("");
    $("#add-contact-firstName").val("");
    $("#add-contact-lastName").val("");
    $("#addModal").modal("hide");
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$("#edit-contact-btn").on("click", function (event) {
  event.preventDefault();

  var error = false;
  var Email = $("#edit-contact-email").val().trim().toLowerCase();
  var Phone = $("#edit-contact-number").val().trim();

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
  if (error) {
    location.reload();
    return;
  }

  var contact = {
    UserID: UserID,
    FirstName: $("#edit-contact-firstName").val().trim().toLowerCase(),
    LastName: $("#edit-contact-lastName").val().trim().toLowerCase(),
    Email: Email,
    Phone: Phone,
    ContactID: $(this).attr("data-ID"),
  };

  var url = urlBase + "/UpdateContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Contact Updated");
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
        console.log("Contact info sent");
        $("#edit-contact-email").val("");
        $("#edit-contact-number").val("");
        $("#edit-contact-firstName").val("");
        $("#edit-contact-lastName").val("");
        addCard(newContact);
        // Close modal
        $("#editModal").modal("hide");
        window.location.href = "contact.html";
      }
    };
    xhr.send(contact);
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$("#delete-contact-btn").on("click", function (event) {
  event.preventDefault();
  if (
    confirm("Are you sure you want to delete this person from your contacts?")
  ) {
    // delete contact
    // send request to api
  }
});

$("#signOut-Btn").on("click", function (event) {
  event.preventDefault();
  UserID = 0;
  FirstName = "";
  LastName = "";
  document.cookie = "FirstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
});

function addCard(contact) {
  var template = $("#contactCard");

  var clone = template.content.firstElementChild.cloneNode(true);
  var header = clone.getElementsByClassName("card-header");
  header[0].innerText = contact.FirstName + " " + contact.LastName;

  var body = clone.querySelectorAll("li");
  body[0].textContent += contact.Email;
  body[1].textContent += contact.Phone;

  var footer = clone.getElementsByClassName("card-footer");
  footer[0].innerText = "Date Created: " + contact.DateCreated;

  clone.addEventListener("click", updateEditModal);

  contactCards.push(clone);
  contacts.push;
  row.appendChild(clone);
}

function deleteCard() {
  // Find way to delete specific contact/card
}

function updateEditModal() {
  var header = this.getElementsByClassName("card-header");
  var body = this.querySelectorAll("li");

  var name = header[0].innerText.split(" ");

  contactId = $(this).attr("contactId");
  $("#edit-contact-firstName").value = name[0];
  $("#edit-contact-lastName").value = name[1];
  $("#edit-contact-email").value = body[1].innerText.split(" ")[1];
  $("#edit-contact-number").value = body[2].innerText.split(" ")[2];
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
