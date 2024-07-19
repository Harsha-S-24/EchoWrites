import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading,blogs}=useBlogs();
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
    const getCurrentFormattedDate=()=>{
        const options={year:'numeric',month:'long',day:'numeric'};
        return new Date().toLocaleDateString(undefined,options);
    }
    const currentDate=getCurrentFormattedDate();
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="">
            {blogs.map(blog=><BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={currentDate} />)}
            
            {/* <BlogCard authorName={"Harsha"} title={"How an ugly single page website makes $5000 a month without affliate marketing"} content={'How an ugly single page website makes $5000 a month without affliate marketing'} publishedDate={'12th Feb 2024'} />
            <BlogCard authorName={"Harsha"} title={"How an ugly single page website makes $5000 a month without affliate marketing"} content={'How an ugly single page website makes $5000 a month without affliate marketing'} publishedDate={'12th Feb 2024'} /> */}
            </div>
        </div>
    </div>
}