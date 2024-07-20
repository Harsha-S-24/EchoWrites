import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=> {
    function formatDate(dateString: Date): string {
        const date = new Date(dateString);

        // Array of month names
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Day suffixes
        const getDaySuffix = (day: number): string => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        // Extract day, month, and year
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Format date
        return `${day}${getDaySuffix(day)} ${month} ${year}`;
    }
return <div>
    <AppBar/>
    <div className="flex justify-center min-h-screen">
        <div className="grid grid-cols-12 w-full px-10 max-w-screen-xl pt-12">
            <div className=" col-span-8 mb-10">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    {formatDate(blog.publishedAt)}
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                Author
                <div className="flex w-full mt-4">
                    <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anonymous"}/>
                    </div>
                <div>
                    
                <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500" >
                        {blog.phrase || "Good Read"}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
}