import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { useNavigate } from 'react-router-dom';

const Login = ({ setLoginUser }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;
  const login = async () => {
    await axios
      .post('http://localhost:8000/auth/login', user, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        if (res.data.Status === 'Success') {

          let hash = res.data.result;
          let rep = hash.replace(/\//g, "slash");

          router.push(`/clientDashbord/${[rep]}`);

        } else if (res.data.message === 'Please enter correct password') {
          alert(res.data.message);
        } else if (res.data.message === 'Please fill the form Or wait till get the login credentials') {
          alert(res.data.message);
          // router.push('/auth/register');
        }
        // navigate('/');
      });
  };

  return (
    <div className="loginparent">
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        ></input>
        <div className="button" onClick={login}>
          Login
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate('/register')}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;