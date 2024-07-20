import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [phrase, setPhrase] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full pt-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block p-2.5"
                        placeholder="Title"
                    />
                    <input
                        onChange={(e) => setPhrase(e.target.value)}
                        type="text"
                        className="w-full mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block p-2.5"
                        placeholder="Add a Description of the blog or any attractive phrase for the users"
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <button
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content: description,
                                    phrase,
                                },
                                {
                                    headers: {
                                        Authorization: localStorage.getItem("token"),
                                    },
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                        }}
                        type="submit"
                        className="rounded-lg mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                    <div className="bg-white w-full">
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
