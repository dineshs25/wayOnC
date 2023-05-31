import React from 'react'
import { McxOptionData } from '../../../data/service/serviceData';
import DefaulHeader from '../../../components/header/DefaulHeader';
import DefaultFooter from '../../../components/footer/DefaultFooter';
const cData = McxOptionData;
console.log(cData)
const McxOption = () => {
  const bData = McxOptionData.cashData.map((info)=>info);
  console.log(bData)
  // const Gdata = bData.cashDataInfo.map((info)=>info)
  // console.log(Gdata)
  return (
    <div>
    <DefaulHeader/>
    <div className="cash-body-data">
{
  bData.map((info)=>(
<>

    <div className="fancy-feature-thirtyFour mt-150">
   
<div className="container">

<div className="row">
  <div className="col-md-10 m-auto b-data">
  <h3 className=' mb-25' >{info.cashDataInfo.title}</h3>
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
</div>
<DefaultFooter/>
    </div>
    
  )
}

export default McxOption