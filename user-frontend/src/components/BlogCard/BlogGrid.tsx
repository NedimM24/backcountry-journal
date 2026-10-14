import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
};

export function BlogGrid() {
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
        <BlogCard key={blog.id} post={blog} />
      ))}
    </section>
  );
}
