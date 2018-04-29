var householdList = [],
    invalidForm = false,
    currentId = 0;

function validateForm(age, relationship) {
  if (!age || isNaN(age) || parseInt(age) <= 0) {
    addErrorLabel('age', 'Please enter a positive number.')
  }
  if (!relationship) {
    addErrorLabel('rel', 'Please select a relationship.')
  }
}

function addErrorLabel(targetNode, text) {
  invalidForm = true;
  var errorLabel = document.createElement('label');
  errorLabel.classList.add('error');
  errorLabel.style.color = "red";
  errorLabel.style.display = "block";
  target = document.getElementsByName(targetNode)[0];
  errorLabel.textContent = text;
  target.parentNode.insertBefore(errorLabel, target.nextSibling);
}

function clearErrors() {
  invalidForm = false;
  var errors = document.getElementsByClassName('error');
  while(errors.length > 0){
    errors[0].parentNode.removeChild(errors[0]);
  }
}

function createTable() {
  var body = document.getElementsByTagName('body')[0],
      table  = document.createElement('table');
  table.style.width = '100px';
  table.style.border = '1px solid black';
  var row = table.insertRow(0);
  row.insertCell(0).outerHTML = '<th>Age</th>';
  row.insertCell(1).outerHTML = '<th>Relationship</th>';
  row.insertCell(2).outerHTML = '<th>Smoker</th>';
  for (var i = 0; i < 3; i++) {
    row.childNodes[i].style.border = '1px solid black';
  }
  body.appendChild(table);
};

function addRow(data, id) {
  var table = document.getElementsByTagName('table')[0],
      tr = table.insertRow();
  for (var i = 0; i < 3; i++) {
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(data[i]));
    td.style.border = '1px solid black';
  }
  tr.addEventListener('click', function() {
    tr.remove();
    for (var i = 0; i < householdList.length; i++) {
      if (householdList[i].id === id) {
        householdList.splice(i, 1);
      }
    }
    if (!householdList.length) {
      document.getElementsByTagName('table')[0].remove();
    }
  })
}

document.getElementsByClassName('add')[0].addEventListener('click', function(e) {
  e.preventDefault();
  var age = document.getElementsByName('age')[0].value,
      relationship = document.getElementsByName('rel')[0].value,
      smoker = document.getElementsByName('smoker')[0].checked;
  clearErrors();
  validateForm(age, relationship);
  if (invalidForm) { return; }
  familyMember = { 
    id: currentId, 
    age: age, 
    relationship: relationship,
    smoker: smoker,
  }
  if (householdList.length === 0) {
    createTable();
  }
  householdList.push(familyMember);
  addRow([age, relationship, smoker], currentId);
  currentId++;
  document.querySelectorAll('form')[0].reset();
});

document.addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementsByClassName('debug')[0].style.display = 'inline-block';
  document.getElementsByClassName('debug')[0].textContent = JSON.stringify(householdList);
});
