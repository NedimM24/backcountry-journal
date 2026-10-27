import { useState, useEffect } from "react";
import { StatCard } from "../../components/StatCard/StatCard";
import styles from "./Dashboard.module.css";
import { PostsTable } from "../../components/PostsTable/PostsTable";

function Dashboard() {
  const [postCount, setPostCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      setError(null);
      //GET COUNT FOR POSTS
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/posts/count`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPostCount(data.totalPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }

      //GET COUNT FOR DRAFTS
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/posts/non-published/count`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setDraftCount(data.totalDrafts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }

      //GET COUNT FOR COMMENTS
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/comments/count`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setCommentCount(data.totalComments);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchCounts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className={styles.bodyHeader}>
        <h3>Admin dashboard</h3>
        <a className="btn" href="/posts/new-post">
          + New Post
        </a>
      </div>
      <div className={styles.statCardGrid}>
        {" "}
        {/* statCardGrid container */}
        <StatCard title={"Total posts"} count={postCount} />
        <StatCard title={"Drafts"} count={draftCount} />
        <StatCard title={"Comments"} count={commentCount} />
      </div>
      <div className={styles.postTable}>
        <PostsTable
          onDeleted={(_postId, isPublished) => {
            setPostCount((count) => count - 1);

            if (!isPublished) {
              setDraftCount((count) => count - 1);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
