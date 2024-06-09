/* 
  File: AddBudget.js

  Author: Alec Lahey

  Description: This file contains the AddBudget component, which is responsible for rendering a modal
               allowing users to input data to creating a new budget
*/
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function AddBudget({ show, handleClose, budgetName, setBudgetName, budgetMax, setBudgetMax, handleAddBudget }) {
  
  
  return (

    // Modal properties that allows user to enter AddBudget properties
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      {/* Modal Header, includes title and close button for the Modal */}
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>

      {/* Holds forms for AddBudget that user will input their data to */}
      <Modal.Body>
        

        <Form>
          
          {/* Form for the budget name */}
          <Form.Group className="mb-3">
            
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              autoFocus
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          
          </Form.Group>

          {/* Form for the budget maximum spending */}
          <Form.Group className="mb-3">
            
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              id="spending"
              autoFocus
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)} // sets the maximum spending for this budget
            />
          
          </Form.Group>
        
        </Form>
      
      </Modal.Body>

      {/* Close and submit buttons at footer of Budget Modal */}
      <Modal.Footer>
       
       <Button variant="secondary" onClick={handleClose}> {/*Closes Modal when clicked*/}
          Close
        </Button>
        
        {/*Adds budget to budgets array when Submit button is clicked*/}
        <Button variant="success" onClick={handleAddBudget}>
          Submit
        </Button>
      
      </Modal.Footer>
    
    </Modal>
  );
}

export default AddBudget;