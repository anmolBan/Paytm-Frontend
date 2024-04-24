import {useNavigate, useSearchParams} from 'react-router-dom'

export function PaymentStatus(){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    let buttonColor;
    if(status == 200){
        buttonColor = "bg-green-500";
    }
    else{
        buttonColor = "bg-red-500";
    }

    function onClickHandler(){
        navigate("/dashboard");
    }

    return(
        <div className="bg-slate-300 h-screen backdrop-blur-sm">
            <div className=" flex flex-col items-center justify-between h-28 w-72 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md pb-5">
                <div className=" text-center text-lg font-bold pt-5 pb-2">{message}!</div>
                <button onClick={onClickHandler} className={`rounded-md text-sm font-medium ring-offset-background transition-colors h-10 w-20 px-4 py-2 ${buttonColor} text-white`}>
                    OKAY
                </button>
            </div>
        </div>
    )
}