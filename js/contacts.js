var urlBase = "http://contactfulDelivery.club/API";
var extension = ".php";
var hrefBase = "";
var UserID = 0;
var FirstName = "";
var LastName = "";

const input = document.getElementById("searchBox");
const addContactBtn = document.getElementById("add-contact-btn");
const editContactBtn = document.getElementById("edit-contact-btn");
const deleteContactBtn = document.getElementById("delete-contact-btn");
const signOutBtn = document.getElementById("signOut-Btn")
const row = document.getElementById("row-1");

var contactCards = [];

input.addEventListener("input", updateSearch);
addContactBtn.addEventListener("click", addContact);
editContactBtn.addEventListener("click", editContact);
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

function addContact(){
  const FirstName = document.getElementById("add-contact-firstName").value.trim();
  document.getElementById("add-contact-firstName").value = "";
  const LastName = document.getElementById("add-contact-lastName").value.trim();
  document.getElementById("add-contact-lastName").value = "";
  const Email = document.getElementById("add-contact-email").value.trim().toLowerCase();
  document.getElementById("add-contact-email").value = "";
  const Phone = document.getElementById("add-contact-number").value.trim();
  document.getElementById("add-contact-number").value = "";
  const date = new Date();

  const newContact = {
    UserId: UserID,
    FirstName: FirstName,
    LastName : LastName,
    Email: Email,
    Phone : Phone,
    DateCreate: new Date()
  }
  // Send information to api

  var error = false;

  // allow only numbers for phone number (not (123)345-3453 format)
  if (!$.isNumeric(Phone)) {
    alert("Please Enter Only Numbers for Contact Phone Number");
    error = true;
  }

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  if (!regex.test(Email)) {
    //alert("Please Enter Valid Email Address");
    document.getElementById("add-error-message").innerText="Please Enter Valid Email Address";
    // error = true;
    return;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  // if (error){
  //   location.reload();
  //   return;
  // }

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
    addCard(newContact);
    // Close modal
    $('#addModal').modal('hide');
  } catch (err) {
      alert(err.message);
  }
}

function editContact(){
  const contactId = this.getElementById("contact-id").innerText;
  const firstName = document.getElementById("edit-contact-firstName").value;
  const lastName = document.getElementById("edit-contact-lastName").value;
  const email = document.getElementById("edit-contact-email").value;
  const number = document.getElementById("edit-contact-number").value;

  const contact = {
    UserId: UserId,
    contactId: contactId,
    firstName: firstName,
    lastName : lastName,
    email: email,
    phone : number,
  }

  console.log(contact);
  $('#editModal').modal('hide');

  // Turn contact object into JSON and send to api
}

function deleteContact(){
  if(confirm("Are you sure you want to delete this person from your contacts?")){
    // delete contact
    // send request to api
  }
}

function addCard(contact){
  var template = document.getElementById("contactCard");

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

  document.getElementById("edit-contact-firstName").value = name[0];
  document.getElementById("edit-contact-lastName").value = name[1];
  document.getElementById("edit-contact-email").value = body[0].innerText.split(" ")[1];
  document.getElementById("edit-contact-number").value = body[1].innerText.split(" ")[2];
}