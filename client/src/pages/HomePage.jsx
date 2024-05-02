import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const HomePage = () => {

// const getUserData = async() => {
//   try {
//     const res = await axios.post('/api/v1/user/getUserData',{},{
//       headers:{
//         Authorization : "Bearer" + localStorage.getItem('token'),
//         },});
//   } catch (error) {
//     console.log(`error on home page ${error}`);
//   }
// };

const getUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    const res = await axios.post('/api/v1/user/getUserData', {}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("User data:", res.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    // You can handle different types of errors here
  }
};

useEffect(() => {
   getUserData()
}, [])

  return (
    <Layout>
  <div> <h1> Home Page </h1> </div>
     </Layout>
  );
};

export default HomePage;