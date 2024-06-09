/* 
  File: AddBudget.js

  Author: Alec Lahey

  Description: This file contains the modal that displays all the expenses under the selected budget.
               A table is outputted to the modal displaying the description and amount.
*/


import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function ViewExpenses({ show, handleClose, budgetName, budgets }) {
  
  // Check if budgets is defined before accessing its properties
  const budget = budgets ? budgets.find(budget => budget.name === budgetName) : null;



  return (


    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Expenses for {budgetName}</Modal.Title> {/* budgetName is the name the user gave the budget */}
      </Modal.Header>

      <Modal.Body>
        {budget && (

          //Table for the list of expenses output
          <Table striped bordered hover>

            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>

          {/* Maps through the budget expenses and accesses the description and amount to display in the table */}
            <tbody>
              {budget.expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>{currencyFormatter.format(expense.amount)}</td>
                </tr>
              ))}
            </tbody>

          </Table>

        )}
      </Modal.Body>
      
      {/* Button will close the modal and make sure the modal is not visible unless called on again */}
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    
    </Modal>

  );
}