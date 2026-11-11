import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { DeleteButton } from "../../components/DeleteButton/DeleteButton";
import styles from "./Drafts.module.css";
import mountainImage from "../../assets/m5.jpg";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  bodyText: string;
  timeStamp: string;
};

export function Drafts() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function handlePostDeleted(postId: number) {
    setBlogs((prev) => prev.filter((blog) => blog.id !== postId));
  }

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        //RETURNS ALL PUBLISHED POSTS
        const response = await fetch(
          "http://localhost:3000/api/posts/non-published",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Drafts request failed", response.status, errorText);
          throw new Error(`Failed to fetch posts (${response.status})`);
        }
        const data: BlogPost[] = await response.json();
        setBlogs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllPosts();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading posts..." />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Drafts</h2>

      <div className={styles.blogGrid}>
        {blogs.map((blog) => {
          const imageSrc = blog.coverImage || mountainImage;

          return (
            <div key={blog.id} className={styles.container}>
              <img className={styles.image} src={imageSrc} alt={blog.title} />

              <div className={styles.bottom}>
                <h5 className={styles.category}>{blog.category}</h5>
                <h3 className={styles.title}>{blog.title}</h3>

                <p className={styles.bodyText}>
                  {blog.bodyText.length > 50
                    ? `${blog.bodyText.slice(0, 50)}...`
                    : blog.bodyText}
                </p>

                <p>
                  <time className={styles.date} dateTime={blog.timeStamp}>
                    {new Date(blog.timeStamp).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </p>

                <div className={styles.actions}>
                  <Link className={styles.readBtn} to={`/posts/${blog.id}`}>
                    View
                  </Link>

                  <Link
                    className={styles.editBtn}
                    to={`/posts/${blog.id}/edit`}
                  >
                    Edit
                  </Link>

                  <DeleteButton
                    postId={blog.id}
                    onDeleted={() => handlePostDeleted(blog.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
