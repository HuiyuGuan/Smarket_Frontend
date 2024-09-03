import React from "react"
import { useNavigate } from "react-router-dom"
import FeedbackCard from "./FeedbackCard"

export default function UserFeedback(props){
    const user = props.user
    const navigate = useNavigate()
    return(
        <>
            {user.length !==0 && <div className="feedback">
                <h1>Your Feedback</h1>
                <FeedbackCard />
            </div>}
            {user.length ===0 && navigate("/")}
        </>
    )
}