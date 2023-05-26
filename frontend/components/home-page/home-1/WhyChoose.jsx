const accordionItems = [
  {
    id: 1,
    icon: "/images/icon/icon_108.svg",
    title: " Expertise and Experience:",
    content:
      "Our team of seasoned professionals brings a wealth of experience and expertise to the table. With years of industry knowledge and a deep understanding of financial markets, we are well-equipped to guide you through the complexities of investing.",
  },
  {
    id: 2,
    icon: "/images/icon/icon_109.svg",
    title: "Personalized Approach",
    content:
      "   We recognize that every investor is unique, and we tailor our services to your specific needs and goals. Our personalized approach ensures that you receive individual attention and solutions that align with your financial objectives.",
  },
  {
    id: 3,
    icon: "/images/icon/icon_110.svg",
    title: "Transparency and Integrity",
    content:
      "At XYZ Investment Advisory, we prioritize transparency and uphold the highest ethical standards. We believe in building long-term relationships based on trust, and we always act in the best interests of our clients.",
  },
  {
    id: 4,
    icon: "/images/icon/icon_110.svg",
    title: "Client Education:",
    content:
      "We are committed to empowering our clients with knowledge. Through educational resources, regular updates, and personalized consultations, we strive to enhance your financial literacy and enable you to make informed decisions about your investments.",
  },
    {
      id: 5,
    icon: "/images/icon/icon_110.svg",
    title: "Comprehensive Support",
    content:
      "We provide ongoing support and guidance to our clients. Our team is available to address your queries, provide regular performance updates, and adjust your investment strategies as needed. We are your trusted partner on your financial journey.",
  },
];

const WhyChoose = () => {
  return (
    <div className="accordion accordion-style-five md-mb-70" id="accordionOne">
      {accordionItems.map((item) => (
        <div className="accordion-item" key={item.id}>
          <div className="accordion-header" id={`heading${item.id}`}>
            <button
              className={`accordion-button ${item.id === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
              aria-expanded={item.id === 2 ? "true" : "false"}
              aria-controls={`collapse${item.id}`}
            >
              <img src={item.icon} alt="" className="me-3" /> {item.title}
            </button>
          </div>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse${
              item.id === 2 ? " show" : ""
            }`}
            aria-labelledby={`heading${item.id}`}
            data-bs-parent="#accordionOne"
          >
            <div className="accordion-body">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChoose;
