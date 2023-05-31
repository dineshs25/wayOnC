import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ClientInfo = ({
  handledatachange,
  validate,
  panError,
  panLength,
  passportError,
  clientNameError,
  dobError,
}) => {
  return (
    <>
      <h2>Client Information</h2>
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Client Name</Form.Label>

        <Form.Control
          type="text"
          name="clientName"
          placeholder="Client Name"
          onChange={handledatachange}
        />
        {clientNameError ? (
          <p style={{ color: 'red' }}>Name should contain alphabets</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>DOB</Form.Label>

        <Form.Control
          type="date"
          name="dob"
          placeholder="DOB"
          onChange={handledatachange}
        />
        {dobError ? (
          <p style={{ color: 'red' }}>Please provide Date of birth</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PAN NO</Form.Label>

        <Form.Control
          type="text"
          name="panNum"
          placeholder="PAN NO"
          maxLength={10}
          onChange={handledatachange}
        />
        {panLength ? (
          <p style={{ color: 'red' }}>PAN number should be 10 Characters</p>
        ) : null}
        {panError ? (
          <p style={{ color: 'red' }}>PAN number is not correct</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Adhraa Number</Form.Label>

        <Form.Control
          type="number"
          name="adhaar"
          placeholder="Adhaar Number"
          maxLength={12}
          onChange={handledatachange}
        />
        {validate ? (
          <p style={{ color: 'red' }}>Please provide validate Aadhaar number</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Passport No</Form.Label>
        <Form.Control
          type="text"
          name="passportNum"
          placeholder="Passport No"
          onChange={handledatachange}
        />
        {passportError ? (
          <p style={{ color: 'red' }}>
            Please provide validate passport number
          </p>
        ) : null}
      </Form.Group>
    </>
  );
};

export default ClientInfo;
