import React from 'react';

const TC = () => {
  return (
    <div className="tc-div">
      <u>
        <p>
          <b>Terms & Conditions</b>
        </p>
      </u>
      <ol>
        <li>
          Returns on Investment will be paid on 10th of every month/next day if
          it’s a Bank holiday or any Friday
        </li>
        <li>
          Returns on Investment will be paid on the above-mentioned date with
          18% per annum monthly rests, and additional of 18% per annum to be
          paid as a variable performance bonus on the invested amount.
        </li>
        <li>10% TDS will be deducted in every month payouts.</li>
        <li>
          Interest will be calculated on a prorated data for the first month.
        </li>
        <li>Investor to be agreed for 12, 24, 36 months locking period.</li>
        <li>
          Invested amount can be withdrawn only after completing 12, 24, 36
          months.
        </li>
        <li>Investment withdrawal process will take minimum 30 days.</li>
        <li>
          WayOnC Investments holds the rights to reject the Investment proposal
          / CRF.
        </li>
        <li>
          WayOnC Investments keeps the rights to take below decisions on.
          <ol>
            <li className="sub-li">Inducting new board of directors.</li>
            <li className="sub-li">Investment diversifications.</li>
          </ol>
        </li>
        <li>
          Required Documents.
          <ol>
            <li className="sub-li">
              CRF Form, aadhaar Card, PAN Card, Bank account details (for all
              transactions), Photo – 1 Passport size.
            </li>
            <li className="sub-li">
              Current Address Proof (if different from aadhaar card)
            </li>
          </ol>
        </li>
        <li>
          Agreement Bond and Application Processing Charges.
          <ol>
            <li className="sub-li">
              Processing charges will be debited accordingly from the first
              payment of the investment.
            </li>
            <li className="sub-li">
              Below are the processing charges described -
            </li>
            <table className='tc-table'>
              <thead>
                <tr>
                  <th>Processing Fees</th>
                  <th>For INR 100000</th>
                  <th>For INR 100001 - 500000</th>
                  <th>For INR 500001 - 1000000</th>
                  <th>For INR 1000001 - 2000000</th>
                  <th>Above INR 2000001</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agreement Bond Fees</td>
                  <td>₹ 120.00</td>
                  <td>₹ 230.00</td>
                  <td>₹ 600.00</td>
                  <td>₹ 1,300.00</td>
                  <td>₹ 2,500.00</td>
                </tr>
                <tr>
                  <td>Application & A/C Maintenance charges</td>
                  <td>₹ 2,000.00</td>
                  <td>₹ 2,000.00</td>
                  <td>₹ 2,000.00</td>
                  <td>₹ 2,000.00</td>
                  <td>₹ 2,000.00</td>
                </tr>
                <tr>
                  <td>CGST - 9%</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                </tr>
                <tr>
                  <td>SGST - 9%</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                  <td>₹ 180.00</td>
                </tr>
                <tr>
                  <td>
                    <b>Total Charges</b>
                  </td>
                  <td>
                    <b>₹ 2,480.00</b>
                  </td>
                  <td>
                    <b>₹ 2,590.00 </b>
                  </td>
                  <td>
                    <b>₹ 2,960.00 </b>
                  </td>
                  <td>
                    <b>₹ 3,660.00</b>
                  </td>
                  <td>
                    <b>₹ 4,860.00</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </ol>
        </li>
        <li>
          Penalty Clause for Premature withdrawals.
          <ol>
            <li className="sub-li">
              Investor will be able to withdraw the investment only after agreed
              months, however if he/she wants to withdraw before the agreed
              tenure, then penalty clause would take effect.
            </li>
            <li className="sub-li">
              Premature withdrawal is permitted for the medical emergency only
              with supporting documents.
            </li>
            <li className="sub-li">
              Withdrawal process for medical emergency can take up to 30 working
              days.
            </li>
            <li v>
              15% of the invested amount + Total Paid Interest will be debited
              as penalty and balance shall be transferred accordingly.
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
};

export default TC;
