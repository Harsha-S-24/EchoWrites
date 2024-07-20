import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@the_cruiser24/echowrites-common";
import axios from "axios";
import { BACKEND_URL } from '../config';

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (type === "signup" && !postInputs.name) {
            newErrors.name = "Name is required";
        }
        if (!postInputs.email) {
            newErrors.email = "Email is required";
        }else if (!postInputs.email.includes("@")) {
            newErrors.email = "Email must contain an '@' symbol";
        }
        if (!postInputs.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function sendRequest() {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.data.error === "Email Already Exists. Please use a different Email") {
                    setErrorMessage(e.response.data.error);
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendRequest();
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 flex-1 justify-center items-center">
                        <div className="text-3xl font-extrabold">
                            {type === "signin" ? "Welcome Back" : "Create an account"}
                        </div>
                        <div className="ml-4 mt-2 text-slate-400">
                            {type === "signin" ? "Don't Have an account?" : "Already Have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Login"}
                            </Link>
                        </div>
                    </div>
                    <div
                        className="mt-6"
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                    >
                        {type === "signup" && (
                            <LabelledInput
                                label="Name"
                                placeholder="Harsha"
                                onChange={(e) => {
                                    setPostInputs((c) => ({
                                        ...c,
                                        name: e.target.value
                                    }));
                                    setErrors((e) => ({ ...e, name: "" }));
                                }}
                                error={errors.name}
                            />
                        )}
                        <LabelledInput
                            label="Username"
                            placeholder="Harsha@gmail.com"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    email: e.target.value
                                }));
                                setErrors((e) => ({ ...e, email: "" }));
                            }}
                            error={errors.email}
                        />
                        <LabelledInput
                            label="Password"
                            type="password"
                            placeholder="123456"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    password: e.target.value
                                }));
                                setErrors((e) => ({ ...e, password: "" }));
                            }}
                            error={errors.password}
                        />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="mt-8 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            {type === "signup" ? "Sign Up" : "Sign in"}
                        </button>
                        {errorMessage && (
                            <div className="mt-8 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Error</span> {errorMessage}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

}

function LabelledInput({ label, placeholder, onChange, type, error }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-4">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    );
}

