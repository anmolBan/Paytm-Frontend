import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    <InputBox placeholder={"John"} label={"First Name"} onChange={(e) => setFirstName(e.target.value)}></InputBox>
                    <InputBox placeholder={"Doe"} label={"Last Name"}
                    onChange={(e) => setLastName(e.target.value)}></InputBox>
                    <InputBox placeholder={"xyz@gmail.com"} label={"Email"} onChange={(e) => setUsername(e.target.value)}></InputBox>
                    <InputBox placeholder={"Password"} label={"Password"} onChange={(e) => setPassword(e.target.value)}></InputBox>
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={async () => {
                            await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate('/dashboard');
                        }}></Button>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}
