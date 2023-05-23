import React from 'react';
import Form from 'react-bootstrap/Form';

const ImageUpload = ({
  handleChangeAadhaar,
  handleChangePassport,
  handleChangePan,
  handleChangeSignature,
  passportSizeImage,
  aadharImage,
  panImage,
  signatureImage,
  handleImageUpload,
  passPortSizeError,
  passPortSizeImageEmptyError,
  aadhaarImageEmptyError,
  aadhaarError,
  panImageEmptyError,
  panImageError,
  signatureImageEmptyError,
  signatureError,
}) => {
  return (
    <>
      <h1>Images upload</h1>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Passport Size photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleChangePassport(e)}
          accept="image/png, image/jpeg, image/jpg,"
        />
        <p>
          <i>Image should be less than 2MB</i>
        </p>
        {passPortSizeError ? (
          <p style={{ color: 'red' }}>Image Size should be less than 2MB</p>
        ) : null}
        {passPortSizeImageEmptyError ? (
          <p style={{ color: 'red' }}>Upload a Image</p>
        ) : null}
      </Form.Group>
      {passPortSizeError ? null : (
        <>
          {passportSizeImage ? (
            <img src={passportSizeImage} width="150px" alt="iddbf" />
          ) : null}
        </>
      )}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Adhaar photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleChangeAadhaar(e)}
          accept="image/png, image/jpeg, image/jpg,"
        />
        <p>
          <i>Image should be less than 2MB</i>
        </p>
        {aadhaarError ? (
          <p style={{ color: 'red' }}>Image Size should be less than 2MB</p>
        ) : null}
        {aadhaarImageEmptyError ? (
          <p style={{ color: 'red' }}>Upload a Image</p>
        ) : null}
      </Form.Group>
      {aadhaarError ? null : (
        <>
          {aadharImage ? (
            <img src={aadharImage} width="150px" alt="iddbf" />
          ) : null}
        </>
      )}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Pan photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleChangePan(e)}
          accept="image/png, image/jpeg, image/jpg,"
        />
        <p>
          <i>Image should be less than 2MB</i>
        </p>
        {panImageError ? (
          <p style={{ color: 'red' }}>Image Size should be less than 2MB</p>
        ) : null}
        {panImageEmptyError ? (
          <p style={{ color: 'red' }}>Upload a Image</p>
        ) : null}
      </Form.Group>
      {panImageError ? null : (
        <>
          {panImage ? <img src={panImage} width="150px" alt="iddbf" /> : null}
        </>
      )}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Signature</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleChangeSignature(e)}
          accept="image/png, image/jpeg, image/jpg,"
        />
        <p>
          <i>Image should be less than 2MB</i>
        </p>
        {signatureError ? (
          <p style={{ color: 'red' }}>Image Size should be less than 2MB</p>
        ) : null}
        {signatureImageEmptyError ? (
          <p style={{ color: 'red' }}>Upload a Image</p>
        ) : null}
      </Form.Group>
      {signatureError ? null : (
        <>
          {signatureImage ? (
            <img src={signatureImage} width="150px" alt="iddbf" />
          ) : null}
        </>
      )}
    </>
  );
};

export default ImageUpload;
