import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from "js-cookie";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;
  const login = async (e) => {
    e.preventDefault();

    // let axiosConfig = {
    //   header: {
    //     withCredentials: true,
    //     credentials: 'include',
    //     'Content-Type': 'application/json',
    //     'Access-Contol-Allow-Origin': '*',
    //   },
    // };

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, user, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((res) => {
        if (res.data.Status === 'Success') {
          let hash = res.data.result;
          let rep = hash.replace(/\//g, 'slash');
          Cookies.set("newtoken", res.data.cookie, {
            expires: 7,
          });
          router.push(`/clientDashbord/${[rep]}`);
        } else if (res.data.message === 'Please enter correct password') {
          alert(res.data.message);
        } else if (
          res.data.message ===
          'Please fill the form Or wait till get the login credentials'
        ) {
          alert(res.data.message);
        }
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className="user-data-form mt-40 lg-mt-30">
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta mb-30">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="hasan@gmail.com"
              ></input>
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-12">
            <div className="input-group-meta mb-25">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={user.password}
                name="password"
                onChange={handleChange}
                className="pass_log_id"
                required
              ></input>
              <span className="placeholder_icon" onClick={handleTogglePassword}>
                <span className=" d-flex align-items-center">
                  {showPassword ? (
                    <>
                      <i className="fa-regular fa-eye"></i>
                    </>
                  ) : (
                    <>
                      <i className=" fa-regular fa-eye-slash"></i>
                    </>
                  )}
                </span>
              </span>
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-12">
            <div className="agreement-checkbox d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>
              <Link href="/ForgetPassword">Forget Password?</Link>
            </div>
            {/* /.agreement-checkbox */}
          </div>
          {/* End .col-12 */}

          {/* <div className="col-12">
            <button
              type="submit"
              className="btn-twentyTwo w-100 fw-500 tran3s text-uppercase mt-30"
            >
              Login
            </button>
          </div> */}
          {/* End .col-12 */}
        </div>
      </form>
      <button
        onClick={login}
        className="btn-twentyTwo w-100 fw-500 tran3s text-uppercase mt-30"
      >
        Login
      </button>
    </>
  );
};

export default LoginForm;
