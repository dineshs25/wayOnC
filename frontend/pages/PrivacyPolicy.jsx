import React from 'react'

import { privacyPolicy } from '../data/tips/data';
import DefaulHeader from '../components/header/DefaulHeader';
import DefaultFooter from '../components/footer/DefaultFooter';
const cData = privacyPolicy;
console.log(cData)
const PrivacyPolicy = () => {
  
  // const Gdata = bData.cashDataInfo.map((info)=>info)
  // console.log(Gdata)
  return (
    <div>
    <DefaulHeader/>

<>

    <div className="fancy-feature-thirtyFour mt-150">
   
<div className="container">

<div className="row">
  <div className="col-md-10 m-auto b-data">
  <h3 className=' mb-25' >{cData.title}</h3>
    {
      cData.body.map((data,i)=>(
        <div key={i} dangerouslySetInnerHTML={{__html: data}}></div>
      ))
    }


  </div>
</div>
</div>
</div>

</>
 
<DefaultFooter/>
    </div>
    
  )
}

export default PrivacyPolicy