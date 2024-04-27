import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function AppBar(){
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const token = localStorage.getItem("token")
            axios.get("https://anmolban-paytm.onrender.com/api/v1/user/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    let local = String(response.data.user.firstName);
                    local = local.charAt(0).toUpperCase() + local.slice(1);
                    setName(local);
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

    function onClickHandler(){
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return(
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex w-1/4 justify-end">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {name}
                </div>
                <div className="rounded-full h-12, w-12 bg-slate-300 flex justify-center mt-1 mr-4">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {name.charAt(0)}
                    </div>
                </div>
                <div className="mt-2 mr-4">
                    <Button label={"Sign out"} onClick={onClickHandler}></Button>
                </div>
            </div>
        </div>
    )
}