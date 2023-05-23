import React from 'react';
import Form from 'react-bootstrap/Form';

const ChoosePlan = ({ handledatachange, duedate }) => {
  return (
    <>
      <h1>Choose Plan</h1>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Choose number of months</Form.Label>
        <select
          name="months"
          onChange={handledatachange}
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Choose plan
          </option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Expire date</Form.Label>
        <Form.Control
          name="expdate"
          type="date"
          placeholder="select date"
          defaultValue={duedate}
        />
      </Form.Group>
    </>
  );
};

export default ChoosePlan;
