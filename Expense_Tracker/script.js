// Selecting elements from the DOM
const expenseForm = document.getElementById('expense-form');
const expenseText = document.getElementById('expense-text');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalExpenses = document.getElementById('total-expenses');

// Initialize expenses array from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to update the total expenses
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpenses.textContent = `$${total.toFixed(2)}`;
}

// Function to add a new expense
function addExpense(description, amount) {
    const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
    };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateTotal();
    renderExpenses();
}

// Function to render the list of expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} ($${expense.amount.toFixed(2)})
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Function to edit an expense
function editExpense(id) {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
        const updatedDescription = prompt('Edit description:', expenses[index].description);
        const updatedAmount = parseFloat(prompt('Edit amount:', expenses[index].amount));
        if (updatedDescription !== null && !isNaN(updatedAmount)) {
            expenses[index].description = updatedDescription;
            expenses[index].amount = updatedAmount;
            localStorage.setItem('expenses', JSON.stringify(expenses));
            updateTotal();
            renderExpenses();
        }
    }
}

// Function to delete an expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateTotal();
    renderExpenses();
}

// Event listener for adding an expense
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = expenseText.value.trim();
    const amount = expenseAmount.value.trim();
    if (description !== '' && !isNaN(amount) && parseFloat(amount) > 0) {
        addExpense(description, amount);
        expenseText.value = '';
        expenseAmount.value = '';
    } else {
        alert('Please enter a valid description and amount.');
    }
});

// Initial rendering of expenses
renderExpenses();
updateTotal();
