import React, { useState } from 'react';
// import Image from 'next/image';
import Button from 'react-bootstrap/Button';
const { ToWords } = require('to-words');
import Image from 'next/image';

const Agreement = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  const date = data.plan.submittedDate.substring(7, 10);
  const monthNames = new Date(data.plan.submittedDate);
  const month = monthNames.toLocaleString('default', { month: 'long' });
  const year = monthNames.getFullYear();
  const principal = data.plan.principal;

  const toWords = new ToWords();
  const money = parseInt(principal);
  let words = toWords.convert(money);

  return (
    <div className="agreement-div">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="agreement-header">
        <h3>
          <u>Investment Agreement</u>
        </h3>
        <p>
          <span className="bold-p">THIS AGREEMENT </span>is made on{' '}
          <span className="bold-p">
            {date}
            <sup>th</sup> day of {month} {year}
          </span>{' '}
          b/w
        </p>
        <p className="bold-p">M/s. WayOnC Investments Private Limited,</p>
        <p>
          Registered office @ #169, 2nd Floor, 3rd Main, 7th Cross, I Block,
          Ramakrishna Nagar,
          <br /> Mysore-570022
        </p>
        <p>&</p>
        <p className="bold-p">{data.clintInfo.clientName}</p>
        <p className="client-add-p">{data.bankInfo.address} </p>
        <br />
        <br />
      </div>
      <p>
        {' '}
        And hereinafter <strong>{data.clintInfo.clientName}</strong> is referred
        as &lsquo;The Investor&rsquo; of the One Part; and M/s. WayOnC
        Investments Private Limited carrying its business in investment advisory
        in the name of <strong>M/s. WayOnC Investments Private Limited</strong>,
        hereinafter referred to as the Investment Advisory Company of the Other
        Part; (Which expression shall also include their directors for the time
        being of the said company, the survivors or survivor of them and the
        heirs, executors, administrators of the last surviving director, their
        or his assigns)
      </p>
      <p>
        WHEREAS -<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Investor is interested to invest for
        the purpose of making decent returns on their investments and has
        requested the Company to invest in the right segment with the initial
        investment of &nbsp;
        <strong>
          ₹{data.plan.principal}/- (in words: &ldquo;Rupees {words}&nbsp;
          Only&rdquo;)
        </strong>
        . The same investment money is transferred through internet banking.
      </p>
      <p>
        NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE
        PARTIES HERETO AS FOLLOWS:
      </p>
      <p>
        <strong>1. Covenant to pay principal:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;That in pursuance of the aforesaid
        agreement and in consideration of the sum of &nbsp;
        <strong>
          &#8377; {data.plan.principal} /- (in words: &ldquo;Rupees {words}
          &nbsp; Only&rdquo;)
        </strong>{' '}
        on or before the execution of these presents advanced by the Investor to
        the company (receipt whereof the company doth hereby acknowledge) the
        Investor doth hereby covenants with the Company that the Company will
        pay to the Investor after 13 months of the said sum of &nbsp;
        <strong>
          &#8377; {data.plan.principal} /- (in words: &ldquo;Rupees {words}
          &nbsp; Only&rdquo;)
        </strong>{' '}
        on the {date}<sup>th</sup> day of {month} {year} (hereinafter referred to as
        &ldquo;the due date&rdquo; which expression shall also mean the date on
        which the amount hereby secured becomes due and payable under and by
        virtue of any of the terms of these Presents irrespective of whether the
        said date has expired or not)
      </p>
      <p>
        <strong>2. Covenant to pay returns:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here by the Company agreed to pay the
        returns on the said amount of &nbsp;
        <strong>
          &#8377; {data.plan.principal} /- (in words: &ldquo;Rupees {words}
          &nbsp; Only&rdquo;)
        </strong>
        at the rate of 18% per cent per annum from the date of investment by
        monthly rests, the first of such payment to be made on the 10th day of
        next month on prorated calculations and the subsequent payments to be
        made regularly on the 10th day of every month in the manner aforesaid.
        <br />
        <u>
          *Note: Interest of returns is calculated from the first day of the
          month to the last day of the month and paid accordingly.
        </u>
      </p>
      <p>
        <strong>3. Covenant for redemption:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROVIDED ALWAYS AND IT IS HEREBY AGREED,
        DECLARED that if the Company shall pursuant to the covenant in that
        behalf hereinbefore contained pay to the Investors in Bangalore city the
        said sum of &nbsp;
        <strong>
          &#8377; {data.plan.principal} /- (in words: &ldquo;Rupees {words}
          &nbsp; Only&rdquo;)
        </strong>{' '}
        for the same at the rate and in the manner hereinbefore mentioned and
        also all other the moneys, costs charges, and expenses by law or under
        these presents payable by the Company to the Investor then and in such
        case the Company shall upon the request and at the costs, charges and
        expenses of the Investor re-transfer the said money.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;However, Investor will not be able to
        redeem for the first 13 months. Any redemption requests shall be raised
        only after completion of 12 months form date of investment. Upon receipt
        of request, company will take maximum of 30 working days to process and
        honor the request. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The necessary documentary evidence will
        support any other redemption requests for only emergency exits to break
        this Bond (within 13 months), which includes a penalty charge
        accordingly. <br />
        *Penalty Charges = First part + Second part
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>First part</u>: Deduction of total
        amount of money paid to the investor till date.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Second Part:</u>Deduction 15% of the
        Invested amount.
      </p>
      <p>
        <strong>4. Investments:</strong>
        <br /> The Company reserves the rights to invest the investor&rsquo;s
        money in multiple segments as per the company advisors and research
        team. Company has the rights to reject the application at any given time
        without giving any reasons.
      </p>
      <p>
        <strong>5. Service of Notice:</strong>
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND IT IS HEREBY AGREED AND
        DECLARED that any such notice as aforesaid shall be sufficient and valid
        although dated and served on any day before the due date and that any
        such notice as aforesaid as well as any other notice required to be
        served upon the Company under these presents shall be deemed to have
        been duly served on the Company by delivering a copy of such notice to
        the Company or sending the same through Registered Post addressed to its
        registered address above mentioned for both parties.
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any notice or communication required to be
        given under this Agreement shall be in writing and shall be legally
        effective only when it is delivered to the addressee at the last known
        address in the manner prescribed in the operating instructions.
      </p>
      <p>
        <strong>6. Force Majeure:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notwithstanding anything contained herein
        or in the Bye Laws, neither party hereto shall not be liable to
        indemnify or compensate the other for any breach, non- performance or
        delay in performance of any obligations under the Agreement or for any
        harm, loss, damage or injury caused to the other due to causes
        reasonably beyond its control including but not limited to tide, storm,
        cyclone, flood, lightning, earthquake, fire, blast, explosion or any
        other act of God, war, rebellion, revolution, insurrection, embargo or
        sanction, blockade, riot, civil commotion labor action or unrest
        including strike, lock-out or boycott, interruption or failure of any
        utility service, enemy action, criminal conspiracy, act of terrorism or
        vandalism, sabotage, or intrusion, or any other irresistible force or
        compulsion.
      </p>
      <p>
        <strong>7. Stamp Duty:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any stamp duty (including interest or
        penalty levied thereon) payable on the Agreement and/or on any deed,
        document or writing executed in pursuance hereof between the parties
        hereto shall be borne and paid by the Investor at the time of execution.
      </p>
      <p>
        <strong>8. Arbitration:</strong>
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The parties hereto shall, in
        respect of all disputes and differences that may arise between them,
        abide by the provisions relating to arbitration and conciliation
        specified under the Bye Laws.
      </p>
      <p>
        <strong>9. Jurisdiction:</strong>
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The parties hereto agree to submit
        to the exclusive jurisdiction of the courts in Bangalore or Mysore
      </p>
      <p>
        <strong>10. Governing Law:</strong>
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Agreement shall be governed by
        and construed in accordance with the laws in force in India.
      </p>
      <p>
        IN WITNESS WHEREOF the said deed has hereunto set and subscribed his/her
        hand on the day and year first hereinabove written.
      </p>
      <p>
        Signed and delivered by the within named Company{' '}
        <span className="bold-p">M/s. WayOnC Investments Private Limited</span>{' '}
        in the presence of
      </p>
      <div className="sign-div">
        <p className="sign-p">Signature</p>
      </div>
      <p className="bold-p">Karthik Hatti</p>
      <p>Director</p>
      <p>
        Received the day and year first hereinabove written of and from the
        within named Investors a sum of&nbsp;
        <span className="bold-p">
          &#8377; {data.plan.principal} /- (in words: “Rupees {words}&nbsp;
          Only”)
        </span>{' '}
        as within mentioned.
      </p>
      <div className="sign-div-flex page-break">
        <div className="sign-img-div">
          <img
            src={`http://res.cloudinary.com/dtjlq2uaq/image/upload/v1686306194/${data.image.signatureImage}`}
            alt="client-sign"
          />
        </div>
      </div>
      <div className="sign-div-flex">
        <div className='sign-mar'>
          <p className='p-line-height'>{data.clintInfo.clientName}</p>
          <p className='p-line-height'>{data.clintInfo.pan.toUpperCase()}</p>
          <p className='p-line-height'>&#40;Investor&#41;</p>
        </div>
      </div>
      <div className="nominee-sign-div-flex">
        <div className="nominee-sign-child">
          <p className="bold-p">Witnesses - 1:</p>
          <div className="sign-div">
            <p className="sign-p">Signature</p>
          </div>
          <p>Aadhaar: {data.nominee.nomineeAadhar}</p>
          <p>Name: {data.nominee.nomineeName}</p>
          <p className="nominee-adress">
            Address: {data.nominee.nomineeAddress}
          </p>
          <p>Contact No: {data.nominee.nomineeMobile}</p>
        </div>
        <div className="nominee-sign-child">
          <p className="bold-p">Witnesses - 2:</p>
          <div className="sign-div">
            <p className="sign-p">Signature</p>
          </div>
          <p>Aadhaar:</p>
          <p>Name:</p>
          <p>Address:</p>
          <p>Contact No:</p>
        </div>
      </div>
      <Button variant="primary" onClick={handlePrint}>
        Print
      </Button>{' '}
    </div>
  );
};

export default Agreement;
