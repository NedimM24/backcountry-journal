import { useEffect, useState } from "react";
import styles from "./PostsTable.module.css";
import { Link } from "react-router-dom";
import { DeleteButton } from "../DeleteButton/DeleteButton";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
  isPublished: boolean;
};

type PostsTableProps = {
  onDeleted: (postId: number, isPublished: boolean) => void;
};
export function PostsTable({ onDeleted }: PostsTableProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/posts/recent`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchRecentPosts();
  }, []);
  function handlePostDeleted(postId: number, isPublished: boolean) {
    setBlogs((prev) => prev.filter((blog) => blog.id !== postId));
    onDeleted(postId, isPublished);
  }

  return (
    <div>
      <b>recent posts</b>
      <div className={styles.container}>
        <div className={styles.headerCategories}>
          {/* Header title */}
          <p>Title</p>
          <p>Category</p>
          <p>Date</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.postRow}>
            <p>{blog.title}</p>
            <p>{blog.category}</p>
            <p>{blog.timeStamp}</p>
            <p>{blog.isPublished ? "Published" : "Draft"}</p>
            <Link to={`/posts/${blog.id}/edit`}>Edit</Link>
            <DeleteButton
              postId={blog.id}
              onDeleted={() => handlePostDeleted(blog.id, blog.isPublished)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
