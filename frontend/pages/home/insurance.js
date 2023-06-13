import Link from 'next/link';
import Seo from '../../components/common/Seo';
import Footer from '../../components/footer/Footer';
import DefaulHeader from '../../components/header/DefaulHeader';
import AppBanner from '../../components/home-page/home-1/AppBanner';
import Banner from '../../components/home-page/home-1/Banner';
import Block from '../../components/home-page/home-1/Block';
import Blog from '../../components/home-page/home-1/Blog';
import ContactForm from '../../components/home-page/home-1/ContactForm';
import Feature from '../../components/home-page/home-1/Feature';
import Hero from '../../components/home-page/home-1/Hero';
import IntroAbout from '../../components/home-page/home-1/IntroAbout';
import Service from '../../components/home-page/home-1/Service';
import Testimonial from '../../components/home-page/home-1/Testimonial';
import WhyChoose from '../../components/home-page/home-1/WhyChoose';
import Features3 from '../../components/home-page/home-7/Features3';
import LogoGroup from '../../components/home-page/home-7/LogoGroup';
import DefaultFooter from '../../components/footer/DefaultFooter';
import Image from 'next/image';

const Insurance = () => {
  return (
    <>
      <Seo pageTitle="Insurance" />
      {/* <!-- 
      =============================================
			Theme Default Menu
			============================================== 	
      --> */}
      <DefaulHeader />
      {/* <!-- 
			=============================================
			Theme Hero Banner
			============================================== 
			--> */}
      <Hero />
      {/* <!-- 
			=============================================
				Feature Section Thirty Four
			============================================== 
			--> */}
      <div className="fancy-feature-thirtyFour mt-50">
        <div className="container">
          <div className="row gx-xxl-5">
            <Feature />
          </div>
        </div>
        {/* <!-- /.container --> */}
      </div>
      <div className="fancy-feature-ten position-relative mt-170 lg-mt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 m-auto">
              <div
                className="title-style-four text-center pb-100"
                data-aos="fade-up"
              >
                <div className="sc-title-two" style={{ color: '#6A45FF' }}>
                  Features
                </div>
                <h2 className="main-title fw-500 tx-dark m0">
                  Check key features of our <span>apps</span>
                </h2>
              </div>
              {/* /.title-style-four */}
            </div>
          </div>
          {/* End .row */}

          <Features3 />
          {/* /.wrapper */}
        </div>
      </div>

      {/* <!-- /.fancy-feature-thirtyFour --> */}
      {/*
			=====================================================
				Feature Section Thirty Five
			=====================================================
			*/}
      <div className="fancy-feature-thirtyFive mt-90 md-mt-70 d-none">
        <div className="container">
          <Banner />
          {/* /.top-banner */}
        </div>
        {/* End .container */}

        <div className="bg-wrapper mt-150 pt-100 lg-mt-80 lg-pt-70">
          <div className="container">
            <IntroAbout />
          </div>
        </div>
        {/* /.bg-wrapper */}
      </div>
      {/* /.fancy-feature-thirtyFive */}
      {/* 
			=============================================
				Feature Section Thirty Six
			============================================== 
			*/}
      <div className="fancy-feature-thirtySix mt-190 lg-mt-140">
        <div className="container">
          <div className="wrapper position-relative">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="title-style-one text-center text-lg-start mb-40 md-mb-20"
                  data-aos="fade-right"
                >
                  <h2 className="main-title fw-500 tx-dark m0">
                    Discover all our Services.
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <Service />
            </div>
            {/* /.row */}

            <div className="text-center md-mt-50">
              <Link
                href="/services/SubServices/"
                className="btn-twentyTwo fw-500 tran3s"
                data-aos="fade-left"
              >
                View all Services
              </Link>
            </div>
          </div>
        </div>
        {/* /.container */}
      </div>
      {/* /.fancy-feature-thirtySix */}
      {/* 
			=============================================
				Feature Section Thirty Seven
			============================================== 
			*/}
      <div className="fancy-feature-thirtySeven mt-225 lg-mt-120">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 ms-auto order-lg-last"
              data-aos="fade-left"
            >
              <div className="ps-lg-5 ms-xxl-3">
                <div className="title-style-one mb-40">
                  <div className="sc-title text-uppercase">Why Choose Us</div>
                  <h2 className="main-title fw-500 tx-dark m0">
                    What makes us the best.
                  </h2>
                </div>
                <WhyChoose />
                {/* /.accordion-style-five */}
              </div>
            </div>
            {/* End .col-6 */}

            <div className="col-xxl-5 col-lg-6 order-lg-first">
              <Block />
            </div>
          </div>
        </div>
        {/* /.container */}
      </div>
      {/* /.fancy-feature-thirtySeven */}
      {/*=====================================================
				Feedback Section Eleven
			=====================================================
			*/}
      {/*
        =====================================================
        Feedback Section Three
        =====================================================
        */}
      <div
        className="feedback-section-three position-relative mt-225 lg-mt-120 pb-100"
        data-data-aos="fade-up"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6 ms-auto">
              <div className="title-style-four text-center text-lg-start pb-100 lg-pb-30">
                <div className="sc-title-two" style={{ color: '#6A45FF' }}>
                  Testimonials
                </div>
                <h2 className="main-title fw-500 tx-dark m0">
                  You’r gonna love us <span>forever.</span>
                </h2>
              </div>
              {/* /.title-style-four */}
            </div>
          </div>
          <div className="slider-wrapper">
            <div className="feedback_slider_three">
              <Testimonial />
            </div>
          </div>
          {/* /.slider-wrapper */}
        </div>
        {/* End .contaier */}

        <div className="shape-holder">
          <img
            src="/images/shape/shape_48.svg"
            alt="shape"
            className="lazy-img"
          />
          <img
            src="/images/media/img_22.jpg"
            alt="media"
            className="lazy-img shapes rounded-circle avatar-one"
            style={{ width: '50px', height: '50px' }}
          />
          <img
            src="/images/media/img_23.jpg"
            alt="media"
            className="lazy-img shapes rounded-circle avatar-two"
            style={{ width: '80px', height: '80px' }}
          />
          <img
            src="/images/media/img_24.jpg"
            alt="media"
            className="lazy-img shapes rounded-circle avatar-three"
            style={{ width: '60px', height: '60px' }}
          />
          <img
            src="/images/media/img_25.jpg"
            alt="media"
            className="lazy-img shapes rounded-circle avatar-four"
            style={{ width: '80px', height: '80px' }}
          />
        </div>
      </div>
      {/* /.feedback-section-eleven */}
      {/* =============================================
				Feature Section Thirty Eight
			============================================== 
			*/}
      {/* 
        =============================================
        Partner Section Two
        ============================================== 
        */}
      <div className="partner-section-two position-relative mt-225 mb-250 md-mt-120 md-mb-120">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6" data-data-aos="fade-right">
              <div className="title-style-four">
                <div className="sc-title-two" style={{ color: '#6A45FF' }}>
                  Our Partners
                </div>
                <h2 className="main-title fw-500 tx-dark m0">
                  Our Trusted Partners.
                </h2>
              </div>
              {/* /.title-style-four */}
              <p className="fs-20 pt-30 pe-xxl-5">
                Lorem ipsum dolor on adipisci elit sed do eiusmod tempor dolo
                mag dsu aliqua eni ad minim lut emit.
              </p>
            </div>
          </div>
        </div>
        {/* /.container */}

        <div className="logo-wrapper d-flex flex-wrap justify-content-center align-items-center">
          <LogoGroup />
        </div>
        <img
          src="/images/shape/shape_49.svg"
          alt="logo"
          className="lazy-img shapes shape-one"
        />
        <img
          src="/images/shape/shape_50.svg"
          alt="logo"
          className="lazy-img shapes shape-two"
        />
        <img
          src="/images/shape/shape_51.svg"
          alt="logo"
          className="lazy-img shapes shape-three"
        />
      </div>
      {/* /.fancy-feature-thirtyEight */}
      {/*=====================================================
				Fancy Short Banner Thirteen
			=====================================================
			*/}
      <div
        className="fancy-short-banner-thirteen pt-170 pb-170 mt-130 lg-mt-100 lg-pt-80 lg-pb-80 "
        data-aos="fade-up"
      >
        <div className="container">
          <div className="bg-wrapper zn2 bg-white position-relative">
            <div className="row">
              <div className="col-xl-11 m-auto">
                <div className="row align-items-center">
                  <div className="col-lg-6 ms-auto order-lg-last">
                    <div className="text-wrapper">
                      <img
                        src="/images/icon/icon_114.svg"
                        alt="icon"
                        className="lazy-img mb-30"
                      />
                      <div className="title-style-one">
                        <h2 className="main-title fw-500 tx-dark m0">
                          Let’s talk with expereince advisors.
                        </h2>
                      </div>
                      <p className="fs-20 tx-dark pt-20 m0">
                        Contact us today to schedule a consultation and discover
                        how Our Investment Advisory can help you achieve your
                        financial goals. Together, let &apos;s navigate the
                        markets and build a prosperous future.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 order-lg-first">
                    <div className="form-style-two md-mb-40">
                      <ContactForm />
                    </div>
                    {/* /.form-style-two */}
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="shapes shape-text fw-500 fs-20 tx-dark text-center">
              Fill the <br />
              form
            </div>
            <img
              src="/images/shape/shape_90.svg"
              alt="shape"
              className="lazy-img shapes shape-one"
            />
            <img
              src="/images/shape/shape_91.svg"
              alt="shape"
              className="lazy-img shapes shape-two"
            />
          </div>
          {/* /.bg-wrapper */}
        </div>
      </div>
      {/* /.fancy-short-banner-thirteen */}
      {/* =============================================
		   Blog Section Three
		   ============================================== */}
      <div className="blog-section-three mt-140 mb-170 lg-mt-100 lg-mb-100">
        <div className="container">
          <div className="position-relative">
            <div className="row align-items-end">
              <div className="col-sm-8">
                <div
                  className="title-style-one text-center text-sm-start pb-40 lg-pb-20"
                  data-aos="fade-right"
                >
                  <h2 className="main-title fw-500 tx-dark m0">Our Blog</h2>
                </div>
                {/* /.title-style-one */}
              </div>
            </div>
            {/* /.row */}
            <div className="row gx-xxl-5">
              <Blog />
            </div>
            {/* /.row */}
            <div className="text-center xs-mt-40">
              <Link
                href="/blog/blog-v2"
                className="btn-twentyTwo fw-500 tran3s"
                data-aos="fade-left"
              >
                Go to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /.blog-section-three */}
      {/*
			=====================================================
				Footer
			=====================================================
			*/}
      <DefaultFooter />
    </>
  );
};

export default Insurance;
