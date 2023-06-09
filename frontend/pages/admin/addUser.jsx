import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/admin/Sidebar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import { Table } from '@nextui-org/react';
import Search from '../../components/common/Search';
import Load from '../../components/common/Loading';
import { IconButton } from '../../components/admin/ui/IconButton';
import { DeleteIcon } from '../../components/admin/ui/DeleteIcon';
import AddUserModel from '../../components/admin/addUserModel';

const AddUser = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);
  const [search, setSearch] = useState('');
  const [modalShow, setModalShow] = useState(false);

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            axios
              .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/viewEmployees`)
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
              });
          } else {
            setAuth(false);
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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/deleteUser/${id}`)
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Deleted User');
          window.location.reload(true);
        } else {
          alert(result.data.Status);
        }
      });
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
                <div className="admin-content investDiv">
                  <Container>
                    <h2>Users</h2>
                    <div className="searchDiv">
                      <Search setSearch={setSearch} />
                    </div>
                    <div className="addUserBtn">
                      <button onClick={() => setModalShow(true)}>
                        Add User
                      </button>
                      <AddUserModel
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
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
                        <Table.Column>User Name</Table.Column>
                        <Table.Column>Password</Table.Column>
                        <Table.Column>Delete</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {userData
                          .filter((val) => {
                            const email = String(val.UserName);
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
                                <Table.Cell>{value.UserName}</Table.Cell>
                                <Table.Cell>{value.view}</Table.Cell>
                                <Table.Cell>
                                  <IconButton
                                    onClick={(e) => {
                                      handleDelete(e, value._id);
                                    }}
                                  >
                                    <DeleteIcon size={20} fill="#FF0080" />
                                  </IconButton>
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                      </Table.Body>
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

export default AddUser;
