import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Dashboard(){
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
            }
            axios.get("https://pa-backend.anmolban.com/api/v1/account/balance", {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setBalance(response.data.balance);
            });
        } catch(error){
            if(error.response){
                console.error("Request failed with status code:", error.response.status);
                console.error("Error message:", error.response.data.message);
            }
            else if(error.request){
                console.error("No response recieved from the server");
            }
            else{
                console.error("Error occurred:", error.message);
            }
        }
    }, []);
            
    return (
        <div id="dashboard">
            <AppBar></AppBar>
            <div className="m-8">
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>
        </div>
    )
}
