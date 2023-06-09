import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AsignModal = (props) => {
  //passportSizeimage
  const [passportSizeFile, setPassportSizeFile] = useState('');
  const [passportSizeImage, setPassportSizeImage] = useState('');
  const [passPortSizeError, setPaaaPortSizeError] = useState(false);
  const [passPortSizeImageEmptyError, setPassPortSizeImageEmptyError] =
    useState(false);
    const [interest, setInterest] = useState('');


  //passportSizeImage
  const handleChangePassport = (e) => {
    const file = e.target.files[0];
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setPaaaPortSizeError(true);
    } else {
      setPaaaPortSizeError(false);
      setPassportSizeFile(file);
      previewPassortFiles(file);
    }
  };

  const previewPassortFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPassportSizeImage(reader.result);
    };
  };

  const handleUpload = async (e, id) => {
    e.preventDefault();
    const passPortImageVer = passportSizeImageValidation(passportSizeImage);
    if (passPortImageVer) {
      await axios
        .post('http://localhost:8000/admin/agreements/upload', {
          passportSizeImage,
          id,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Uploaded File Successfully');
          } else {
            alert(result.data.Status);
          }
        });
    }
  };

  //passportSizeImage
  const passportSizeImageValidation = (img) => {
    if (!img) {
      setPassPortSizeImageEmptyError(true);
      return false;
    } else {
      setPassPortSizeImageEmptyError(false);
      return true;
    }
  };

  const handleInterest = async (e, id) => {
    e.preventDefault();
    if (interest === '') {
      alert('Assign Interest');
    } else {
      await axios
        .put('http://localhost:8000/admin/assignInterest', { interest, id })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Assigned Interest Successfully');
          } else {
            alert(result.data.Status);
          }
        });
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
          Assign Interest
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Label>Interest in per month % (eg: 3)</Form.Label>
          <input
            className="assignInterest"
            type="number"
            onChange={(e) => {
              setInterest(e.target.value);
            }}
          />
          <button
            className="pay"
            onClick={(e) => {
              handleInterest(e, props.id);
            }}
          >
            Assign
          </button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AsignModal;
