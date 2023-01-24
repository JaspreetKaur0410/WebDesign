//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");

/***************************************** EXPAND ROW *************************************************************** */
function expand(obj) {
  var detailsRow = obj.parentNode.parentNode.nextElementSibling;

  if (detailsRow.tagName == "TD") {
    detailsRow = obj.parentNode.parentElement.parentElement.nextElementSibling;
  }
  if (detailsRow.style.display == "none" || detailsRow.style.display == "") {
    detailsRow.style.display = "block";
  } else {
    detailsRow.style.display = "none";
  }
}
/***************************************** EXPAND ROW *************************************************************** */

function onLoad() {
  var tr = document.getElementsByClassName("dropDownTextArea");
  for (drop of tr) {
    drop.style.display = "none";
  }
  var table = document.getElementById("myTable");
  var col = table.getElementsByTagName("th")[8];
  if (col) {
    col.style.display = "none";
  }
  disable();
}

var submitButton = document.getElementById("button");
function disable() {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = "Grey";
  submitButton.style.border = "none";
  var table = document.getElementById("myTable");
  var col = table.getElementsByTagName("th")[8];
  if (col) {
    col.style.display = "none";
  }
}

/***************************************** ENABLE *************************************************************** */
function enable() {
  submitButton.disabled = false;
  submitButton.style.backgroundColor = "Orange";
  submitButton.style.border = "thick solid Orange";
}
/***************************************** ENABLE *************************************************************** */

/***************************************** ADD ROW *************************************************************** */
var table = document.getElementById("myTable");
var count = 3;
function add() {
  let row = document.createElement("TR");
  var totalcolumns = 9;
  for (let i = 1; i <= totalcolumns; i++) {
    let cell = document.createElement("Cell");
    let col = document.createElement("TD");
    if (i == 1) {
      let checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("onchange", "checkBoxChange(this)");
      cell.appendChild(checkBox);
      cell.appendChild(document.createElement("br"));
      cell.appendChild(document.createElement("br"));
      let image = document.createElement("img");
      image.setAttribute("src", "down.png");
      image.setAttribute("width", "25px");
      image.setAttribute("onclick", "expand(this)");
      cell.appendChild(image);
    } else if (i == 2) {
      count++;
      cell.innerHTML = "Student " + `${count}`;
    } else if (i == 3) {
      cell.innerHTML = "Teacher " + count;
    } else if (i == 4) {
      cell.innerHTML = "Approved";
    } else if (i == 5) {
      cell.innerHTML = "Fall";
    } else if (i == 6) {
      cell.innerHTML = "TA";
    } else if (i == 7) {
      cell.innerHTML = Math.floor(Math.random() * 10000);
    } else if (i == 8) {
      cell.innerHTML = Math.floor(Math.random() * 100) + "%";
    }
    col.appendChild(cell);
    row.appendChild(col);
  }
  if (table.appendChild(row)) {
    alert("ROW ADDED SUCCESSFULLY");
  } else {
    alert("SOME ERROR TO ADD A ROW");
  }

  let advisorRow = document.createElement("TR");
  advisorRow.setAttribute("class", "dropDownTextArea");
  let advisorDetails = document.createElement("TD");
  advisorRow.setAttribute("colspan", "8");
  advisorDetails.innerText =
    "Adivsor" +
    "\n\n " +
    "Award  Details \n" +
    "Summer 1-2014(TA) \n" +
    "Budget Number: \n" +
    "Tuition Number: \n" +
    "Comments: \n\n\n" +
    "Award Status:\n\n";
  advisorRow.appendChild(advisorDetails);
  table.appendChild(advisorRow);

  var tr = document.getElementsByClassName("dropDownTextArea");
  for (drop of tr) {
    drop.style.display = "none";
  }
}
/***************************************** ADD ROW *************************************************************** */

/***************************************** CHANGE BACKGROUND *************************************************************** */

var checkedRowsCount = 0;
function checkBoxChange(obj) {
  var row = obj.parentNode.parentElement;
  var tr_first = document.getElementById("myTable").rows[0];
  if (row.tagName != "TR") {
    var submit_btn = document.getElementById("button");
    submit_btn.style.background = "orange";
    row = obj.parentNode.parentElement.parentElement;
  }
  if (obj.checked) {
    var table = document.getElementById("myTable");
    enable();

    checkedRowsCount++;
    var submit_btn = document.getElementById("button");
    submit_btn.style.background = "orange";
    row.style.backgroundColor = "yellow";

    let delbtn = document.createElement("button");
    delbtn.setAttribute("onclick", "deleteRow(this)");
    row.lastElementChild.append(delbtn);
    delbtn.style.height = "30px";
    delbtn.style.width = "60px";
    delbtn.textContent = "Delete";

    var col = table.getElementsByTagName("th")[8];

    if (col) {
      col.style.display = "block";
      col.style.padding = "13px";
    }

    var table = document.getElementById("myTable");
    var cell = row.insertCell(9);
    var btn = document.createElement("input");
    btn.type = "button";
    btn.className = "btn";
    btn.value = "EDIT";
    btn.setAttribute("onclick", "editRow(this)");
    row.lastElementChild.append(btn);
    console.log(checkedRowsCount + " c");
  } else {
    checkedRowsCount = checkedRowsCount - 1;
    row.style.backgroundColor = "white";
    var remove_thead_edit = tr_first.lastElementChild;
    remove_thead_edit.parentNode.removeChild(remove_thead_edit);

    if (row.lastElementChild.childElementCount == 1) {
      row.lastElementChild.lastElementChild.remove();
      row.lastElementChild.remove();
    }
    row.lastElementChild.lastElementChild.remove();
    console.log(checkedRowsCount + " c");
    if (checkedRowsCount == 0) {
      disable();
    }
  }
  if (tr_first.lastElementChild.innerHTML != "EDIT" && checkedRowsCount != 0) {
    var cell = tr_first.insertCell(9);
    cell.innerHTML = "EDIT";
    cell.style.backgroundColor = "#a7c942";
    cell.style.color = "white";
    cell.style.fontWeight = "bold";
  }
}
/***************************************** CHANGE BACKGROUND *************************************************************** */

/***************************************** Delete Row *************************************************************** */
function deleteRow(obj) {
  var row = obj.parentNode.parentElement;
  if (row.tagName != "TR") {
    row = obj.parentNode.parentElement.parentElement;
  }
  // row.nextElementSibling.remove();
  row.remove();
  alert("Row removed Successfully");
  checkedRowsCount = checkedRowsCount - 1;
  var col = table.getElementsByTagName("th")[8];
  if (checkedRowsCount == 0) {
    disable();

    // Getting the table
    var tble = document.getElementById("myTable");

    // Getting the rows in table.
    var row = tble.rows;

    // Removing the column at index(9).
    var i = 9;
    for (var j = 0; j < row.length; j++) {
      // Deleting the ith cell of each row.
      console.log(row[j]);
      row[j].deleteCell(i);
    }
  }
}
/***************************************** Delete Row *************************************************************** */

/***************************************** editRow *************************************************************** */
function editRow(obj) {
  alert("EDIT DETAILS");
  if (checkedRowsCount == 0) {
    disable();
  }
}
/***************************************** editRow *************************************************************** */
