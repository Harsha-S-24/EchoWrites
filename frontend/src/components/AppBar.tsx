import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
    const navigate=useNavigate();
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("Logging out...");
        // Example: clear the token from local storage
        localStorage.removeItem("token");
        // Redirect to login or home page after logout
        navigate('/signin')
    };

    return (
        <div className="border-b items-center flex justify-between px-10 py-4">
            <Link to={'/blogs'}>
                <div>
                    Echowrites
                </div>
            </Link>
            <div className="flex items-center justify-center">
            <div>
                <Link to={'/myblogs'}>

                    <button
                        type="button"
                        className="mr-4 text-white bg-orange-400 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                        My Blogs
                    </button>
                </Link>
                </div>
                <div>
                <Link to={'/publish'}>

                    <button
                        type="button"
                        className="mr-8 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                        Publish
                    </button>
                </Link>
                </div>
                <div className="flex items-center justify-center">
                    <div>

                    <Avatar size="big" name="Harsha" />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="ml-4 text-red-600 hover:text-red-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
