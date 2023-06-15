import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CheckOutModel = (props) => {
  const handleCheckout = async (e, id) => {
    e.preventDefault();
    await axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/checkout`, { id })
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Checkout Request Sent Successfully');
        } else {
          alert(result.data.Status);
        }
      });
  };


  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation for Checkout Total Investment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Your Investment will be returned with deduction of 25% from your total
          Investment.
        </p>
        <p>Please click on Checkout button below to send a checkout request</p>
        <Button
          variant="outline-danger"
          onClick={(e) => {
            handleCheckout(e, props.id);
          }}
        >
          Checkout
        </Button>{' '}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckOutModel;
