document.getElementById('add-expense').addEventListener('click', function() {

    const expenseName = document.getElementById('expense-name').value;
    
    const expenseAmount = document.getElementById('expense-amount').value;
    
    
    
    
    if (expenseName !== '' && expenseAmount !== '') {
    
    const expense = {
    
    name: expenseName,
    
    amount: parseFloat(expenseAmount)
    
    };
    
    
    
    
    fetch('http://localhost:3000/expenses', {
    
    method: 'POST',
    
    headers: {
    
    'Content-Type': 'application/json'
    
    },
    
    body: JSON.stringify(expense)
    
    })
    
    .then(response => response.json())
    
    .then(data => {
    
    if (data.error) {
    
    alert(data.error);
    
    } else {
    
    addExpenseToList(data);
    
    updateTotal(data.amount);
    
    }
    
    })
    
    .catch(error => {
    
    console.error('Error:', error);
    
    });
    
    
    
    
    document.getElementById('expense-name').value = '';
    
    document.getElementById('expense-amount').value = '';
    
    }
    
    });
    
    
    
    
    function addExpenseToList(expense) {
    
    const expenseList = document.getElementById('expense-list');
    
    const expenseItem = document.createElement('li');
    
    expenseItem.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} <button class="delete-expense" data-id="${expense.id}">Delete</button>`;
    
    expenseList.appendChild(expenseItem);
    
    
    
    
    expenseItem.querySelector('.delete-expense').addEventListener('click', function() {
    
    const id = this.getAttribute('data-id');
    
    fetch(`http://localhost:3000/expenses/${id}`, {
    
    method: 'DELETE'
    
    })
    
    .then(response => response.json())
    
    .then(data => {
    
    if (data.error) {
    
    alert(data.error);
    
    } else {
    
    expenseList.removeChild(expenseItem);
    
    updateTotal(-expense.amount);
    
    }
    
    })
    
    .catch(error => {
    
    console.error('Error:', error);
    
    });
    
    });
    
    }
    
    
    
    
    function updateTotal(amount) {
    
    const totalAmountElement = document.getElementById('total-amount');
    
    const currentTotal = parseFloat(totalAmountElement.textContent);
    
    const newTotal = currentTotal + amount;
    
    totalAmountElement.textContent = newTotal.toFixed(2);
    
    }