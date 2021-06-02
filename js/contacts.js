const input = document.getElementById("searchBox");
const createContactBtn = document.getElementById("create-contact-btn");
const row = document.getElementById("row-1");

var contactCards = [];

input.addEventListener("input", updateSearch);
createContactBtn.addEventListener("click", createContact);

var contact = {firstName:"John", lastName:"Doe", email:"asdasdasd@asdasdasdasd.com", phone:"12323534234", dateCreated:"10-2-2021"};

function updateSearch(e) {
  addCard(contact);
}

function createContact(){
  // Get information from modal
    // UserID
    // First name
    // Last name
    // Email
    // Phone number
    // Date created

  // Send information to api
  
  // Close modal
}

function addCard(contact){
  var template = document.getElementById("contactCard");

  // Clone the new row and insert it into the table
  var clone = template.content.firstElementChild.cloneNode(true);
  var header = clone.getElementsByClassName("card-header");
  header[0].innerText = contact.firstName + " " + contact.lastName;

  var body = clone.querySelectorAll("li");
  body[0].textContent += contact.id;
  body[1].textContent += contact.email;
  body[2].textContent += contact.phone;

  var footer = clone.getElementsByClassName("card-footer");
  footer[0].innerText = "Date Created: " + contact.dateCreated;

  clone.addEventListener("click", editCard);

  contactCards.push(clone);
  row.appendChild(clone);
}

function deleteCards(){
  var length = contactCards.length;
  for (var i = 0; i < length; i++){
    row.removeChild(contactCards.shift());
  }
}

function editCard(){
  
}