import React from 'react';
import Form from 'react-bootstrap/Form';

const Nominee = ({
  handleNomineedatachange,
  nomineeNameError,
  nomineeNumberError,
  relationshipError,
  nomineeAadhaarError,
  nomineeEmailError,
  nomineeAddressError
}) => {
  return (
    <>
      <h2>Nominee Details</h2>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="nominee_name"
          placeholder="Name"
          onChange={handleNomineedatachange}
        />
        {nomineeNameError ? (
          <p style={{ color: 'red' }}>Nominee Name should contain alphabets</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control
          type="tel"
          name="nominee_mobile"
          placeholder="Mobile No"
          onChange={handleNomineedatachange}
        />
        {nomineeNumberError ? (
          <p style={{ color: 'red' }}>Provide Valide Nominee Mobile Number</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Relationship</Form.Label>
        <Form.Control
          type="text"
          name="nominee_relationship"
          placeholder="Relationship"
          onChange={handleNomineedatachange}
        />
        {relationshipError ? (
          <p style={{ color: 'red' }}>Provide Valide Nominee Mobile Number</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Aadhaar No</Form.Label>
        <Form.Control
          type="text"
          name="nominee_adhaar"
          placeholder="Aadhaar No"
          onChange={handleNomineedatachange}
        />
        {nomineeAadhaarError ? (
          <p style={{ color: 'red' }}>Provide Valide Aadhaar Numbers</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>E-mail ID</Form.Label>
        <Form.Control
          type="email"
          name="nominee_email"
          placeholder="E-mail ID"
          onChange={handleNomineedatachange}
        />
        {nomineeEmailError ? (
          <p style={{ color: 'red' }}>Provide Valide Nominee Email ID</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Communication Address</Form.Label>
        <Form.Control
          as="textarea"
          name="nominee_address"
          placeholder="Communication Address"
          onChange={handleNomineedatachange}
        />
        {nomineeAddressError ? (
          <p style={{ color: 'red' }}>Provide Nominee Address</p>
        ) : null}
      </Form.Group>
    </>
  );
};

export default Nominee;
