import React from 'react';
import Form from 'react-bootstrap/Form';

const ContactBank = ({
  handledatachange,
  numberError,
  altNumberError,
  bankACError,
  acHolderNameError,
  ifscError,
  bankNameError,
  emailError,
  addressError,
}) => {
  return (
    <>
      <h2>Contact & Bank Information</h2>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control
          type="tel"
          name="mobile"
          placeholder="+91**********"
          onChange={handledatachange}
        />
        <button>Verify</button>
        {numberError ? (
          <p style={{ color: 'red' }}>
            Provide Valid Phone Number with contry-code
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Alt Mobile No</Form.Label>
        <Form.Control
          type="tel"
          name="altMobile"
          placeholder="+91**********"
          onChange={handledatachange}
        />
        {altNumberError ? (
          <p style={{ color: 'red' }}>
            Provide Valid Phone Number with contry-code
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bank A/c No</Form.Label>
        <Form.Control
          type="number"
          name="bank_AC_Num"
          placeholder="Bank A/c No"
          onChange={handledatachange}
        />
        {bankACError ? (
          <p style={{ color: 'red' }}>Provide Valid Bank Account Number</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Acc. Holder Name</Form.Label>
        <Form.Control
          type="text"
          name="acc_holder_name"
          placeholder="Acc. Holder Name"
          onChange={handledatachange}
        />
        {acHolderNameError ? (
          <p style={{ color: 'red' }}>Name should contain alphabets</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>IFSC Code</Form.Label>
        <Form.Control
          type="text"
          name="ifsc_Code"
          placeholder="IFSC Code"
          onChange={handledatachange}
        />
        {ifscError ? (
          <p style={{ color: 'red' }}>Provide Valid IFSC code</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control
          type="text"
          name="bankName"
          placeholder="Bank Name"
          onChange={handledatachange}
        />
        {bankNameError ? (
          <p style={{ color: 'red' }}>Bank Name should contain alphabets</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>E-mail ID</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="E-mail ID"
          onChange={handledatachange}
        />
        {emailError ? (
          <p style={{ color: 'red' }}>Provide valid Email ID</p>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Communication Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          placeholder="Communication Address"
          onChange={handledatachange}
        />
        {addressError ? <p style={{ color: 'red' }}>Provide Address</p> : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          Permanent Address (leave blank if same as above)
        </Form.Label>
        <Form.Control
          as="textarea"
          name="permanentAddress"
          placeholder="Communication Address"
          onChange={handledatachange}
        />
      </Form.Group>
    </>
  );
};

export default ContactBank;
