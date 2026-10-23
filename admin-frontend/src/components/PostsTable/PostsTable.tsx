import { useEffect, useState } from "react";
import styles from "./PostsTable.module.css";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
};

export function PostsTable() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post");
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
        <div className={styles.postRow}>
          {/* placeholders for now, will map l8r */}
          <p>title here</p>
          <p>Campinfg</p>
          <p>05/20/2026</p>
          <p>published</p>
          <p>edit / delete</p>
        </div>
      </div>
    </div>
  );
}
