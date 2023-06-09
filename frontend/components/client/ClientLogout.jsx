import axios from 'axios';
import React from 'react';

function ClientLogout() {

  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`)
      .then((res) => {
        console.log(res);
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('failed to logout');
        }
      })
      .catch((e) => {
        console.log('logout axios error', e);
      });
  };

  return (
    <>
      <button className="admin-logout-button" onClick={logout}>
        Logout
      </button>
    </>
  );
}

export default ClientLogout;
