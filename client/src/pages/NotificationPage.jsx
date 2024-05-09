import React from 'react'
import Layout from './../components/Layout'
import {Tabs, message} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const {TabPane} = Tabs

const NotificationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead =async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notifications', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading())
            if(res.data.success)
                {
                    message.success(res.data.message)
                }else{
                    message.error(res.data.message)
                }
        } catch (error) {
            console.log(error);
            message.error('something went wrong')
        }
    }

    const handleDeleteAllRead =async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notifications', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading())
            if(res.message.success)
                {
                    message.success(res.data.message)
                }else{
                    message.error(res.data.message)
                }
        } catch (error) {
            console.log(error);
            message.error('something went wrong in deleting notification')
        }
    }
    
  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification page</h4>
        <Tabs>
            {/* <Tabs.TabPane tab='unRead' key={0}>
                <div className="d-flex justify-centent-end">
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark all read</h4>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className="card" style={{cursor: 'pointer'}}>
                            <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane> */}
            {/* <Tabs.TabPane tab='Read' key={1}>
                <div className="d-flex justify-centent-end">
                    <h4 className='p-2' onClick={handleDeleteAllRead}>Delete all read</h4>
                </div>
                {
                    user?.seennotification.map(notificationMsg => (
                        <div className="card" style={{cursor: 'pointer'}}>
                            <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane> */}
            {[
                    {
                        key: 'unRead',
                        tab: 'Unread',
                        content: (
                            <>
                                <div className="d-flex justify-content-end">
                                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark all read</h4>
                                </div>
                                {user?.notification.map(notificationMsg => (
                                    <div key={notificationMsg.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(notificationMsg.onClickPath)}>
                                        <div className="card-text">
                                            {notificationMsg.message}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    },
                    {
                        key: 'read',
                        tab: 'Read',
                        content: (
                            <>
                                <div className="d-flex justify-content-end">
                                    <h4 className='p-2' onClick={handleDeleteAllRead}>Delete all read</h4>
                                </div>
                                {user?.seennotification.map(notificationMsg => (
                                    <div key={notificationMsg.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(notificationMsg.onClickPath)}>
                                        <div className="card-text">
                                            {notificationMsg.message}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    }
                ].map(item => (
                    <Tabs.TabPane key={item.key} tab={item.tab} item={item.content} />
                ))}
        </Tabs>

    </Layout>
  )
}

export default NotificationPage