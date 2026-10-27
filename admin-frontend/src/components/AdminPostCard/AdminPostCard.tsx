import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
};

export function AdminPostCard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        //RETURNS ALL PUBLISHED POSTS
        const response = await fetch(
          "http://localhost:3000/api/posts/published",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: BlogPost[] = await response.json();
        setBlogs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchAllPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.coverImage && <img src={blog.coverImage} alt={blog.title} />}

          <h3>{blog.title}</h3>
          <h5>{blog.category}</h5>

          <p>
            <time dateTime={blog.timeStamp}>
              {new Date(blog.timeStamp).toLocaleDateString()}
            </time>
          </p>

          <Link to={`/posts/${blog.id}`}>Read Blog</Link>
          <Link to={`/posts/${blog.id}/edit`}>Edit Blog</Link>
        </div>
      ))}
    </section>
  );
}
