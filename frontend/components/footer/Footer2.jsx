const columns = [
  {
    title: "Links",
    links: [
      { label: "Home", url: "/" },
      { label: "Pricing", url: "/" },
      { label: "About us", url: "/" },
      { label: "Service", url: "/" },
      { label: "Blog", url: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Intraday Trading Data", url: "/IntradayTrading" },
      { label: "Share Market", url: "/ShareMarket" },
      { label: "Commodity", url: "/Commodity" },
      { label: "Share Trading", url: "/ShareTrading" },
      { label: "Stock Market", url: "/StockMarket" },
      { label: "Mcx Optons", url: "/McxOptions" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Commodity Trading", url: "/Commodity" },
      { label: "Refund Policy", url: "/RefundPolicy" },
      { label: "Disclaimer", url: "/Disclaimer" },
      { label: "Privacy Policy", url: "/PrivacyPolicy" },
      { label: "Terms And Conditions", url: "/TermsAndConditions" },
    ],
  },
];

const Footer2 = () => {
  return (
    <>
      {columns.map((column, index) => (
        <div className="col-md-3" key={index}>
          <h5 className="footer-title tx-dark fw-normal">{column.title}</h5>
          <ul className="footer-nav-link style-none">
            {column.links.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Footer2;
