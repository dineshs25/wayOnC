import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import validator from 'aadhaar-validator';
import Form from 'react-bootstrap/Form';
import ContactBank from '../../components/form/form_Components/contact&Bank';

import Nominee from '../../components/form/form_Components/nominee';
import ImageUpload from '../../components/form/form_Components/imageUpload';
import ChoosePlan from '../../components/form/form_Components/choosePlan';
import ClientInfo from '../../components/form/form_Components/clientInfo';
import Container from 'react-bootstrap/Container';

import { useRouter } from 'next/navigation';

const ClientForm = () => {
  const currentYear = new Date().getFullYear();

  const [auth, setAuth] = useState(false);
  const [panError, setPanError] = useState(false);
  const [panLength, setPanLength] = useState(false);
  const [passportError, setPassportError] = useState(false);
  const [validate, setValidate] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [altNumberError, setAltNumberError] = useState(false);
  const [bankACError, setBankACError] = useState(false);
  const [clientNameError, setClientNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [acHolderNameError, setAcHolderNameError] = useState(false);
  const [ifscError, setIfscError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [nomineeNameError, setNomineeNameError] = useState(false);
  const [nomineeNumberError, setNomineeNumberError] = useState(false);
  const [relationshipError, setRelationShipError] = useState(false);
  const [nomineeAadhaarError, setNomineeAadhaarError] = useState(false);
  const [nomineeEmailError, setNomineeEmailError] = useState(false);
  const [nomineeAddressError, setNomineeAddressError] = useState(false);

  const [passPortSizeImageEmptyError, setPassPortSizeImageEmptyError] =
    useState(false);
  const [aadhaarImageEmptyError, setAadhaarImageEmptyError] = useState(false);
  const [panImageEmptyError, setPanImageEmptyError] = useState(false);
  const [signatureImageEmptyError, setSignatureImageEmptyError] =
    useState(false);

  const router = useRouter();

  // axios.defaults.withCredentials = true;
  const fetchAPI = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
          } else {
            setAuth(false);
            router.push('/auth/login');
          }
        })
        .catch((e) => {
          console.log('axios', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const API = 'http://localhost:8000/auth/auth';
  //   fetchAPI(API);
  // }, []);

  const logout = async () => {
    await axios
      .post('http://localhost:8000/auth/logout')
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('failed to logout');
        }
      })
      .catch((e) => {
        console.log('logout axios error', e);
      });
  };

  //aadhaarimage
  const [aadharFile, setAadharFile] = useState('');
  const [aadharImage, setAadharImage] = useState('');
  const [aadhaarError, setAadhaarError] = useState(false);

  //passportSizeimage
  const [passportSizeFile, setPassportSizeFile] = useState('');
  const [passportSizeImage, setPassportSizeImage] = useState('');
  const [passPortSizeError, setPaaaPortSizeError] = useState(false);

  //panimage
  const [panFile, setPanFile] = useState('');
  const [panImage, setpanImage] = useState('');
  const [panImageError, setPanImageError] = useState(false);

  //panimage
  const [signatureFile, setSignatureFile] = useState('');
  const [signatureImage, setSignatureImage] = useState('');
  const [signatureError, setSignatureError] = useState(false);

  const [duedate, setDueDate] = useState('');
  const [checkbox, setCheckBox] = useState(false);


  const [id, setId] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    dob: '',
    panNum: '',
    adhaar: '',
    passportNum: '',
    mobile: '',
    altMobile: '',
    bank_AC_Num: '',
    acc_holder_name: '',
    ifsc_Code: '',
    bankName: '',
    email: '',
    address: '',
    permanentAddress: '',
    months: '',
  });

  const [nomineeData, setNomineeData] = useState({
    nominee_name: '',
    nominee_mobile: '',
    nominee_relationship: '',
    nominee_adhaar: '',
    nominee_email: '',
    nominee_address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aadhaarVal = aadharValidation(formData.adhaar);
    const panVer = panValidation(formData.panNum);
    const passver = passportValidation(formData.passportNum);
    const numVer = numberValidator(formData.mobile);
    const altnumVer = altNumberValidator(formData.altMobile);
    const bankVer = bankValidator(formData.bank_AC_Num);
    const clientNameVer = clientNameValidator(formData.clientName);
    const dobVer = dobValidation(formData.dob);
    const accHolderNameVer = acHolderNameValidator(formData.acc_holder_name);
    const ifscVer = bankIfscValidator(formData.ifsc_Code);
    const bankNameVer = bankNameeValidator(formData.bankName);
    const emailVer = emailValidator(formData.email);
    const addressVer = addressValidation(formData.address);
    const nomineeNameVer = nomineeNameeValidator(nomineeData.nominee_name);
    const nomineeNumberVer = nomineeNumberValidator(nomineeData.nominee_mobile);
    const relationshipVer = relationShipValidator(
      nomineeData.nominee_relationship
    );
    const nomineeAadharVer = nomineeAadharValidation(
      nomineeData.nominee_adhaar
    );
    const nomineeEmail = nomineeEmailValidator(nomineeData.nominee_email);
    const nomineeAddressVer = nomineeAddressValidation(
      nomineeData.nominee_address
    );
    const passPortImageVer = passportSizeImageValidation(passportSizeImage);
    const aadhaarImageVer = aadhaarImageValidation(aadharImage);
    const panImageVer = panImageValidation(panImage);
    const signatureImageVer = signatureImageValidation(signatureImage);
    const checkedVer = handleCheckboxSubmit(checkbox);
    if (
      checkedVer && 
      panVer &&
      aadhaarVal &&
      passver &&
      numVer &&
      altnumVer &&
      bankVer &&
      clientNameVer &&
      dobVer &&
      accHolderNameVer &&
      ifscVer &&
      bankNameVer &&
      emailVer &&
      addressVer &&
      nomineeNameVer &&
      nomineeNumberVer &&
      relationshipVer &&
      nomineeAadharVer &&
      nomineeEmail &&
      nomineeAddressVer &&
      passPortImageVer &&
      aadhaarImageVer &&
      panImageVer &&
      signatureImageVer
    ) {
      await axios
        .post('http://localhost:8000/client/client_post', {
          formData,
          nomineeData,
          aadharImage,
          passportSizeImage,
          signatureImage,
          panImage,
        })
        .then((res) => {
          if (res.data.Status === 'Please provide different Email') {
            alert('Please provide different Email');
          } else {
            alert(res.data.Status);
            setId(res.data.result[0]._id);
            // console.log("response id", res.data.result[0]._id)
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(formData, isodate);
    } else {
      alert('Please Fill all the Fields');
    }
  };

  const handledatachange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNomineedatachange = (e) => {
    const { name, value } = e.target;
    setNomineeData({
      ...nomineeData,
      [name]: value,
    });
  };

  //adhaarImages
  const handleChangeAadhaar = (e) => {
    const file = e.target.files[0];
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setAadhaarError(true);
    } else {
      setAadhaarError(false);
      setAadharFile(file);
      previewAadharFiles(file);
    }
  };

  const previewAadharFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAadharImage(reader.result);
    };
  };

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

  //panImage
  const handleChangePan = (e) => {
    const file = e.target.files[0];
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setPanImageError(true);
    } else {
      setPanImageError(false);
      setPanFile(file);
      previewPanFiles(file);
    }
  };
  const previewPanFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpanImage(reader.result);
    };
  };

  //signatureImage
  const handleChangeSignature = (e) => {
    const file = e.target.files[0];
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setSignatureError(true);
    } else {
      setSignatureError(false);
      setSignatureFile(file);
      previewSignatureFiles(file);
    }
  };
  const previewSignatureFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSignatureImage(reader.result);
    };
  };

  //handleUploadImage
  const handleImageUpload = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/client/client_images', {
      aadharImage,
      passportSizeImage,
      signatureImage,
      panImage,
    });
  };

  //panValidation
  const panValidation = (num) => {
    const pan = num;
    if (pan.length === 10 && pan.length <= 10) {
      setPanLength(false);
      var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
      if (regex.test(pan.toUpperCase())) {
        setPanError(false);
        return true;
      } else {
        setPanError(true);
        return false;
      }
    } else if (pan.length < 10) {
      setPanLength(true);
      return false;
    }
  };

  //passportValidation
  const passportValidation = (num) => {
    if (!num) {
      return true;
      setPassportError(false);
    } else {
      var expr = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/;
      if (!expr.test(num)) {
        setPassportError(true);
        return false;
      } else {
        setPassportError(false);
        return true;
      }
    }
  };

  //aadhaarValidation
  const aadharValidation = (num) => {
    if (!num) {
      setValidate(true);
      return false;
    } else {
      const aadhaarVal = validator.isValidNumber(num);
      if (aadhaarVal) {
        setValidate(false);
        return true;
      } else {
        setValidate(true);
        return false;
      }
    }
  };

  //numberValidator
  const numberValidator = (num) => {
    if (!num) {
      setNumberError(true);
      return false;
    } else {
      var exp = /^([+]\d{2})?\d{10}$/;
      if (!exp.test(num)) {
        setNumberError(true);
        return false;
      } else {
        setNumberError(false);
        return true;
      }
    }
  };

  const altNumberValidator = (num) => {
    if (!num) {
      setAltNumberError(true);
      return false;
    } else {
      var exp = /^([+]\d{2})?\d{10}$/;
      if (!exp.test(num)) {
        setAltNumberError(true);
        return false;
      } else {
        setAltNumberError(false);
        return true;
      }
    }
  };

  //BankACValidator
  const bankValidator = (num) => {
    if (!num) {
      setBankACError(true);
      return false;
    } else {
      var exp1 = /^[0-9]{9,18}$/;
      var exp2 = /^\d{9,18}$/;
      if (!exp1.test(num) || !exp2.test(num)) {
        setBankACError(true);
        return false;
      } else {
        setBankACError(false);
        return true;
      }
    }
  };

  //name
  const clientNameValidator = (text) => {
    var exp1 = /^[A-Za-z ]+$/;
    if (text === null) {
      return false;
    } else {
      if (!exp1.test(text)) {
        setClientNameError(true);
        return false;
      } else {
        setClientNameError(false);
        return true;
      }
    }
  };

  //dob
  const dobValidation = (dob) => {
    if (!dob) {
      setDobError(true);
      return false;
    } else {
      const today = new Date();
      if (dob > today) {
        setDobError(true);
        return false;
      } else {
        setDobError(false);
        return true;
      }
    }
  };

  //AcHoldername
  const acHolderNameValidator = (text) => {
    var exp1 = /^[A-Za-z ]+$/;
    if (!text) {
      setAcHolderNameError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setAcHolderNameError(true);
        return false;
      } else {
        setAcHolderNameError(false);
        return true;
      }
    }
  };

  //bankifscCode
  const bankIfscValidator = (text) => {
    var exp1 = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
    if (!text) {
      setIfscError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setIfscError(true);
        return false;
      } else {
        setIfscError(false);
        return true;
      }
    }
  };

  //BankName
  const bankNameeValidator = (text) => {
    var exp1 = /^[A-Za-z ]+$/;
    if (!text) {
      setBankNameError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setBankNameError(true);
        return false;
      } else {
        setBankNameError(false);
        return true;
      }
    }
  };

  //Email
  const emailValidator = (text) => {
    var exp1 =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!text) {
      setEmailError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setEmailError(true);
        return false;
      } else {
        setEmailError(false);
        return true;
      }
    }
  };

  //Address
  const addressValidation = (text) => {
    if (!text) {
      setAddressError(true);
      return false;
    } else {
      setAddressError(false);
      return true;
    }
  };

  //NomineeName
  const nomineeNameeValidator = (text) => {
    var exp1 = /^[A-Za-z ]+$/;
    if (!text) {
      setNomineeNameError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setNomineeNameError(true);
        return false;
      } else {
        setNomineeNameError(false);
        return true;
      }
    }
  };

  //nomineeNumber
  const nomineeNumberValidator = (num) => {
    if (!num) {
      setNomineeNumberError(true);
      return false;
    } else {
      var exp = /^([+]\d{2})?\d{10}$/;
      if (!exp.test(num)) {
        setNomineeNumberError(true);
        return false;
      } else {
        setNomineeNumberError(false);
        return true;
      }
    }
  };

  //nomineeRelationShip
  const relationShipValidator = (text) => {
    var exp1 = /^[A-Za-z]+$/;
    if (!text) {
      setRelationShipError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setRelationShipError(true);
        return false;
      } else {
        setRelationShipError(false);
        return true;
      }
    }
  };

  //nomineeAadhaarValidation
  const nomineeAadharValidation = (num) => {
    if (!num) {
      setNomineeAadhaarError(true);
      return false;
    } else {
      const aadhaarVal = validator.isValidNumber(num);
      if (aadhaarVal) {
        setNomineeAadhaarError(false);
        return true;
      } else {
        setNomineeAadhaarError(true);
        return false;
      }
    }
  };

  //nomineeEmail
  const nomineeEmailValidator = (text) => {
    var exp1 =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!text) {
      setNomineeEmailError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setNomineeEmailError(true);
        return false;
      } else {
        setNomineeEmailError(false);
        return true;
      }
    }
  };

  //nomineeAddress
  const nomineeAddressValidation = (text) => {
    if (!text) {
      setNomineeAddressError(true);
      return false;
    } else {
      setNomineeAddressError(false);
      return true;
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

  //aadhaarImage
  const aadhaarImageValidation = (img) => {
    if (!img) {
      setAadhaarImageEmptyError(true);
      return false;
    } else {
      setAadhaarImageEmptyError(false);
      return true;
    }
  };

  //panImage
  const panImageValidation = (img) => {
    if (!img) {
      setPanImageEmptyError(true);
      return false;
    } else {
      setPanImageEmptyError(false);
      return true;
    }
  };

  //signatureImage
  const signatureImageValidation = (img) => {
    if (!img) {
      setSignatureImageEmptyError(true);
      return false;
    } else {
      setSignatureImageEmptyError(false);
      return true;
    }
  };

  const handleCheckbox = () => {
    if (checkbox === false) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  };

  const handleCheckboxSubmit = (checkbox) => {
    if (checkbox === false) {
      alert('Please tick the checkbox to submit');
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {/* {auth && ( */}
      <>
        <header className="theme-main-menu sticky-menu theme-menu-eight">
          <div className="inner-content position-relative">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/" className="d-block">
                  <img src="/images/logo/logo_01.png" alt="" width={95} />
                </Link>
              </div>
              <Link href="/" className="go-back-btn fw-500 tran3s">
                Go to home
              </Link>
            </div>
          </div>
          {/* /.inner-content */}
        </header>
        <div className="user-data-section d-flex align-items-center justify-content-center flex-column position-relative">
          <div className="form-div position-relative ">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="col-md-8 m-auto "
            >
              {/* choose plan */}
              {/* <ChoosePlan handledatachange={handledatachange} duedate={duedate} /> */}

              {/* Client Information */}
              <ClientInfo
                handledatachange={handledatachange}
                validate={validate}
                panError={panError}
                panLength={panLength}
                passportError={passportError}
                clientNameError={clientNameError}
                dobError={dobError}
              />

              {/* Contact & Bank Information */}
              <ContactBank
                handledatachange={handledatachange}
                numberError={numberError}
                altNumberError={altNumberError}
                bankACError={bankACError}
                acHolderNameError={acHolderNameError}
                ifscError={ifscError}
                bankNameError={bankNameError}
                emailError={emailError}
                addressError={addressError}
              />

              {/* Nominee Details */}
              <Nominee
                handleNomineedatachange={handleNomineedatachange}
                nomineeNameError={nomineeNameError}
                nomineeNumberError={nomineeNumberError}
                relationshipError={relationshipError}
                nomineeAadhaarError={nomineeAadhaarError}
                nomineeEmailError={nomineeEmailError}
                nomineeAddressError={nomineeAddressError}
              />

              {/* images */}
              <ImageUpload
                handleChangeAadhaar={handleChangeAadhaar}
                aadharImage={aadharImage}
                handleChangePassport={handleChangePassport}
                passportSizeImage={passportSizeImage}
                handleChangePan={handleChangePan}
                panImage={panImage}
                handleChangeSignature={handleChangeSignature}
                signatureImage={signatureImage}
                handleImageUpload={handleImageUpload}
                passPortSizeError={passPortSizeError}
                passPortSizeImageEmptyError={passPortSizeImageEmptyError}
                aadhaarImageEmptyError={aadhaarImageEmptyError}
                aadhaarError={aadhaarError}
                panImageEmptyError={panImageEmptyError}
                panImageError={panImageError}
                signatureImageEmptyError={signatureImageEmptyError}
                signatureError={signatureError}
              />
              <p className="tc">
                <Link href="/T&C">Terms & Conditions</Link>
              </p>
              <div className="checkbox">
                <input type="checkbox" onChange={handleCheckbox} required />
                <p className='checkbox-p'>I agree for the terms and conditions</p>
              </div>
              <button type="submit">submit</button>

              {/* <button onClick={handleImageUpload}>Upload Images</button> */}
            </form>
          </div>
          <p className="">Copyright @{currentYear} jano inc.</p>
          <img
            src="/images/assets/ils_11.png"
            alt="illustration"
            className="lazy-img illustration-one wow fadeInRight"
          />
          <img
            src="/images/assets/ils_12.png"
            alt="illustration"
            className="lazy-img illustration-two wow fadeInLeft"
          />
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default ClientForm;
