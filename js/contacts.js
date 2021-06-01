const input = document.getElementById('searchBox');
const log = document.getElementById('log');

let num = 0;

input.addEventListener('input', updateValue);

function updateValue(e) {
  //log.textContent = e.target.value;
  addCard(num);
  num++;
}

function addCard(num){
    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var row = document.getElementById("row-1");
    var template = document.getElementById('contactCard');

    // Clone the new row and insert it into the table
    var clone = template.content.firstElementChild.cloneNode(true);
    var body = clone.querySelectorAll("li");
    body[0].textContent += num;
    body[1].textContent += "asdasd@asdasd.com";
    body[2].textContent += "asasdasdasd";
    body[3].textContent += "1235646565";
    var date = new Date();
    body[4].textContent += (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear(); 

    clone.addEventListener('click', clickHandler);

    row.appendChild(clone);
}

function clickHandler(){
  console.log(this.querySelectorAll("li")[0].innerText);
}