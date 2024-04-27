import { useEffect, useState } from "react";
import axios from "axios";

export function AppBar(){
    const [name, setName] = useState("");

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
    return(
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {name}
                </div>
                <div className="rounded-full h-12, w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {name.charAt(0)}
                    </div>
                </div>
            </div>
        </div>
    )
}