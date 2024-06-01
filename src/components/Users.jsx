import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        try{
            const token = localStorage.getItem("token");
            axios.get("https://pa-backend.anmolban.com/api/v1/user/bulk?filter=" + filter, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUsers(response.data.users);
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
    }, [filter]);

    return(
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
            </div>
            <div>
                {users.map((user, index) => <User key={index} user={user} />)}
            </div>
        </>
    )
}

function User({user}){
    let fn = user.firstName;
    let ln = user.lastName;
    fn = fn.charAt(0).toUpperCase() + fn.slice(1);
    ln = ln.charAt(0).toUpperCase() + ln.slice(1);
    user.firstName = fn;
    user.lastName = ln;
    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onClick={() => {
                    navigate("/send?userId=" + user._id + "&name=" + user.firstName);
                }} label={"Send Money"}></Button>
            </div>
        </div>
    )
}