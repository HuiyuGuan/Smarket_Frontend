import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "./NavBar"
import Footer from "./Footer"
    
export default function Layout (props) {
    return (
        <div>
            <NavBar user={props.user} setlogin={props.setlogin}/>
            {/* <Footer /> */}
            <Outlet />  
        </div>
    );
}
