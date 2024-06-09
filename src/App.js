/*
  File: App.js

  Author: Alec Lahey

  Description: This file contains the main component of the Budget Management application.
               It manages the state of budgets and expenses, handles modal states for adding budgets
               and adding expenses, and renders BudgetCard, AddBudget, AddExpense, and TotalExpensesCard
               components found in seperate files.
*/


import React, { useState } from 'react';
import { Button, Modal, Stack, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard'; 
import AddBudget from './components/AddBudget';
import AddExpense from './components/AddExpense';
import TotalExpenses from './components/TotalExpensesCard';


function App() {

  //useStates are used to keep track of values
  const [showBudget, setShowBudget] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [budgetAdded, setBudgetAdded] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [showNameModal, setShowNameModal] = useState(true);
  const [userName, setUserName] = useState('');


  //Handing functions
  
  // Handles data when no modals are in use
  // Both need to be set to false so user only sees main page
  // Set functions are false because the modals are closed
  const handleClose = () => {
    setShowBudget(false);
    setShowExpense(false);
  };

  //Modal functios are set to true when they being used
  //These functions will be called when an AddBudget or AddExpense button is clicked
  //To show modal once button has been clicked
  const handleShowBudget = () => setShowBudget(true);
  const handleShowExpense = () => setShowExpense(true);

  //handleAddBudget function
  //Handles activity when AddBudget button has been clicked
  //Sets values of data that has been inputed
  const handleAddBudget = () => {
    if (budgetName && budgetMax) {
      setShowBudget(false);
      setBudgetAdded(true);
      setBudgets([...budgets, { name: budgetName, max: parseFloat(budgetMax), expenses: [] }]);
    
      //Name and Max are reinitializes so user doesn't see last input when adding a new Budget
      setBudgetName('');//Reintializes Budget Name
      setBudgetMax('');//Reinitalizes Budget Max
    }
  };

  //Logic for handling AddExpense button
  //Updates the Budget when a new expense in added
  const handleAddExpense = (expenseAmount, expenseDescription, budgetName) => {
    if (expenseAmount && expenseDescription && budgetName) {
      setShowExpense(false);
      const updatedBudgets = budgets.map(budget => {
        if (budget.name === budgetName) {
          const newExpense = { amount: parseFloat(expenseAmount), description: expenseDescription };
          return { ...budget, expenses: [...budget.expenses, newExpense] };
        }
        return budget;
      });

      //Setting values
      setBudgets(updatedBudgets);
      setAmount('');//Reinitializes amount
      setDescription('');//Reinitalizes description
    }
  };

  // Calculate total spent for a budget
  const calculateTotalSpent = (budget) => {
    if (budget && budget.expenses) {
      return budget.expenses.reduce((total, expense) => total + expense.amount, 0);
    } else {
      return 0; 
    }
  };

  //Makes the modal not visible when the user clicks submit on the name modal
  //For modal popup at the beggining of running the program
  const handleNameSubmit = () => {
    setShowNameModal(false);
  };

  // Everything in here will get outputted to the app
  return (
    <Container fluid className="p-4 bg-dark min-vh-100">


      {/* Welcome Modal 
          Prompts user to enter their name so it can be added to the budget title*/}
      <Modal show={showNameModal} onHide={() => setShowNameModal(false)}>
        
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Your Budget Dashboard</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your Name" /> {/* Gets name value that will eventually be added to the title */}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="success" onClick={handleNameSubmit}> {/*Calls handleNameSubmit function when Start button is clicked*/}
            Start
          </Button>
        </Modal.Footer>

      </Modal> {/*End of welcome modal*/}

      {/* Stack for Header, AddBudget button, and AddExpense button at top of screen */}
      <Stack direction="horizontal" gap="2" className="mb-4 bg-secondary p-3">
        
        {/*If user entered a name, their names is added to the title. If not title is just 'Your Budget'*/}
        <h1 className="text-light flex-grow-1">{userName ? `${userName}'s Budget` : 'Your Budget'}</h1>
        
        {/* Add Budget Button
            Add Budget Modal becomes visible when the button is clicked */}
        <Button variant="success" onClick={handleShowBudget}>Add Budget</Button>
        
        {/* Inputed values and handling functions are passed to the AddBudget function in the AddBudget file when button is clicked 
            AddBudget file handles the AddBudget Modal*/}
        <AddBudget
          show={showBudget}
          handleClose={handleClose}
          budgetName={budgetName}
          setBudgetName={setBudgetName}
          budgetMax={budgetMax}
          setBudgetMax={setBudgetMax}
          handleAddBudget={handleAddBudget}
        />
         
         {/* Add Budget Button
            Add Budget Modal becomes visible when the button is clicked */}
        <Button variant="outline-light" onClick={handleShowExpense}>Add Expense</Button>
        {/* Inputed values and handling functions are passed to the AddExpense function in the AddExpense file when button is clicked 
            AddExpense file handles the AddExpense Modal*/}
        <AddExpense
          show={showExpense}
          handleClose={handleClose}
          amount={amount}
          setAmount={setAmount}
          description={description}
          setDescription={setDescription}
          handleAddExpense={handleAddExpense}
          budgetOptions={budgets}
        />
      </Stack>

      {/* Beginning of Cards */}
      
      {/* Renders a BudgetCard for each Budget that has been added
      The values and functions needed for the BudgetCard function are passed
      BudgetCard function is found in the BudgetCard file */}
      {budgetAdded && (
        <div className="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 gap-1">
          {budgets.map((budget, index) => (
            <BudgetCard 
              key={index}
              name={budget.name}
              amount={calculateTotalSpent(budget)}
              max={parseFloat(budget.max)}
              budgets={budgets} 
              setBudgets={setBudgets} 
            /> 
          ))}
        </div>
      )}

      {/* Total Expenses budget Card
      Behaves similarly to the BudgetCard, but adds up all the budgets and expenses
      TotalExpenses function is stored in the TotalExpensesCard file */}
      <div className="mt-1">

      {/* TotalExpenses takes in the budgets variable to get information for all data */}
        <TotalExpenses budgets={budgets}/>
      </div>
    </Container>
  );
}

export default App;
