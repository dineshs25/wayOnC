import Seo from "../../components/common/Seo";
import Header from "../../components/home-page/home-10/Header";
import Footer from "../../components/home-page/home-10/Footer";
import Sidebar from "../../components/admin/Sidebar";
import DashBoard from "../../components/admin/DashBoard";

const Dashboard = () => {
  return (
    <>
      <Seo pageTitle="Agency Modern" />
      {/* <!-- 
        =============================================
        Theme Default Menu
        ============================================== 	
        --> */}
      <Header />
      {/* <!-- /.theme-main-menu --> */}
      {/* 
        =============================================
        Theme Hero Banner
        ============================================== 
        */}
    
      {/* /.hero-banner-one */}

      {/* 
        =============================================
        Feature Section One
        ============================================== 
        */}
        
      {/* /.fancy-feature-one */}

      {/* 
        =============================================
        Feature Section Two
        ============================================== 
        */}
      <div className="fancy-feature-two position-relative pt-80 mt-40 lg-pt-100 sm-pt-60 one">
        <div className="container">
         <div className="row">
          <div className="col-md-4">
            <Sidebar/>
          </div>
          <div className="col-md-8">
            <DashBoard/>
          </div>
         </div>
        </div>
        {/* /.container */}
      </div>
      {/* /.fancy-feature-two */}

      {/*
			=====================================================
				Feedback Section One
			=====================================================
			*/}
     
      {/*
			=====================================================
				Footer
			=====================================================
			*/}
      <div className="footer-style-one theme-basic-footer position-relative">
        <div className="shapes shape-one" />
        <div className="container">
          <div className="inner-wrapper">
            <Footer />
            <div className="bottom-footer">
              <p className="copyright text-center m0">
                © {new Date().getFullYear()}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://themeforest.net/user/ib-themes"
                >
                  ib-themes
                </a>
              </p>
            </div>
          </div>
          {/* /.inner-wrapper */}
        </div>
      </div>
      {/* /.footer-style-one */}
    </>
  );
};

export default Dashboard;
