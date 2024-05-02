// import React from 'react'
// import Layout from '../components/Layout';
// import {} from 'antd'
// import { Form } from 'react-router-dom';

// const ApplyDoctor = () => {

//      //handle form
//      const handleFinish = (values) => {
//         console.log(values)
//      };
//     return(
//         <Layout>
//             <h1 className='text-center'>Apply Doctor</h1>
//             <Form layout="vertical" onFinish={handleFinish}>
//                  <Row>
//                     <h6 className='text-light'>Personal Detalis</h6>
//                     <Col xs={24} md={24} lg={8}>
//                         <Form.Item label="First Name" name="firstName" 
//                         required rules={[{required:true}]}>
//                             <Input type="text" placeholder="your name" />

//                         </Form.Item>
//                     </Col>
//                  </Row>
//             </Form>
//         </Layout>
//     )
// }

// export default ApplyDoctor;

import React from 'react';
import Layout from '../components/Layout';
import { Form, Row, Col, Input, TimePicker, Button } from 'antd'; // Import Row, Col, and Input from Ant Design

const ApplyDoctor = () => {

  //handle form
  const handleFinish = function(values) {
    // console.log("From submitted: ", values);
    console.log("hi")
  };
  // const handleFinish = (values) => {
  //   console.log('Success:', values);
  // };

  return (  
    <Layout>
      <h1 className='text-center '>Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className=''>Personal Detalis : </h4>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>

            <Form.Item label="First Name" name="firstName"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone No" name="Phone No"
              required rules={[{ required: true }]}>
              <Input type="Number" placeholder="your number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your address" />
            </Form.Item>
          </Col>
        </Row>
        <h4 className=''>Professional Details:</h4>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specialization" name="Specialization"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="Experience"
              required rules={[{ required: true }]}>
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Fees Per Cunsaltatin" name="Fees Per Cunsaltatin"
              required rules={[{ required: true }]}>
              <Input type="Number" placeholder="your number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
            //rules={[{required:true}]}
            >
              <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
        </Row>
        <div className='d-flex justify-content-end'>
          <Button className='btn btn-primary' htmlType='submit'>Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
