/* 
  File: AddExpense.js

  Author: Alec Lahey

  Description: This file contains the AddExpense component, which is responsible for rendering a modal
               allowing users to input data to creating a new expense.
*/
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddExpense({ show, handleClose, amount, setAmount, description, setDescription, handleAddExpense, budgetOptions }) {
  
  const [selectedBudget, setSelectedBudget] = useState('');


  // Updates the state with the value of the selected budget when the user changes the selected option
  const handleBudgetChange = (event) => {
    setSelectedBudget(event.target.value);
  };

  // Handles submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddExpense(amount, description, selectedBudget);
  };

  return (

    // AddExpense Modal for adding an expense to a budget
    <Modal show={show} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        
        <Form onSubmit={handleSubmit}>

        {budgetOptions && budgetOptions.length > 0 && (
            
            // Allows user to select a budget based on the dropdown menu
            // Budgets are added when user adds a budget to the app from AddBudget
            <Form.Group className="mb-3" controlId="formBudget">
              
              <Form.Label>Select Budget</Form.Label>
              
              <Form.Select value={selectedBudget} onChange={handleBudgetChange}>
              
              <option>Select Budget</option>
              {budgetOptions.map((budget, index) => (
                <option key={index} value={budget.name}>{budget.name}</option>
              ))}

            </Form.Select>

            </Form.Group>
          )}

          {/* Field for user to enter the expense amount */}
          <Form.Group className="mb-3" controlId="formAmount">

            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          
          </Form.Group>
         
         {/* Field for user to enter the expense description */}
          <Form.Group className="mb-3" controlId="formDescription">
            
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
         
         </Form.Group>
          
          {/* Button for user to add their expense to the selected budget */}
          <Button variant="success" type="submit">
            Add Expense
          </Button>
        
        </Form>
      
      </Modal.Body>
    
    </Modal>
  );
}

export default AddExpense;