import React from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Plans = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

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
                      //   console.log(result.data.result[0])
                    }
                  } else {
                    // setAuth(false);
                    router.push('/auth/login');
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
            router.push('/auth/login');
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
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/auth`;
    fetchAPI2(API2);
  }, []);

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

  const handleShowMore = async (e, id) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/showmore`, {
          id: id,
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            if (res.data.result === null) {
              alert('No data found');
            } else {
              const slug = res.data.result;
              let rep = slug.replace(/\//g, 'slash');
              router.push(`/admin/${[rep]}`);
            }
          }
        })
        .catch((e) => {
          console.log('clientsData axios then catch error', e);
        });
    } catch (e) {
      console.log('clientsData axios catch handleshowmore error', e);
    }
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <h1>Admin ClientsData</h1>
              {userData.map((value) => {
                return (
                  <>
                    <h4>PlanInfo</h4>
                    {/* <p>{}</p> */}
                  </>
                );
              })}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default Plans;
