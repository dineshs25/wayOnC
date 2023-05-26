import Link from "next/link";
import ServicesData from '../../data/service/services.json'
import DefaulHeader from "../../components/header/DefaulHeader";
import DefaultFooter from "../../components/footer/DefaultFooter";
const services = ServicesData

const SubServices = () => {
  const slugify = function (text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };
  // const equityData = services.filter(data => data.cate ? data.cate : "" === "equity");
  const equityData = services.filter(
    (data) => slugify(data.cate ? data.cate : "") === "equity"
  );
  const ncxData = services.filter(
    (data) => slugify(data.cate ? data.cate : "") === "mcx"
  );
  const ncdexData = services.filter(
    (data) => slugify(data.cate ? data.cate : "") === "ncdex"
  );
  console.log(equityData);
  console.log(ncxData);
  console.log(ncdexData);
  return (
    <>
    <DefaulHeader/>
    <div className="fancy-feature-thirtyFour mt-150">
     <div className="container">
     <h3>Equity Services</h3>
     <div className="row mt-40">
      {equityData.map((service, index) => ( 
         
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={service.delay}
          key={index}
        >
         <Link
              href={`/services/equity/${service.pageUrl}`}
              className="read-more rounded-circle text-start tran3s"
            >
          <div className="card-style-sixteen tran3s text-center position-relative mt-40">
            <div className="icon">
              <img
                src='/images/icon/icon_104.svg'
                alt="icon"
                className="lazy-img m-auto"
              />
            </div>
            <p className="fs-20 m0 pt-20"></p>
            <h4 className="tx-dark">{service.title}</h4>
<p>{service.description.slice(0,210)} ...</p>         
              <i className="bi bi-arrow-right" />
          </div>
            </Link>
        </div>
      ))}
      </div>
     </div>
     </div>
     <div className="fancy-feature-thirtyFour mt-150">
     <div className="container">
     <h3>Mcx Services</h3>
     <div className="row mt-40">
      {ncxData.map((service, index) => ( 
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={service.delay}
          key={index}
        >
          <Link
              href={`/services/mcx/${service.pageUrl}`}
              className="read-more rounded-circle text-start tran3s"
            >
          <div className="card-style-sixteen tran3s text-center position-relative mt-40">
            <div className="icon">
              <img
                src='/images/icon/icon_104.svg'
                alt="icon"
                className="lazy-img m-auto"
              />
            </div>
            <p className="fs-20 m0 pt-20"></p>
            <h4 className="tx-dark">{service.title}</h4>
<p>{service.description.slice(0,210)} ...</p>          
              <i className="bi bi-arrow-right" />
          </div>
            </Link>
        </div>
      ))}
      </div>
     </div>
     </div>
     <div className="fancy-feature-thirtyFour mt-150">
     <div className="container">
     <h3>Ncdex Services</h3>
     <div className="row mt-40">
      {ncdexData.map((service, index) => ( 
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={service.delay}
          key={index}
        >
          <Link
              href={`/services/ncdex/${service.pageUrl}`}
              className="read-more rounded-circle text-start tran3s"
            >
          <div className="card-style-sixteen tran3s text-center position-relative mt-40">
            <div className="icon">
              <img
                src='/images/icon/icon_104.svg'
                alt="icon"
                className="lazy-img m-auto"
              />
            </div>
            <p className="fs-20 m0 pt-20"></p>
            <h4 className="tx-dark">{service.title}</h4>
<p>{service.description.slice(0,210)} ...</p>          
              <i className="bi bi-arrow-right" />
          </div>
            </Link>
        </div>
      ))}
      </div>
     </div>
     </div>
     <DefaultFooter/>
    </>
  );
};

export default SubServices;
