import React from 'react'
import DefaulHeader from '../components/header/DefaulHeader';
import DefaultFooter from '../components/footer/DefaultFooter';
import InvestorData from '../data/investor/investor.json'


const cData = InvestorData;
console.log(cData)
const InvestorCharter = () => {
//   const bData = CashData.cashData.map((info)=>info);
//   console.log(bData)
  // const Gdata = bData.cashDataInfo.map((info)=>info)
  // console.log(Gdata)
  return (
    <div>
    <DefaulHeader/>
{
  cData.map((info)=>(
<>

    <div className="fancy-feature-thirtyFour mt-150">
   
<div className="container">

<div className="row">
  <div className="col-md-10 m-auto b-data">
  <h3 className=' mb-25' >{info.title}</h3>
    {
      info.bodyData.map((data,i)=>(
        <div key={i} dangerouslySetInnerHTML={{__html: data}}></div>
      ))
    }


  </div>
</div>
</div>
</div>

</>
  ))
}
<DefaultFooter/>
    </div>
    
  )
}

export default InvestorCharter