import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import {  useMyBlogs } from "../hooks"

export const MyBlogs = ()=>{
    const {loading,myBlogs}=useMyBlogs();
    if(loading){
        return <div>
            <AppBar/>
        <div className="flex justify-center">
            <div>

            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>
        </div>
        </div> 
    }
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
        <div className="flex justify-center">
            <div className="">
            {myBlogs.length > 0 ? (
                        myBlogs.map(blog => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={formatDate(blog.publishedAt)}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-10">
                            Sorry, no blogs as of now.
                        </div>
                    )}
            
            {/* <BlogCard authorName={"Harsha"} title={"How an ugly single page website makes $5000 a month without affliate marketing"} content={'How an ugly single page website makes $5000 a month without affliate marketing'} publishedDate={'12th Feb 2024'} />
            <BlogCard authorName={"Harsha"} title={"How an ugly single page website makes $5000 a month without affliate marketing"} content={'How an ugly single page website makes $5000 a month without affliate marketing'} publishedDate={'12th Feb 2024'} /> */}
            </div>
        </div>
    </div>
}