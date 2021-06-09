import {urlBase, extension, UserID, doLogout} from '../js/script';

const input = $("#searchBox");
const addContactBtn = $("#add-contact-btn");
const deleteContactBtn = $("#delete-contact-btn");
const signOutBtn = $("#signOut-Btn")
const row = $("#row-1");

var contactCards = [];
var currentContactCard;

input.addEventListener("input", updateSearch);
deleteContactBtn.addEventListener("click", deleteContact);
signOutBtn.addEventListener("click", doLogout);

function updateSearch(e) {
  addCard(contact);

  // for (var i = 0; i < contacts.length; i++){
  //   addCard(contact[i]);
  // }
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
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }

  console.log(contact);
  $('#editModal').modal('hide');
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
  header[0].innerText = contact.firstName + " " + contact.lastName;

  var body = clone.querySelectorAll("li");
  body[1].textContent += contact.email;
  body[2].textContent += contact.phone;

  var footer = clone.getElementsByClassName("card-footer");
  footer[0].innerText = "Date Created: " + contact.dateCreated;

  clone.addEventListener("click", updateEditModal);

  contactCards.push(clone);
  contacts.push
  row.appendChild(clone);
}

function deleteCards(){
  var length = contactCards.length;
  for (var i = 0; i < length; i++){
    row.removeChild(contactCards.shift());
    numContacts--;
  }
}

function updateEditModal(){
  currentContactCard = this;
  var header = this.getElementsByClassName("card-header");
  var body = this.querySelectorAll("li");

  var name = header[0].innerText.split(" ");

  contactId = this.getElementById("contactId").innerText;
  $("#edit-contact-firstName").value = name[0];
  $("#edit-contact-lastName").value = name[1];
  $("#edit-contact-email").value = body[1].innerText.split(" ")[1];
  $("#edit-contact-number").value = body[2].innerText.split(" ")[2];
}