import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {
    const [user, setUser] = useState([])

    // getUsers
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })

            if (res.data.success) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    // antd table col
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => (
                <span>{record.isDoctor ? 'Yes' : 'No'}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },

    ]
    return (
        <Layout>
            <h1>UserList</h1>
            <Table columns={columns} dataSource={user} />
        </Layout>
    )
}

export default Users