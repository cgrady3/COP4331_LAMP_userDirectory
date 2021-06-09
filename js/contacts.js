const input = document.getElementById("searchBox");
const addContactBtn = document.getElementById("add-contact-btn");
const editContactBtn = document.getElementById("edit-contact-btn");
const deleteContactBtn = document.getElementById("delete-contact-btn");
const signOutBtn = document.getElementById("signOut-Btn")
const row = document.getElementById("row-1");

var contactCards = [];
var currentContactCard;

input.addEventListener("input", updateSearch);
addContactBtn.addEventListener("click", addContact);
editContactBtn.addEventListener("click", editContact);
deleteContactBtn.addEventListener("click", deleteContact);
signOutBtn.addEventListener("click", doLogout);

var contact = {firstName:"John", lastName:"Doe", email:"frontendUI@project.com", phone:"812-123-1231", dateCreated:"10-2-2021"};

function updateSearch(e) {
  addCard(contact);

  // for (var i = 0; i < contacts.length; i++){
  //   addCard(contact[i]);
  // }
}

function addContact(){
  const firstName = document.getElementById("add-contact-firstName").value;
  const lastName = document.getElementById("add-contact-lastName").value;
  const email = document.getElementById("add-contact-email").value;
  const number = document.getElementById("add-contact-number").value;

  const contact = {
    UserId: 0,
    contactId: 0,
    firstName: firstName,
    lastName : lastName,
    email: email,
    phone : number,
  }

  console.log(contact);
  addCard(contact);

  // Send information to api
  
  // Close modal
  $('#addModal').modal('hide');
}

function editContact(){
  const contactId = this.getElementById("contact-id").innerText;
  const firstName = document.getElementById("edit-contact-firstName").value;
  const lastName = document.getElementById("edit-contact-lastName").value;
  const email = document.getElementById("edit-contact-email").value;
  const number = document.getElementById("edit-contact-number").value;

  const contact = {
    UserId: 0,
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

  //contactId = this.getElementById("contactId").innerText;
  document.getElementById("edit-contact-firstName").value = name[0];
  document.getElementById("edit-contact-lastName").value = name[1];
  document.getElementById("edit-contact-email").value = body[1].innerText.split(" ")[1];
  document.getElementById("edit-contact-number").value = body[2].innerText.split(" ")[2];
}