import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const InvestModal = (props) => {


    
  

  
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Investment Process
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>Bank Details of WayOnC Investment Pvt Ltd</p>
          <button
            className="pay extend-suc-btn"
            onClick={(e) => {
                handleInvestForVer(e, props.id);
            }}
          >
            Invested
          </button>{' '}
        </Modal.Body>
      </Modal>
    );
  };
  
  export default InvestModal;