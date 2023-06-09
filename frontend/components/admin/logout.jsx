import React from 'react';
import axios from 'axios';

const Logout = () => {
  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/logout`)
      .then((res) => {
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
};

export default Logout;
