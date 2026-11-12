import { useEffect, useState } from "react";
import styles from "./FeaturedCard.module.css";
import mountainImage from "../../assets/m5.jpg";
import { Link } from "react-router-dom";

export function FeaturedCard() {
  type FeaturedPost = {
    title: string;
    coverImage: string | null;
    category: string;
    bodyText: string;
    timeStamp: string;
    id: number;
  };

  const [post, setPost] = useState<FeaturedPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedPost() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/featured`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch featured post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchFeaturedPost();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading featured post....</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Featured Adventure</h2>

      <div className={styles.card}>
        <img
          className={styles.image}
          src={post.coverImage || mountainImage}
          alt={post.title}
        />
        <div className={styles.bottom}>
          <h5 className={styles.category}>{post.category}</h5>
          <h3>{post.title}</h3>

          <p className={styles.bodyText}>
            {post.bodyText.length > 50
              ? `${post.bodyText.slice(0, 50)}...`
              : post.bodyText}
          </p>
          <p>
            <time className={styles.date} dateTime={post.timeStamp}>
              {new Date(post.timeStamp).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </p>
          <Link className={styles.readBtn} to={`/posts/${post.id}`}>
            Read the story ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
