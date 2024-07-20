import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        navigate('/signin', { replace: true });
    };

    return (
        <div className="border-b items-center flex flex-wrap justify-between px-4 py-4 md:px-10 md:py-4">
            <Link to={'/blogs'} className="flex items-center">
                <div className="text-lg font-bold">Echowrites</div>
            </Link>
            <div className="flex items-center space-x-4 md:space-x-8">
                <Link to={'/myblogs'}>
                    <button
                        type="button"
                        className="text-white bg-orange-400 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 md:px-5 md:py-2.5 text-center"
                    >
                        My Blogs
                    </button>
                </Link>
                <Link to={'/publish'}>
                    <button
                        type="button"
                        className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 md:px-5 md:py-2.5 text-center"
                    >
                        Publish
                    </button>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div>
                    <Avatar size="big" name="Harsha" />
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
