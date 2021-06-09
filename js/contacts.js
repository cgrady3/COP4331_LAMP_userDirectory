import {urlBase, extension, UserID, doLogout} from '../js/script';

const input = $("#searchBox");
const addContactBtn = $("#add-contact-btn");
const deleteContactBtn = $("#delete-contact-btn");
const signOutBtn = $("#signOut-Btn")
const row = $("#row-1");


var contactCards = [];

input.addEventListener("input", updateSearch);
deleteContactBtn.addEventListener("click", deleteContact);
signOutBtn.addEventListener("click", doLogout);

var contact = {firstName:"John", lastName:"Doe", email:"frontendUI@project.com", phone:"812-123-1231", dateCreated:"10-2-2021"};

function validUser(){
  readCookie();
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
  UserID = 1;
  if (UserID <= 0) {
    window.location.href = "../index.html";
  } else {
    $("userName").innerHTML = "Logged in as " + FirstName + " " + LastName;
  }
}

function updateSearch(e) {
  addCard(contact);
}

$("#add-contact-btn").on("click", function (event) {
  event.preventDefault();
  
  var error = false;
  var Email = $("#add-contact-email").val().trim().toLowerCase();
  var Phone = $("#add-contact-number").val().trim().toLowerCase();


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

  var contact = {
    UserID: UserID,
    FirstName: $("#add-contact-firstName").val().trim().toLowerCase(),
    LastName: $("#add-contact-lastName").val().trim().toLowerCase(),
    Email: Email,
    Phone: Phone
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
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }

  addCard(contact);
  $('#addModal').modal('hide');
});

$("#edit-contact-btn").on("click", function (event) {
  event.preventDefault();
  
  var error = false;
  var Email = $("#edit-contact-email").val().trim().toLowerCase();
  var Phone = $("#edit-contact-number").val().trim().toLowerCase();
  
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

  var contact = {
    UserID: UserID,
    FirstName: $("#edit-contact-firstName").val().trim().toLowerCase(),
    LastName: $("#edit-contact-lastName").val().trim().toLowerCase(),
    Email: Email,
    Phone: Phone,
    ContactID = $(this).attr("data-ID")
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

        window.location.href = "contact.html";
      }
    };
    xhr.send(contact);
    console.log("Contact info sent");
    addCard(newContact);
    // Close modal
    $('#addModal').modal('hide');
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
});

function deleteContact(){
  if(confirm("Are you sure you want to delete this person from your contacts?")){
    // delete contact
    // send request to api
  }
}

function addCard(contact){
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
  contacts.push
  row.appendChild(clone);
}

function deleteCard(){
  // Find way to delete specific contact/card
}

function updateEditModal(){
  var header = this.getElementsByClassName("card-header");
  var body = this.querySelectorAll("li");

  var name = header[0].innerText.split(" ");


  contactId = $(this).attr("contactId");
  $("#edit-contact-firstName").value = name[0];
  $("#edit-contact-lastName").value = name[1];
  $("#edit-contact-email").value = body[1].innerText.split(" ")[1];
  $("#edit-contact-number").value = body[2].innerText.split(" ")[2];

}