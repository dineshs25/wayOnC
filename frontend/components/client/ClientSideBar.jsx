import React from 'react';
import Link from 'next/link';
import ClientLogout from './clientLogout';

const ClientSidebar = ({ userID, name, email}) => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <Link href={`/clientDashbord/${[userID]}`}>
            <img src="/images/logo/wayOnC-logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="sidebar-content-parent">
          <div className="sidebar-content-child-header">
            <ul>
              <Link href={`/clientDashbord/${[userID]}`} className="active">
                <li>DashBord</li>
              </Link>
            </ul>
          </div>
          <div className="sidebar-content-child-footer">
            <Link className='profileLink' href={`/clientDashbord/${[userID]}/profile`}>
              <p class="tableClientName">{name}</p>
              <p class="tableClientEmail">{email}</p>
            </Link>
            <ClientLogout />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSidebar;
