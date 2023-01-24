var checkboxes = document.getElementsByClassName("hear");
var selectCheckboxOptions = [
  "Contemprory",
  "Badminton",
  "Daal-Chawal",
  "Niagara Falls",
  "Electronics",
];

function submitForm() {
  var isChked = isChecked();
  if (isChked) {
    var frm = document.getElementById("submit_form");
    frm.submit();
    frm.reset();
    return false;
    // return true;
  } else {
    return false;
  }
}

function clearErrorMsg(divError, textField) {
  divError.style.display = "none";
  divError.style.color = "red";
  if (textField) {
    textField.style.border = "";
  }
}

function isChecked() {
  var errorDiv = document.getElementById("errorSource");
  for (ele of checkboxes) {
    if (ele.checked) {
      clearErrorMsg(errorDiv, null);
      return true;
    }
  }
  showErrorMsg(errorDiv, null);
  return false;
}

function validateInputs(object, type, nameType) {
  var regExName = /^[a-zA-Z]+$/;
  var regExEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(northeastern.edu)$/;
  var regExPhone = /\d{3}-?\d{3}-\d{4}$/;
  var regExZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  var name = "errorMsg" + nameType;
  var name = "errorMsg" + nameType;
  switch (type) {
    case 1:
      if (!object.value.trim().match(regExName)) {
        object.style.border = "2px solid red";
        document.getElementById(name).style.display = "block";
        object.value = "";
      } else {
        object.style.border = "";
        document.getElementById(name).style.display = "none";
      }
      break;
    case 2:
      if (!object.value.match(regExEmail)) {
        object.style.border = "2px solid red";
        document.getElementById("errorMsgEmailId").style.display = "block";
        object.value = "";
      } else {
        object.style.border = "";
        document.getElementById("errorMsgEmailId").style.display = "none";
      }
      break;
    case 3:
      if (!object.value.match(regExPhone)) {
        object.style.border = "2px solid red";
        document.getElementById("errorMsgPhone").style.display = "block";
        object.value = "";
      } else {
        object.style.border = "";
        document.getElementById("errorMsgPhone").style.display = "none";
      }
      break;
    case 4:
      if (!object.value.match(regExZipCode)) {
        object.style.border = "2px solid red";
        document.getElementById("errorMsgZipCode").style.display = "block";
        object.value = "";
      } else {
        object.style.border = "";
        document.getElementById("errorMsgZipCode").style.display = "none";
      }
      break;
  }
}

function showErrorMsg(divError, textField) {
  if (textField) {
    textField.style.border = "2px solid red";
    textField.value = "";
  }
  divError.style.display = "block";
  divError.style.border = "";
  divError.style.color = "red";
}

function hobbieslist(obj) {
  if (document.getElementsByClassName("chkbox").length >= 1) {
    var changingLabel = document.getElementById("labelTochange");
    var chkboxChange = document.getElementById("chkboxChange");
    changingLabel.innerHTML = selectCheckboxOptions[obj.selectedIndex];
    chkboxChange.setAttribute(
      "value",
      selectCheckboxOptions[obj.selectedIndex]
    );
  } else {
    var formDiv = document.getElementById("form_elements");
    console.log(formDiv);
    var chkbox = document.createElement("input");
    chkbox.className = "chkbox";
    chkbox.id = "chkboxChange";
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("name", "CheckboxValue");
    chkbox.setAttribute("onclick", addTextField());
    chkbox.addEventListener("change", function () {
      if (this.checked) {
        if (document.getElementsByClassName("dynamicTextFeild").length > 1) {
          var removeTextFields =
            document.getElementsByClassName("dynamicTextFeild");
          for (obj of removeTextFields) {
            obj.style.display = "block";
          }
        } else {
          var labelTf = document.createElement("label");
          labelTf.innerHTML = "Comment for Hobby*:";
          labelTf.className = "dynamicTextFeild";
          labelTf.setAttribute("for", "dynamicTF");

          var formDiv = document.getElementById("form_elements");
          var textFeild = document.createElement("input");
          textFeild.required = true;
          textFeild.className = "dynamicTextFeild";
          textFeild.id = "dynamicTF";
          textFeild.name = "Comment for Hobby";
          textFeild.setAttribute("type", "text");

          formDiv.appendChild(labelTf);
          formDiv.appendChild(textFeild);
          formDiv.appendChild(document.createElement("br"));
          formDiv.appendChild(document.createElement("br"));
        }
      } else {
        var removeTextFields =
          document.getElementsByClassName("dynamicTextFeild");
        for (obj of removeTextFields) {
          obj.style.display = "none";
        }
        var dynamicTextF = document.getElementById("dynamicTF");
        dynamicTextF.required = false;
      }
    });
    chkbox.style.float = "left";
    formDiv.appendChild(chkbox);
    var labl = document.createElement("label");
    labl.name = "checkBoxLabel";
    labl.innerHTML = selectCheckboxOptions[obj.selectedIndex];
    chkbox.setAttribute("value", selectCheckboxOptions[obj.selectedIndex]);
    formDiv.appendChild(labl);
    labl.setAttribute("id", "labelTochange");
    formDiv.appendChild(document.createElement("br"));
    formDiv.appendChild(document.createElement("br"));
    formDiv.appendChild(document.createElement("br"));
  }
}

function addTextField(obj) {
  if (obj) {
    var formDiv = document.getElementById("form_elements");
    var textFeild = document.createElement("input");
    textFeild.setAttribute("type", "text");
    textFeild.required = true;
    formDiv.appendChild(textFeild);
  }
}

function createRows() {
  var queryParams = window.location.search;
  const urlParams = new URLSearchParams(queryParams);
  console.log(urlParams);
  var traversedkeys = new Array();

  urlParams.forEach(function (value, key) {
    if (value != "" && key != "streetAddress2") {
      // alert("here1");
      if (!traversedkeys.includes(key)) {
        traversedkeys.push(key);
        urlParams.getAll(key);
        var table = document.getElementById("table");
        let row = document.createElement("TR");
        let keyCell = document.createElement("Cell");

        let keyCol = document.createElement("TD");
        let valCell = document.createElement("Cell");
        let valCol = document.createElement("TD");

        keyCell.innerHTML = key;
        valCell.innerHTML = urlParams.getAll(key);

        keyCol.appendChild(keyCell);
        valCol.appendChild(valCell);
        row.appendChild(keyCol);
        row.appendChild(valCol);
        table.firstElementChild.appendChild(row);
      }
    } else if (key == "streetAddress2" && (value == "" || value != "")) {
      // alert("here2");
      if (!traversedkeys.includes(key)) {
        traversedkeys.push(key);
        urlParams.getAll(key);
        var table = document.getElementById("table");
        let row = document.createElement("TR");
        let keyCell = document.createElement("Cell");

        let keyCol = document.createElement("TD");
        let valCell = document.createElement("Cell");
        let valCol = document.createElement("TD");

        keyCell.innerHTML = key;
        valCell.innerHTML = urlParams.getAll(key);

        keyCol.appendChild(keyCell);
        valCol.appendChild(valCell);
        row.appendChild(keyCol);
        row.appendChild(valCol);
        table.firstElementChild.appendChild(row);
      }
    }
  });
}
