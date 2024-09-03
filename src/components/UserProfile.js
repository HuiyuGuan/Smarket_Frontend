import React from "react"
import { useNavigate } from "react-router-dom"

export default function UserProfile(props){
    const user = props.user
    const navigate = useNavigate()
    return(
        <>
            {user.length !==0 && <div className="UserProfile">
                <div className="card">
                    <h3 className="profile">Profile</h3>
                <h3>username: {user.name}</h3>
                <h3>email: {user.email}</h3>
                <h3>phone: {user.phone}</h3>
                <h3>country: {user.country}</h3>
                </div>
            </div>}
            {user.length ===0 && navigate("/")}
        </>
    )
}
