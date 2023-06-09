import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';


const Register = () => {
  // const navigate = useNavigate();
  const router = useRouter();


  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, user)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          router.push("/auth/login");
        })
        .catch((e) => {
          console.log('login axios catch error', e);
        });
    } else {
      alert('invlid input');
    }
  };

  return (
    <div className="registerparent">
      <div className="register">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Your Password"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        ></input>
        <div className="button" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate('/login')}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Register;
