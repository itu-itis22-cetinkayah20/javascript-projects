const display = document.querySelector(".hesap-makinesi-girdi");
const historyDisplay = document.querySelector(".hesap-makinesi-geçmiş");
const anahtarlar = document.querySelector(".hesap-makinesi-anahtarlar");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let history = "";

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
  historyDisplay.textContent = history;
}

anahtarlar.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return;

  if (element.classList.contains("işlem")) {
    //console.log("işlem", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    // console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    // console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }

  if (element.classList.contains("equal-sign")) {
    handleEqual();
    updateDisplay();
    return;
  }
  // console.log("equal", element.value);
  inputNumber(element.value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (firstValue === null) {
    firstValue = value;
    history = `${value} ${nextOperator} `;
  } else if (operator) {
    const currentValue = firstValue || 0;
    const newValue = calculate(currentValue, value, operator);

    displayValue = String(newValue);
    firstValue = newValue;
    history = `${newValue} ${nextOperator} `;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (waitingForSecondValue) {
    displayValue = "0.";
    waitingForSecondValue = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  history = "";
}

function calculate(firstValue, secondValue, operator) {
  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "/":
      if (secondValue === 0) {
        alert("Sıfıra bölme hatası!");
        return firstValue;
      }
      return firstValue / secondValue;
    default:
      return secondValue;
  }
}

function handleEqual() {
  const value = parseFloat(displayValue);

  if (firstValue !== null && operator) {
    const newValue = calculate(firstValue, value, operator);
    history = `${firstValue} ${operator} ${value} = ${newValue}`;
    displayValue = String(newValue);
    firstValue = null;
    operator = null;
    waitingForSecondValue = true;
  }
}
