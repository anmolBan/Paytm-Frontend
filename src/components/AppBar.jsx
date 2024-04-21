import { useEffect, useState } from "react";
import axios from "axios";

export function AppBar(){
    const [name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get("http://localhost:3000/api/v1/user/info", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                let local = String(response.data.user.firstName);
                local = local.charAt(0).toUpperCase() + local.slice(1);
                setName(local);
            });
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