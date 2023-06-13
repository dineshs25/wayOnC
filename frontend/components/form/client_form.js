import React, { useEffect, useState } from 'react';
import axios from 'axios';
import validator from 'aadhaar-validator';
import Form from 'react-bootstrap/Form';
import ContactBank from './form_Components/contact&Bank';
import Nominee from './form_Components/nominee';
import ImageUpload from './form_Components/imageUpload';
import ChoosePlan from './form_Components/choosePlan';
import ClientInfo from './form_Components/clientInfo';
import { useNavigate } from 'react-router-dom';
import Image from 'next/image';

const ClientForm = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const fetchAPI = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
          } else {
            setAuth(false);
            navigate('/login');
            // setMessage(result.data.Message);
          }
        })
        .catch((e) => {
          console.log('axios', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const API = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/auth`;
    fetchAPI(API);
  }, []);

  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`)
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

  //passportSizeimage
  const [passportSizeFile, setPassportSizeFile] = useState('');
  const [passportSizeImage, setPassportSizeImage] = useState('');

  //panimage
  const [panFile, setPanFile] = useState('');
  const [panImage, setpanImage] = useState('');

  //panimage
  const [signatureFile, setSignatureFile] = useState('');
  const [signatureImage, setSignatureImage] = useState('');

  const [validate, setValidate] = useState(false);
  const [duedate, setDueDate] = useState('');

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

    const date = new Date();
    const resultDate = date.setMonth(
      date.getMonth() + parseInt(formData.months)
    );
    const expdate = new Date(resultDate).toISOString().substring(0, 10);
    setDueDate(expdate);
    const isodate = new Date(resultDate).toISOString();
    const val = validator.isValidNumber(formData.adhaar);

    if (val) {
      setValidate(false);
      const result = await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/client_post`, {
          formData,
          nomineeData,
          expDate: isodate,
        })
        .then((res) => {
          alert(res.data.Status);
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(formData, isodate);
    } else {
      setValidate(true);
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
    setAadharFile(file);
    previewAadharFiles(file);
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
    setPassportSizeFile(file);
    previewPassortFiles(file);
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
    setPanFile(file);
    previewPanFiles(file);
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
    setSignatureFile(file);
    previewSignatureFiles(file);
  };
  const previewSignatureFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSignatureImage(reader.result);
    };
  };

  return (
    <>
      {auth && (
        <>
          <button onClick={logout}>logout</button>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Client Information */}
            <ClientInfo
              handledatachange={handledatachange}
              validate={validate}
            />

            {/* Contact & Bank Information */}
            <ContactBank handledatachange={handledatachange} />

            {/* Nominee Details */}
            <Nominee handleNomineedatachange={handleNomineedatachange} />

            {/* images */}
            {/*<imgUpload
              handleChangeAadhaar={handleChangeAadhaar}
              aadharImage={aadharImage}
              handleChangePassport={handleChangePassport}
              passportSizeImage={passportSizeImage}
              handleChangePan={handleChangePan}
              panImage={panImage}
              handleChangeSignature={handleChangeSignature}
              signatureImage={signatureImage}
            /> */}

            {/* choose plan */}
            <ChoosePlan handledatachange={handledatachange} duedate={duedate} />
            <button type="submit">submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default ClientForm;
