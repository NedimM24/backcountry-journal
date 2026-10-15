import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
};

type BlogPostProps = {
  category?: string;
};

export function BlogGrid({ category }: BlogPostProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  //EITHER A CERTAIN CATEGORY(CLICKED BY THE USER ON THE FRONTEND NAVBAR) OR ALL
  const url = category
    ? `http://localhost:3000/api/posts/category/${encodeURIComponent(category)}`
    : "http://localhost:3000/api/posts/published";

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        //RETURNS ALL PUBLISHED POSTS
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [url]);

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
