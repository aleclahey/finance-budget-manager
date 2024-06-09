/* 
  File: TotalExpensesCard.js

  Author: Alec Lahey

  Description: This file contains the TotalExpensesCard component, which displays the total expenses, 
                total budget amounts, and a progress bar indicating how much of the budget has been spent.
*/



import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function TotalExpensesCard({ budgets }) {
  
  // Calculates total expenses based on user's input for all budget expenses
  const calculateTotalExpenses = () => {

    let total = 0;

    budgets.forEach(budget => {

      budget.expenses.forEach(expense => {
        total += expense.amount;
      });
    
    });

    return total;
  };

  // Calculates total budget based on user's input for all budgets
  const calculateTotalBudget = () => {

    let totalBudget = 0;
    
    budgets.forEach(budget => {
      totalBudget += parseFloat(budget.max);
    });
    return totalBudget;

  };

  const totalExpenses = calculateTotalExpenses();
  const totalBudget = calculateTotalBudget();
  const progressPercentage = (totalExpenses / totalBudget) * 100;
  const progressBarVariant = getProgressBarVariant(progressPercentage);

  return (

    <Card className='bg-secondary'>

      <Card.Body className="d-flex flex-column fw-normal mb-3">

            
            <div className="h5 mb-0">Total Expenses</div>

            {/* Formats the total expenses and total budget in the Total Expenses Card */}
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(totalExpenses)}
              {totalBudget && (

                <span className="text-muted fs-6 ms-1">
                  / {currencyFormatter.format(totalBudget)}
                </span>

              )}
            </div>
          
          
       {/* ProgressBar for total budgets depending on their total expenses */}
        <ProgressBar
          className="rounded-pill"
          min={0}
          max={totalBudget}
          now={totalExpenses}
          variant={progressBarVariant}
        />

      </Card.Body>

    </Card>

  );
}

// Function for the progress bar to change colours depending on how much their expenses make up their budgets
function getProgressBarVariant(progressPercentage) {
  
  if (progressPercentage < 50) {
    return "success"; //green
  }
  else if (progressPercentage < 75) {
    return "warning"; //yellow
  }
  return "danger"; //red
}