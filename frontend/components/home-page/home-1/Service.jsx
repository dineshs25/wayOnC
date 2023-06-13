import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    icon: 'images/icon/icon_104.svg',
    title: 'Equity',
    delayAnim: 0,
    description:
      'Our Equity Service is designed to empower investors like you to make informed decisions and maximize your returns in the dynamic world of equities. With our expert team of financial analysts and advisors, we provide comprehensive and personalized solutions tailored to your investment goals.',
  },
  {
    icon: 'images/icon/icon_105.svg',
    title: 'Mcx',
    delayAnim: 100,
    description:
      'Our MCX service is designed to cater to both seasoned traders and beginners looking to enter the commodities market. Whether you are interested in metals, energy, agriculture, or any other commodity, we offer a wide range of services to meet your specific needs.',
  },
  {
    icon: 'images/icon/icon_106.svg',
    title: 'Ncdex',
    delayAnim: 200,
    description:
      'Our NCDEX Service is designed to cater to the needs of both novice and experienced traders. Whether you are a farmer, agri-business professional, or a commodity market enthusiast, our team of experts is here to assist you in making informed trading decisions.',
  },
];

const Service = () => {
  return (
    <>
      {services.map((service, index) => (
        <div
          className="col-xl-4 col-sm-12"
          key={index}
          data-aos="fade-up"
          data-aos-delay={service.delayAnim}
        >
          <Link
            href="/services/SubServices/"
            className="read-more rounded-circle text-start tran3s"
          >
            <div className="card-style-sixteen tran3s text-center position-relative mt-30">
              <div className="icon">
                <img src={service.icon} alt="" className="lazy-img m-auto" />
              </div>
              <p className="fs-20 m0 pt-20"></p>
              <h4 className="tx-dark">{service.title}</h4>
              <p>{service.description.slice(0, 200)}...</p>
              <i className="bi bi-arrow-right" />
            </div>{' '}
          </Link>
          {/* /.card-style-sixteen */}
        </div>
      ))}
    </>
  );
};

export default Service;
