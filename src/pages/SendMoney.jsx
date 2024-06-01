import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const [ amount, setAmount ] = useState(0);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("userId");
    const name = searchParams.get("name");

    const navigate = useNavigate();

    async function onClickHandler(){
        try{
            if(amount <= 0){
                return;
            }
            const token = localStorage.getItem("token");
            const response = await axios.post("https://pa-backend.anmolban.com/api/v1/account/transfer", {
                to: id,
                amount: parseInt(amount)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/paymentstatus?status=" + response.status + "&message=" + response.data.message);
        } catch(error){
            if(error.response){
                console.error("Request failed with status code:", error.response.status);
                console.error("Error message:", error.response.data.message);
                navigate("/paymentstatus?status=" + error.response.status + "&message=" + error.response.data.message);
            }
            else if(error.request){
                console.error("No response recieved from the server");
            }
            else{
                console.error("Error occurred:", error.message);
            }
        }
    }
    
    return (
    <div id="send-money" className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0]}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">Amount (in Rs)</label>

                            <input onChange={(e) => {
                                setAmount(e.target.value)
                            }} type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount" placeholder="Enter amount"/>
                        </div>
                        <button onClick={onClickHandler} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"> Initiate Transfer </button>
                    </div>
                </div>
            </div>
      </div>
    </div>
    )
}