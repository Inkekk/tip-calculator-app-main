const billInp = document.querySelector(".bill-input");
const tipBtns = document.querySelectorAll(".btn");
const tipCustom = document.querySelector(".custom-input");
const people = document.querySelector(".input-people");
const results = document.querySelectorAll(".total");
const resetBtn = document.querySelector('.reset-button')

const errorsMsg = document.querySelectorAll(".error-msg");
const errorList = ["Can't be zero", "Can't have letters"];

resetBtn.addEventListener('click', resetAll)

billInp.addEventListener("input", setBillValue);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", setTipCustom);
people.addEventListener("input", setPeopleValue);

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function validateInt(s) {
  var rgx = /^[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (billInp.value.includes(",")) {
    billInp.value = billInp.value.replace(",", ".");
  }

  if (!validateFloat(billInp.value)) {
    billInp.value = billInp.value.substring(0, billInp.value.length - 1);
  }

  billValue = parseFloat(billInp.value);
  console.log(billValue);

  calculateTip();

  if (billValue <= 0) {
    billInp.classList.add("input-error");
    errorsMsg[0].innerHTML = errorList[0];
  } else {
    billInp.classList.remove("input-error");
    errorsMsg[0].innerHTML = "";
  }
}

function handleClick(event) {
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");

    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  calculateTip();

  tipCustom.value = "";
  console.log(tipValue);
}

function setTipCustom() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }
  tipValue = parseFloat(tipCustom.value / 100);
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (tipValue <= 0) {
    tipCustom.classList.add("input-error");
    errorsMsg[1].innerHTML = errorList[0];
  } else {
    tipCustom.classList.remove("input-error");
    errorsMsg[1].innerHTML = "";
  }

  if (tipCustom.value <= 0) {
    calculateTip();
  }

  calculateTip();
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue <= 0) {
    people.classList.add("input-error");
    errorsMsg[2].innerHTML = errorList[0];
  } else {
    people.classList.remove("input-error");
    errorsMsg[2].innerHTML = "";
  }

  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = billValue * tipValue / peopleValue;
    let total = billValue * tipValue + 1 / peopleValue;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
    console.log(total);
  }
}

function resetAll() {
  billInp.value = ''
  tipCustom.value = ''
  people.value = ''
  results.forEach(result => {
    result.innerHTML = '$0,00'
  })
}

// console.log(billInp.value);
