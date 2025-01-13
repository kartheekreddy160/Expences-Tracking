const expenseTitle =document.getElementById('expense-title');

const expenseAmount= document.getElementById('expense-amount');

const expenseDate=document.getElementById('expense-date');

const expenseCategory=document.getElementById('expense-category');

const addExpenseButton=document.getElementById('add-expense');

const expenseTable=document.getElementById('expense-table');

const totalExpenses=document.getElementById('total-expenses');

const categoryBreakdown=document.getElementById('category');

const filterDate=document.getElementById('filter-date');


//Arrays to store expenses

let expenses=[];

//function to render expenses in table

function renderExpenses(filter=null) 
{
    expenseTable.innerHTML='';

    let total=0;

    const categoryTotals={};

    const filteredExpenses=filter ? expenses.filter(expense=>expense.date==filter):expenses;

    filteredExpenses.forEach((expense,index)=>{
        total+=expense.amount;
        categoryTotals[expense.category]=(categoryTotals[expense.category]||
        0)+expense.amount;

        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${expense.title}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>

        <td>

        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>
        </td>
        
        `;

        expenseTable.appendChild(row);
    });

    //update total expenses and category breakdown

    totalExpenses.innerHTML=`Total expenses: ${total}`;

    categoryBreakdown.innerHTML='';

    for(const[category,amount] of Object.entries(categoryTotals)){
        const li=document.createElement('li');
        li.innerText=`${category}:${amount}`;
        categoryBreakdown.appendChild(li);
    }
}

//function to add new expense

function addExpense() {
    const title=expenseTitle.value.trim();
    const amount=parseFloat(expenseAmount.value.trim());
    const date=expenseDate.value;
    const category=expenseCategory.value;

    if (!title || isNaN(amount) || amount<=0 ||!date ) {
        alert('Please fill all fields correctly');
        return;
    }

    expenses.push({title,amount,date,category});
    expenseTitle.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';

    renderExpenses();
    saveExpenses();   
}

function editExpense(index) {
    const expense=expenses[index];
    expenseTitle.value=expense.title;
    expenseAmount.value=expense.amount;
    expenseDate.value=expense.date;
    expenseCategory.value=expense.category;
    deleteExpense(index);    
}

function deleteExpense(index) {
    expenses.splice(index,1);
    renderExpenses();
    saveExpenses();
}


function saveExpenses() {
    localStorage.setItem('expenses',JSON.stringify(expenses));
}


function loadExpenses() {
    const data=localStorage.getItem('expenses');
    if (data) {
        expenses=JSON.parse(data);
        renderExpenses();
    }
}


filterDate.addEventListener('input',()=>{
    const filter=filterDate.value;
    renderExpenses(filter);
});


addExpenseButton.addEventListener('click',addExpense);

window.onload=loadExpenses;

