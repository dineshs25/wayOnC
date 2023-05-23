import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClientDetails = () => {
  const [client, setClient] = useState([]);

  const fetchData = async () => {
    try {
      await axios
        .get('http://localhost:8000/client/client_get')
        .then((result) => {
          setClient(result.data);
        })
        .catch((e) => {
          console.log('axios catch error client_details', e);
        });
    } catch (e) {
      console.log('Fetch function error client_details', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {client.map((value)=>{
        return(
            <React.Fragment key={value._id}>
                <h4>Adhaar Number : {value.adhaar}</h4>
                <p>Number of Months : {value.months}</p>
                <p>Startdate : {value.startdate}</p>
                <p>Lastdate : {value.expdate}</p>
                <hr/>
            </React.Fragment>
        )
    })}
    </>
  );
};

export default ClientDetails;
