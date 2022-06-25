import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const  Profile = () =>{
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log("estas son todas las props de:",user,isAuthenticated)
    if (isLoading){
        return <div>Loading.....</div> }
    return (
        isAuthenticated && (
            <div>
                <img src="user.Picture" alt={user.name}/>
                <h2>{user.name}</h2>
                <p> Email: {user.email}</p>
            </div>
        )
    )

        }

export default  Profile;