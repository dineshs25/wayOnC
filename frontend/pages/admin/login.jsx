import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from "js-cookie";


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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/login`, user, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        if (res.data.message === 'Success') {
          Cookies.set("newAdmintoken", res.data.cookie, {
            expires: 7,
          });
          router.push('/admin/dashboard');
        } else {
          alert(res.data.Status);
        }
      });
  };

  return (
    <div className="loginparent">
      <div className="login">
        <div className="loginForm">
          <h2>Welcome back Admin</h2>
          <p>Login to the Dashboard</p>
          <form>
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
          </form>
          <button className="login-btn" onClick={login}>
            Login
          </button>
        </div>
        <div className="loginImage">
          <img
            src="/images/assets/Finance & Investment Illustration 9.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
