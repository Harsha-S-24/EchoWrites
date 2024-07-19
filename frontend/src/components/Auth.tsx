import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@the_cruiser24/echowrites-common";
import axios from "axios";
import {BACKEND_URL} from '../config';
export const Auth=({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    });
    async function sendRequest(){
        try{
        const response =await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin"?"signin":"signup"}`,postInputs);
        const jwt=response.data.jwt;
        localStorage.setItem("token",jwt);
        navigate("/blogs");
        }catch(e){
            alert("Error while signing up")
        }
    }
    return <div className=" h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
                <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="ml-4 mt-2 text-slate-400">
                        {type==="signin"?"Don't Have an account?":"Already Have an account?"}
                        <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                        {type==="signin"?"Sign up":"Login"}
                        </Link>
                    </div>
                </div>
                <div className="mt-6">

                   {type==="signup"? <LabelledInput label="Name" placeholder="Harsha " onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            name:e.target.value
                        }))
                    }}/>:null}
                    <LabelledInput label="Username" placeholder="Harsha@gmail.com" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            email:e.target.value
                        }))
                    }}/>
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            password:e.target.value
                        }))
                    }}/>
                    <button onClick={sendRequest}type="button" className="mt-8 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{type==="signup"?"Sign Up":"Sign in"}</button>
                </div>
                </div>
        </div>
    </div>
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function LabelledInput({label, placeholder, onChange,type }:LabelledInputType){
    return <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-4">{label}</label>
                <input onChange={onChange}type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder={placeholder} required />
        </div>
}