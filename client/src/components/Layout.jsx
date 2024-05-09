// import React from 'react'
// import "../styles/LayoutStyles.css";
// import {SidebarMenu, adminMenu, userMenu} from '../data/data.js';
// import {Link, useLocation,useNavigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {message} from 'antd'
// const Layout = ({children}) => {
//   const {user} = useSelector(state => state.user)
//     const location = useLocation();
//      const navigate = useNavigate();
// //logout function
// const handleLogout = () => {
//   localStorage.clear()
//   message.success('Logout Successfully');
//   navigate("/login");
// };

// // redering menu List
// const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
// return (
// <>
//    <div className="main">
//       <div className="layout">
//         <div className="sidebar">
//           <div className="logo">
//             <h6>DOC APP</h6>
//             <hr />
//           </div>
//           <div className="menu">
//             {SidebarMenu.map((menu, index) => {
//                 const isActive = location.pathname === menu.path;
//                 return(
//                      <>
//                       <div key={index} className={`menu-item ${isActive && "active"}`} style={{paddingLeft: 15}}>
//                         <i className={menu.icon}></i>
//                         <Link to={menu.path} style={{textDecoration:"none", color:'black'}} > {menu.name}</Link>
//                        </div>
//                      </>
//                 );
//              })}
//              <div className={`menu-item `} onClick={handleLogout}>
//               <i className='fa-solid fa-right-from-bracket'></i>
//               <Link to="/login">Logout</Link>
//                        </div>
//           </div>
//         </div>
//       <div className="content">
//          <div className="header">
//           <div className="header-content">

//           <i class="fa-solid fa-bell"></i>
//           <Link to="/profile">{user?.name}</Link>
          
//           </div>
//          </div>
//      <div className="body">{children}</div>
//       </div>
//       </div>
//    </div>
// </>
// );
// };

// export default Layout;



import React from 'react';
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from '../data/data.js'; // Corrected import statement
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        message.success('Logout Successfully');
        navigate("/login");
    };

    // Rendering menu List
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>DOC APP</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {SidebarMenu.map((menu, index) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div key={index} className={`menu-item ${isActive && "active"}`} style={{ paddingLeft: 15 }}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path} style={{ textDecoration: "none", color: 'black' }}>{menu.name}</Link>
                                    </div>
                                );
                            })}
                            <div className={`menu-item `} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">
                                <Badge count={user && user.notification.length}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
