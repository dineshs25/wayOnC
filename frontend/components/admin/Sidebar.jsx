import React from 'react';
import Logout from './logout';
import ProfileButton from './profileButton';
import ReceivedFormsButton from './receivedFormsButton';
import Investors from './Investors';
import TodayEarners from './TodayEarners';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <Link href="/admin/dashboard">
            <img src="/images/logo/wayOnC-logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="sidebar-content-parent">
          <div className="sidebar-content-child-header">
            <ul>
              <Link href="/admin/dashboard" className="active">
                <li>DashBord</li>
              </Link>
              <Link href="/admin/receivedforms">
                <li>Received forms</li>
              </Link>
              <Link href="/admin/clientsData">
                <li>Investors</li>
              </Link>
              <Link href="/admin/todayEarners">
                <li>TodayEarners</li>
              </Link>
              <Link href="/admin/requests">
                <li>CheckOuts</li>
              </Link>
              <Link href="/admin/backups">
                <li>Backups</li>
              </Link>
              <Link href="/admin/addUser">
                <li>Users</li>
              </Link>
              <Link href="/admin/agreements">
                <li>Inv Requests</li>
              </Link>
            </ul>
          </div>
          <div className="sidebar-content-child-footer">
            <ul>
              <Link href="/admin/adminProfile">
                <li>Profile</li>
              </Link>
            </ul>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
