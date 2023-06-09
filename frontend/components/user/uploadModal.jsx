import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UploadModal = (props) => {
  //passportSizeimage
  const [passportSizeFile, setPassportSizeFile] = useState('');
  const [passportSizeImage, setPassportSizeImage] = useState('');
  const [passPortSizeError, setPaaaPortSizeError] = useState(false);
  const [passPortSizeImageEmptyError, setPassPortSizeImageEmptyError] =
    useState(false);

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

  //   const handleExtend = async (e, id) => {
  //     e.preventDefault();
  //     const monthVer = monthSelectValidation(time);
  //     if (monthVer) {
  //       await axios
  //         .put('http://localhost:8000/client/extend', { time, id })
  //         .then((res) => {
  //           if (res.data.Status === 'Success') {
  //             alert('Extended your plan Successfully');
  //             window.location.reload(true);
  //           } else {
  //             alert(res.data.Status);
  //           }
  //         })
  //         .catch((e) => {
  //           console.log('axios error extend', e);
  //         });
  //     }
  //   };

  const handleUpload = async (e, id) => {
    e.preventDefault();
    const passPortImageVer = passportSizeImageValidation(passportSizeImage);
    if (passPortImageVer) {
      await axios
        .post('http://localhost:8000/admin/agreements/upload', {
          passportSizeImage, id
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select Number of months you want to extend.</p>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Passport Size photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleChangePassport(e)}
            accept="image/png, image/jpeg, image/jpg, application/pdf"
          />
          <p>
            <i>Image should be less than 2MB</i>
          </p>
          {passPortSizeError ? (
            <p style={{ color: 'red' }}>File Size should be less than 2MB</p>
          ) : null}
          {passPortSizeImageEmptyError ? (
            <p style={{ color: 'red' }}>Upload a File</p>
          ) : null}
        </Form.Group>
        <br />
        <button
          className="pay extend-suc-btn"
          onClick={(e) => {
            handleUpload(e, props.id);
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

export default UploadModal;
