let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')
const themeToggle = document.querySelector('.checkbox');
const themeIcons = themeToggle.querySelector('.slider-content').children;

// Function to toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  updateThemeIcons();
}

// Function to update theme icons based on current mode
function updateThemeIcons() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  if (isDarkMode) {
    themeIcons[0].style.display = 'none'; // Hide sun icon
    themeIcons[1].style.display = 'inline-block'; // Show moon icon
  } else {
    themeIcons[0].style.display = 'inline-block'; // Show sun icon
    themeIcons[1].style.display = 'none'; // Hide moon icon
  }
}

// Initial call to set initial icon display
updateThemeIcons();

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperationScreen.textContent += number
}

function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}