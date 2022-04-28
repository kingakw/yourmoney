const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const showPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.getElementById('name');
const amountAdd = document.getElementById('amount-add');
const categoryAdd = document.getElementById('category-add');
const amountSubtract = document.getElementById('amount-subtract');
const categorySubtract = document.getElementById('category-subtract');

const addTransactionBtn = document.querySelector('.add-transaction');
const subtractTransactionBtn = document.querySelector('.subtract-transaction');
const panelAddMoney = document.querySelector('.panel-add-money');
const panelSubtractMoney = document.querySelector('.panel-subtract-money');
const panelTitleAdd = document.querySelector('.add');
const panelTitleSubtract = document.querySelector('.subtract');

const saveBtn = document.querySelector('.panel-save');
const cancelBtn = document.querySelector('.panel-cancel');

let root = document.documentElement;
let ID = 0;
let transactionType;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];


const addIncome = () => {
    showPanel.style.display = 'flex';
    panelTitleAdd.style.display = 'flex';
    panelTitleSubtract.style.display = 'none';
    panelAddMoney.style.display = 'flex';
    panelSubtractMoney.style.display = 'none';
    transactionType = 1;
}

const subtractIncome = () => {
    showPanel.style.display = 'flex';
    panelTitleAdd.style.display = 'none';
    panelTitleSubtract.style.display = 'flex';
    panelAddMoney.style.display = 'none';
    panelSubtractMoney.style.display = 'flex';
    transactionType = 0;
}

const clearInputs = () => {
    nameInput.value = '';
    amountAdd.value = '';
    categoryAdd.selectedIndex = 0;
    amountSubtract.value = '';
    categorySubtract.selectedIndex = 0;
}

const closePanel = () => {
    showPanel.style.display = 'none';
    clearInputs();
}

const checkForm = () => {
    if (transactionType === 1) {
        checkAddForm()
    } else if (transactionType === 0) {
        checkSubtractForm()
    }
}

const checkAddForm = () => {
    if (nameInput.value !== '' && !isNaN(amountAdd.value) && categoryAdd.value !== 'none') {
        createAddTransaction()
    } else if (isNaN(amountAdd.value)) {
        alert('Amount have to be a number!')
    } else {
        alert('Please fill in all fields!')
    }
}

const checkSubtractForm = () => {
    if (nameInput.value !== '' && !isNaN(amountSubtract.value) && categorySubtract.value !== 'none') {
        createSubtractTransaction()
    } else if (isNaN(amountSubtract.value)) {
        alert('Amount have to be a number!')
    } else {
        alert('Please fill in all fields!')
    }
}

const createAddTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    checkCategory(categoryAdd.options[categoryAdd.selectedIndex].text);

    newTransaction.innerHTML = `
    <p class="transaction-name"> ${categoryIcon} ${nameInput.value} </p>
    <p class="transaction-amount"> ${amountAdd.value} PLN 
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
    </p>
    `

    incomeSection.appendChild(newTransaction);
    newTransaction.classList.add('income')

    moneyArr.push(parseFloat(amountAdd.value));
    countMoney(moneyArr);
    closePanel();
    ID++
    clearInputs();
}

const createSubtractTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    checkCategory(categorySubtract.options[categorySubtract.selectedIndex].text);

    newTransaction.innerHTML = `
    <p class="transaction-name"> ${categoryIcon} ${nameInput.value} </p>
    <p class="transaction-amount"> -${amountSubtract.value} PLN 
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
    </p>
    `

    expensesSection.appendChild(newTransaction);
    newTransaction.classList.add('expense')

    moneyArr.push(-parseFloat(amountSubtract.value));
    countMoney(moneyArr);
    closePanel();
    ID++
    clearInputs();
}

const checkCategory = transaction => {
    switch (transaction) {
        case '[ + ] Salary':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;
        case '[ + ] Extra income':
            categoryIcon = '<i class="fas fa-coins"></i></i>'
            break;
        case '[ - ] Food/Shopping':
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
            break;
        case '[ - ] Going out':
            categoryIcon = '<i class="fas fa-utensils"></i>'
            break;
        case '[ - ] Sport':
            categoryIcon = '<i class="fas fa-person-running"></i>'
            break;
        case '[ - ] Transport':
            categoryIcon = '<i class="fas fa-car-side"></i>'
            break;
        case '[ - ] House':
            categoryIcon = '<i class="fas fa-house"></i>'
            break;
        case '[ - ] Health':
            categoryIcon = '<i class="fas fa-heart-pulse"></i>'
            break;
        case '[ - ] Travel':
            categoryIcon = '<i class="fa-solid fa-person-walking-luggage"></i>'
            break;
    }
}

const countMoney = money => {
    let sum = money.reduce((a, b) => a + b);
    sum = sum.toFixed(2)
    availableMoney.textContent = `${sum}PLN`
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);

    moneyArr.splice(indexOfTransaction, 1);

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) :
        expensesSection.removeChild(transactionToDelete)

    countMoney(moneyArr);
};

addTransactionBtn.addEventListener('click', addIncome);
subtractTransactionBtn.addEventListener('click', subtractIncome);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
