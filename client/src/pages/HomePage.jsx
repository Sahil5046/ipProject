import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([])

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found in localStorage");
      }
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if(res.data.success){
        setDoctors(res.data.data);
      }
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

useEffect(() => {
   getUserData()
}, [])

  return (
    <Layout>
      <div> <h1 className='text-center'> Home Page </h1> 
      <Row >
        {doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor} />
        ))}
      </Row>
      </div>
     </Layout>
  );
};

export default HomePage;