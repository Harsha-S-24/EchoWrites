import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    function formatDate(dateString: Date): string {
        const date = new Date(dateString);

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const getDaySuffix = (day: number): string => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}${getDaySuffix(day)} ${month} ${year}`;
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-screen-xl pt-12">
                    {/* Author Section */}
                    <div className="order-1 md:order-2 md:col-span-4">
                        <div className="text-xl font-bold mb-2">
                            Author
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <Avatar name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    {blog.phrase || "Good Read"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Content Section */}
                    <div className="order-2 md:order-1 md:col-span-8 mb-10">
                        <div className="text-2xl md:text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            {formatDate(blog.publishedAt)}
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
