import React from 'react';
import axios from 'axios';
import Link from 'next/link';


const ProfileButton = () => {

  return (
    <>
      <div className="profile-button-div">
      <Link href="/admin/adminProfile">Profile</Link>
      </div>
    </>
  );
};

export default ProfileButton;
