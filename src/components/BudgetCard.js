/* 
  File: BudgetCard.js

  Author: Alec Lahey

  Description: This file contains the BudgetCard component, which a budget's name, current expenses, 
              and progress bar indicating the percentage of the budget spent. It also provides the buttons to 
              add expenses and view expenses for the budget.
*/

import React, { useState } from 'react';
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import AddExpense from "./AddExpense";
import ViewExpenses from "./ViewExpenses";

export default function BudgetCard({ name, amount, max, budgets, setBudgets }) {

 //useStates are used to keep track of values inside BudgetCard
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [descriptionToAdd, setDescriptionToAdd] = useState('');
  const [showViewExpenses, setShowViewExpenses] = useState(false); // State for ViewExpensesModal

  //Resets values when the Expense Modal closes
  const handleExpenseModalClose = () => {
    setShowExpenseModal(false);
    setAmountToAdd('');
    setDescriptionToAdd('');
  };

  // Adds expense to budget and makes the expense Modal not visible for the AddExpense element
  // Resets values at the end
  const handleAddExpense = (expenseAmount, expenseDescription) => {

    if (expenseAmount && expenseDescription) {

      setShowExpenseModal(false);

      const updatedBudgets = budgets.map(budget => {

        if (budget.name === name) {

          const newExpense = { amount: parseFloat(expenseAmount), description: expenseDescription };
          return { ...budget, expenses: [...budget.expenses, newExpense] };

        }

        return budget;

      });

      setBudgets(updatedBudgets);
      setAmountToAdd('');
      setDescriptionToAdd('');

    }

  };

  // Handles the Modal in the ViewExpenses element
  const handleViewExpenses = () => {
    setShowViewExpenses(!showViewExpenses); // Toggle the state to show/hide the modal
  };

  return (


    <Card className="shadow mb-3 bg-secondary">

      <Card.Body className="d-flex flex-column fw-normal">

        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <div>

            {/* Outputs the name of the budget to the Card */}
            <div className="h5 mb-0">{name}</div>

            <div className="d-flex align-items-baseline">

              {/* Formats the display for the expenses amount and budget amount for the budget variable */}
              <span className="me-1">{currencyFormatter.format(amount)}</span>
              {max && (
                <span className="text-muted fs-6">/ {currencyFormatter.format(max)}</span>
              )}

            </div>

          </div>


          {/* Stack to hold View Expenses and the Add Expense (+) Buttons */}
          <Stack direction="horizontal" gap="2">
          
          <Button variant="outline-dark" size="sm" className="rounded-pill" onClick={handleViewExpenses}>View Expenses</Button>
          <Button variant="outline-dark" size="sm" className="rounded-pill" onClick={() => setShowExpenseModal(true)}> + </Button>
          
          </Stack>

        </div>

        {/* Progress bar for the budget in the current BudgetCard */}
        <ProgressBar
          min={0}
          max={max}
          now={amount}
          variant={getProgressBarVariant(amount, max)}
        />

      </Card.Body>

      {/* Passes in the values to the AddExpense function in the AddExpense.js file */}
      <AddExpense
        show={showExpenseModal}
        handleClose={handleExpenseModalClose}
        amount={amountToAdd}
        setAmount={setAmountToAdd}
        description={descriptionToAdd}
        setDescription={setDescriptionToAdd}
        handleAddExpense={handleAddExpense}
        budgetName={name} 
        budgets={budgets}
        setBudgets={setBudgets}
      />

      {/* Passes in the values to the AddExpense function in the AddExpense.js file */}
      <ViewExpenses
        show={showViewExpenses}
        handleClose={handleViewExpenses}
        budgetName={name}
        budgets={budgets}
      />

    </Card>

  );

}

// Function for the progress bar to change colours depending on how much their expenses make up their budgets 
function getProgressBarVariant(amount, max) {

  const ratio = (amount / max ) * 100;

  if (ratio < 50) {
    return "success"; //green
  }
  else if (ratio < 75) {
    return "warning"; //yellow
  }
  return "danger"; //red
}
