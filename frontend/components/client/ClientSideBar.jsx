import React from 'react';
import Link from 'next/link';
import ClientLogout from './clientLogout';
import useDownloader from 'react-use-downloader';

const ClientSidebar = ({ userID, name, email, image, pdfDownload, path }) => {
  const { download } = useDownloader();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          {/* <Link href={`/clientDashbord/${[userID]}`}>
            <img src="/images/logo/wayOnC-logo.png" alt="Logo" />
          </Link> */}
          <Link href={`/clientDashbord/${[userID]}`}>
            <img
              src={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${image}`}
              alt="Logo"
              className="profile-img"
            />
          </Link>
        </div>
        <div className="sidebar-content-parent">
          <div className="sidebar-content-child-header">
            <ul>
              <Link href={`/clientDashbord/${[userID]}`} className="active">
                <li>DashBord</li>
              </Link>
              <Link href={`/clientDashbord/${[userID]}/invest`}>
                <li>Invest</li>
              </Link>
              <Link href={`/clientDashbord/${[userID]}/profile`}>
                <li>Profile</li>
              </Link>
              {pdfDownload && (
                <Link
                  href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${path}`}
                >
                  <li>Agreement</li>
                </Link>
              )}
            </ul>
          </div>
          <div className="sidebar-content-child-footer">
            <Link
              className="profileLink"
              href={`/clientDashbord/${[userID]}/profile`}
            >
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
