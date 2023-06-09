import React from 'react';
import Logout from './logout';
import Link from 'next/link';

const Sidebar = ({name}) => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <Link href="/user">
            <img src="/images/logo/wayOnC-logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="sidebar-content-parent">
          <div className="sidebar-content-child-header">
            <ul>
              <Link href="/user" className="active">
                <li>DashBord</li>
              </Link>
              <Link href="/user/receivedforms">
                <li>Received forms</li>
              </Link>
              <Link href="/user/agreements">
                <li>Aggrements</li>
              </Link>
            </ul>
          </div>
          <div className="sidebar-content-child-footer">
            <p class="tableClientName">{name}</p>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
