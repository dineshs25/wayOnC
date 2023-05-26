import React from 'react'
import { DeliveryData } from '../../../data/service/serviceData';
import DefaulHeader from '../../../components/header/DefaulHeader';
import DefaultFooter from '../../../components/footer/DefaultFooter';
const cData = DeliveryData;
console.log(cData)
const Delivery = () => {
  const bData = DeliveryData.cashData.map((info)=>info);
  console.log(bData)
  // const Gdata = bData.cashDataInfo.map((info)=>info)
  // console.log(Gdata)
  return (
    <div>
{
  bData.map((info)=>(
<>
<DefaulHeader/>
    <div className="fancy-feature-thirtyFour mt-150">
   
<div className="container">

<div className="row">
  <div className="col-md-10 m-auto">
  <h3 className=' mt-5 mb-5 pt-5 pb-5' >{info.cashDataInfo.title}</h3>
    {
      info.cashDataInfo.body.map((data,i)=>(
        <div key={i} dangerouslySetInnerHTML={{__html: data}}></div>
      ))
    }

<div className="table-data">
  <table className="table table-bordered table-striped table-hover">
  <thead class="thead-dark">
    <tr align="center" >
      <th scope="col">PERIOD</th>
      <th scope="col">AMOUNT</th>
      <th scope="col">GST (18%)</th>
      <th scope="col">TOTAL</th>

    </tr>
  </thead>
  <tbody>
   
     {
      info.tableData.tableDataList.map((tableData )=>(
    <tr key={tableData.id} align="center">
       <>
       {/* <td>{tableData.id}</td> */}
       <td>{tableData.data1}</td>
        <td>{tableData.data2}</td>
        <td>{tableData.data3}</td>
        <td>{tableData.data4}</td>
       </>
    </tr>
      ))
     }

   
  
  </tbody>
  </table>
</div>
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

export default Delivery