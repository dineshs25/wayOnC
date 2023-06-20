import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal = (props) => {
  const [time, setTime] = useState('');

  const handleExtend = async (e, id) => {
    e.preventDefault();
    const monthVer = monthSelectValidation(time);
    if (monthVer) {
      await axios
        .put(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/extend`, { time, id })
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Extended your plan Successfully');
            window.location.reload(true);
          } else {
            alert(res.data.Status);
          }
        })
        .catch((e) => {
          console.log('axios error extend', e);
        });
    }
  };

  const monthSelectValidation = (month) => {
    const val = parseInt(month);
    if (!val) {
      alert('Please select number of months');
      return false;
    } else {
      const exp = /^[0-9]*$/;
      if (!exp.test(val)) {
        alert('Please select valid Months');
        return false;
      } else {
        if (val === 12 || val === 24 || val === 36) {
          return true;
        } else {
          alert('Please select month in given options');
          return false;
        }
      }
    }
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
          Extend Plan
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select Number of months you want to extend.</p>
        <select
          onChange={(e) => {
            setTime(e.target.value);
          }}
          required
        >
          <option disabled selected hidden>
            Choose Duration
          </option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
        <br />
        <button
          className="pay extend-suc-btn"
          onClick={(e) => {
            handleExtend(e, props.id);
          }}
        >
          EXTEND
        </button>{' '}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
