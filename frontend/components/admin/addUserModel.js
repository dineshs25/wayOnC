import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddUserModel = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passowrdError, setPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const [userName, setUserName] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const passVer = newPasswordValidation(newPassword);
    if (passVer) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/addEmployee`, {
          userName,
          newPassword,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Added User Successfully');
            window.location.reload(true);
          } else {
            alert(result.data.Status);
          }
        });
    }
  };

  const newPasswordValidation = (pass) => {
    const exp = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    if (!pass) {
      alert('Please fill all the input fields');
      return false;
    } else {
      if (!exp.test(pass)) {
        setPasswordError(true);
        return false;
      } else {
        setPasswordError(false);
        return true;
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
          Add New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-flex">
          <form className="addUserForm">
            <label>UserName</label>
            <br />
            <input
              className="inputAddUser"
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <label>Password</label>
            <br />
            <div className="inputbox addUser-password">
              <input
                className="newPass"
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <span className="placeholder_icon" onClick={handleTogglePassword}>
                <span className=" d-flex align-items-center">
                  {showPassword ? (
                    <>
                      <i class="fa-regular fa-eye"></i>
                    </>
                  ) : (
                    <>
                      <i class=" fa-regular fa-eye-slash"></i>
                    </>
                  )}
                </span>
              </span>
            </div>
            {passowrdError ? (
              <p style={{ color: 'red' }}>
                <i>
                  Password must containe at least 1 uppercase, 1 lowercase, 1
                  digit, 1 special character and have a length of at least of 10
                </i>
              </p>
            ) : null}
            <br />
            <button className="pay extend-suc-btn" onClick={handleAddUser}>
              ADD
            </button>{' '}
          </form>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AddUserModel;
