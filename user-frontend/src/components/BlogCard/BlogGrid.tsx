import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";
import styles from "./BlogGrid.module.css";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
  bodyText: string;
};

type BlogPostProps = {
  category?: string;
};

export function BlogGrid({ category }: BlogPostProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  //EITHER A CERTAIN CATEGORY(CLICKED BY THE USER ON THE FRONTEND NAVBAR) OR ALL
  const url = category
    ? `${import.meta.env.VITE_API_URL}/api/posts/category/${encodeURIComponent(category)}`
    : `${import.meta.env.VITE_API_URL}/api/posts/published`;

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
    <div>
      <h2 className={styles.title}>All Blogs</h2>
      <section className={styles.grid}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </section>
    </div>
  );
}
