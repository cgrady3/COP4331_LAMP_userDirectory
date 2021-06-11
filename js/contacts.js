var UserID = 0;

window.onload = function () {
  validateUser();
};

function validateUser() {
  readCookie();
  if (UserID <= 0) doLogout();
}

var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";

var selectedContact, selectedCard;
const row = document.getElementById("row-1");

$("#searchBox").on("input", function (event) {
  event.preventDefault();

  var input = $(this).val().trim().toLowerCase();
  var url = urlBase + "/SearchContacts" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"search" : "' + input + '", "UserID" : "' + UserID + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        $("#row-1").empty();
        for (var i = 0; i < jsonObject.length; i++) addCard(jsonObject[i]);
      }
    };

    xhr.send(search);
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

$("#add-contact-btn").on("click", function (event) {
  event.preventDefault();

  var error = false;
  var Email = $("#add-contact-email").val().trim().toLowerCase();
  var Phone = $("#add-contact-number").val().trim();
  var FirstName = $("#add-contact-firstName").val().trim().toLowerCase();
  var LastName = $("#add-contact-lastName").val().trim().toLowerCase();
  var FullName = FirstName + " " + LastName;

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

  var contact =
    '{"Email" : "' +
    Email +
    '", "Phone" : "' +
    Phone +
    '", "FirstName" : "' +
    FirstName +
    '", "LastName" : "' +
    LastName +
    '", "FullName" : "' +
    FullName +
    '", "UserID" : "' +
    UserID +
    '"}';
  var url = urlBase + "/AddContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        $("#addModal").modal("hide");
        $("#add-contact-email").val("");
        $("#add-contact-number").val("");
        $("#add-contact-firstName").val("");
        $("#add-contact-lastName").val("");
      }
    };
    xhr.send(contact);
  } catch (err) {
    alert("oh no");
  }
});

$("#edit-contact-btn").on("click", function (event) {
  event.preventDefault();

  var error = false;
  var Email = $("#edit-contact-email").val().trim().toLowerCase();
  var Phone = $("#edit-contact-number").val().trim();
  var FirstName = $("#edit-contact-firstName").val().trim().toLowerCase();
  var LastName = $("#edit-contact-lastName").val().trim().toLowerCase();
  var FullName = FirstName + " " + LastName;
  var ContactID = selectedContact.ContactID;

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

  selectedContact = {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Phone: Phone,
  };

  var contact =
    '{"Email" : "' +
    Email +
    '", "Phone" : "' +
    Phone +
    '", "FirstName" : "' +
    FirstName +
    '", "LastName" : "' +
    LastName +
    '", "FullName" : "' +
    FullName +
    '", "UserID" : "' +
    UserID +
    '", "ContactID" : "' +
    ContactID +
    '"}';

  var url = urlBase + "/UpdateContact" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        updateCard(selectedContact, selectedCard);
        $("#editModal").modal("hide");
        $("#edit-contact-email").val("");
        $("#edit-contact-number").val("");
        $("#edit-contact-firstName").val("");
        $("#edit-contact-lastName").val("");
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
    // get contact info
    var payload =
      '{"UserID" : "' +
      UserID +
      '", "ContactID" : "' +
      selectedContact.ContactID +
      '"}';
    // send request to api
    var url = urlBase + "/DeleteContact" + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          deleteCard(selectedCard);
        }
      };
      xhr.send(payload);
    } catch (err) {
      document.getElementById("contactResult").innerHTML = err.message;
    }
    // Close modal
    $("#editModal").modal("hide");
  }
});

$("#signOut-Btn").on("click", function (event) {
  event.preventDefault();
  UserID = 0;
  document.cookie = "UserID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
});

function addCard(contact) {
  var template = document.getElementById("contactCard");
  var clone = template.content.firstElementChild.cloneNode(true);
  var header = clone.getElementsByClassName("card-header");
  header[0].innerText =
    contact.FirstName.capitalize() + " " + contact.LastName.capitalize();

  var body = clone.querySelectorAll("li");
  body[0].textContent = "Email: " + contact.Email;
  body[1].textContent = "Phone #: " + contact.Phone;

  var footer = clone.getElementsByClassName("card-footer");
  footer[0].innerText = "Date Created: " + contact.DateCreated;

  $(clone).attr("data-id", contact.ContactID);
  clone.addEventListener("click", selectContact);
  row.appendChild(clone);
}

function updateCard(contact, card) {
  var header = card.getElementsByClassName("card-header");
  header[0].innerText =
    contact.FirstName.capitalize() + " " + contact.LastName.capitalize();

  var body = card.querySelectorAll("li");
  body[0].textContent = "Email: " + contact.Email;
  body[1].textContent = "Phone #: " + contact.Phone;

  var footer = card.getElementsByClassName("card-footer");
  footer[0].innerText = "Date Created: " + contact.DateCreated;
}

function deleteCard(card) {
  // Find way to delete specific contact/card
  card.parentNode.removeChild(card);
}

function selectContact() {
  var header = this.getElementsByClassName("card-header");
  var body = this.querySelectorAll("li");
  var name = header[0].innerText.split(" ");

  selectedContact = {
    ContactID: $(this).attr("data-id"),
    FirstName: name[0],
    LastName: name[1],
    Email: body[0].innerText.split(" ")[1],
    Phone: body[1].innerText.split(" ")[2],
  };
  selectedCard = this;

  $("#edit-contact-firstName").val(selectedContact.FirstName);
  $("#edit-contact-lastName").val(selectedContact.LastName);
  $("#edit-contact-email").val(selectedContact.Email);
  $("#edit-contact-number").val(selectedContact.Phone);
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

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
