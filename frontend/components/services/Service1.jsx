import Link from 'next/link';
import ServicesData from '../../data/service/services.json';
const services = ServicesData;
import Image from 'next/image';

const Service1 = () => {
  const slugify = function (text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };
  // const equityData = services.filter(data => data.cate ? data.cate : "" === "equity");
  const equityData = services.filter(
    (data) => slugify(data.cate ? data.cate : '') === 'equity'
  );
  const ncxData = services.filter(
    (data) => slugify(data.cate ? data.cate : '') === 'mcx'
  );
  const ncdexData = services.filter(
    (data) => slugify(data.cate ? data.cate : '') === 'ncdex'
  );
  console.log(equityData);
  console.log(ncxData);
  console.log(ncdexData);
  return (
    <>
      {services.map((service, index) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={service.delay}
          key={index}
        >
          <div className="card-style-sixteen tran3s text-center position-relative mt-40">
            <div className="icon">
              <img
                src={service.iconSrc}
                alt="icon"
                className="lazy-img m-auto"
              />
            </div>
            <p className="fs-20 m0 pt-20">I want</p>
            <h4 className="tx-dark">{service.title}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              deserunt facere voluptatibus voluptatum, veritatis dolores animi
              maiores tempora reprehenderit necessitatibus, sit repellendus amet
              incidunt maxime doloremque distinctio enim!
            </p>
            <Link
              href="/pages-menu/service-details"
              className="read-more rounded-circle text-start tran3s"
            >
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Service1;
