import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom"

export function LandingPage(){
    const navigate = useNavigate();

    function onClickHandler(){
        navigate("/signup");
    }

    function onClickHanlder2(){
        navigate("/signin")
    }

    return(
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col bg-white h-2/4 w-2/4 justify-between items-center rounded-2xl">
                <div className="mt-10 font-bold text-7xl text-center">Anmol's Paytm App</div>
                <div className="flex h-1/2 w-full justify-evenly items-center">
                    <Button label={"Sign up"} width={"w-1/4"} height={"h-1/2"} onClick={onClickHandler}></Button>
                    <Button label={"Sign in"} width={"w-1/4"} height={"h-1/2"} onClick={onClickHanlder2}></Button>
                </div>
            </div>
        </div>
    )
}