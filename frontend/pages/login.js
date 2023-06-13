import Link from 'next/link';
import LoginForm from '../components/common/LoginForm';
import Seo from '../components/common/Seo';
import Image from 'next/image';

const LogIn = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Seo pageTitle="Login" />
      {/* 
        =============================================
        Theme Main Menu
        ============================================== 
        */}
      <header className="theme-main-menu sticky-menu theme-menu-eight">
        <div className="inner-content position-relative">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo order-lg-0">
              <Link href="/" className="d-block">
                <img
                  src="/images/logo/logo.jpg"
                  alt=""
                  width={95}
                  height={50}
                />
              </Link>
            </div>
            <Link href="/" className="go-back-btn fw-500 tran3s">
              Go to home
            </Link>
          </div>
        </div>
        {/* /.inner-content */}
      </header>
      {/* /.theme-main-menu */}

      {/* 
        =============================================
        User Data Page
        ============================================== 
        */}
      <div className="user-data-section d-flex align-items-center justify-content-center flex-column position-relative">
        <div className="form-wrapper position-relative m-auto">
          <div className="text-center">
            <h2 className="tx-dark mb-30 lg-mb-10">Login</h2>
            <p className="fs-20 tx-dark">
              Still don&lsquo;t have an account?{' '}
              <Link href="/form/clientForm">Register</Link>
            </p>
          </div>
          <LoginForm />
        </div>
        {/* End form-wrapper */}

        <p className="mt-auto pt-50">Copyright @{currentYear} jano inc.</p>
        <img
          src="/images/assets/ils_11.png"
          alt="illustration"
          className="lazy-img illustration-one wow fadeInRight"
          width={40}
          height={40}
        />
        <img
          src="/images/assets/ils_12.png"
          alt="illustration"
          className="lazy-img illustration-two wow fadeInLeft"
          width={40}
          height={40}
        />
      </div>
      {/* /.fancy-feature-fiftyOne */}
    </>
  );
};

export default LogIn;
