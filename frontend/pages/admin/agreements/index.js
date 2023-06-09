import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Sidebar from '../../../components/admin/Sidebar';
import { Table } from '@nextui-org/react';
import { IconButton } from '../../../components/admin/ui/IconButton';
import { EyeIcon } from '../../../components/admin/ui/EyeIcon';
import Search from '../../../components/common/Search';
import Load from '../../../components/common/Loading';
import { useRouter } from 'next/navigation';
import UploadModal from '../../../components/user/uploadModal';

const AgreementPage = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);


  const router = useRouter();

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            try {
              axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/clientsdata`)
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData(result.data.result);
                    }
                  } else {
                    router.push('/admin/login');
                  }
                })
                .catch((e) => {
                  console.log('axios', e);
                });
            } catch (e) {
              console.log(e);
            }
          } else {
            setAuth(false);
            setLoading(false);
            router.push('/admin/login');
          }
        })
        .catch((e) => {
          console.log('axios', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/auth`;
    fetchAPI2(API2);
  }, []);

  const handleShowMore = (e, id) => {
    let rep = id.replace(/\//g, 'slash');
    router.push(`/admin/agreements/${[rep]}`);
  };


  return (
    <>
      {auth && (
        <>
          {showData ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <Sidebar />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <Container>
                    <h2>Agreement Upload</h2>
                    <div className="searchDiv">
                      <Search setSearch={setSearch} />
                    </div>
                    <Table
                      aria-label="Example table with static content"
                      css={{
                        height: 'auto',
                        minWidth: '100%',
                      }}
                    >
                      <Table.Header>
                        <Table.Column>SL.NO</Table.Column>
                        <Table.Column>NAME</Table.Column>
                        <Table.Column>SHOW MORE</Table.Column>
                        <Table.Column>UPLOAD AGREEMENT</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {userData
                          .filter((val) => {
                            const email = String(val.bankInfo.email);
                            if (search === '') {
                              return val;
                            } else if (
                              email
                                .toLocaleLowerCase()
                                .includes(search.toLocaleLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((value, index) => {
                            return (
                              <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                  <p className="tableClientName">
                                    {value.clintInfo.clientName}
                                  </p>
                                  <p className="tableClientEmail">
                                    {value.bankInfo.email}
                                  </p>
                                </Table.Cell>
                                <Table.Cell>
                                  <IconButton
                                    onClick={(e) => {
                                      handleShowMore(e, value.userAuth);
                                    }}
                                  >
                                    <EyeIcon size={20} fill="#979797" />
                                  </IconButton>
                                </Table.Cell>
                                <Table.Cell>
                                  <button
                                    className="pay"
                                    onClick={() => setModalShow(true)}
                                  >
                                    UPLOAD
                                  </button>
                                  <UploadModal
                                    show={modalShow} 
                                    id={value._id}
                                    onHide={() => setModalShow(false)}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                      </Table.Body>
                      <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={2}
                      />
                    </Table>
                  </Container>
                </div>
              </div>
            </div>
          ) : (
            <Load />
          )}
        </>
      )}
    </>
  );
};

export default AgreementPage;
