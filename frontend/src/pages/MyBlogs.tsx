import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useMyBlogs } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
}

export const MyBlogs = () => {
  const { loading, myBlogs } = useMyBlogs();

  // Decode the token to get the user ID
  const token = localStorage.getItem("token");
  let userId = "";
  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    userId = decoded.id;
  }

  const deleteBlog = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      // Optionally, you can refetch the blogs after deletion
      window.location.reload();
    } catch (error) {
      alert("Failed to delete the blog please try again");
    }
  };

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

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
      <div className="flex justify-center">
        <div className="">
          {myBlogs.length > 0 ? (
            myBlogs.map(blog => (
              <div key={blog.id} className="relative">
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={formatDate(blog.publishedAt)}
                />
                {blog.authorId === Number(userId) && (
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="absolute top-4 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Sorry, no blogs as of now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
