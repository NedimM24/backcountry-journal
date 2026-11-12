import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import Comments from "../../components/Comments/Comments";
// import styles from "../Home/Home.module.css";
import styles from "../Blog/BlogPage.module.css";
import logo from "../../assets/backcountry-logo-green.svg";
import { useEffect, useState } from "react";
import mountainImage from "../../assets/m5.jpg";

type BlogPost = {
  id: number;
  title: string;
  bodyText: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
  isPublished: boolean;
  authorId: number;
};

function BlogPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPostById() {
      try {
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
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
        console.log("coverImage:", data.coverImage);
        console.log("type:", typeof data.coverImage);
        setPost(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchPostById();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading Blog post....</p>;
  }

  return (
    <div>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={logo}
            alt="Backcountry Journal Logo"
            className={styles.logo}
          />
        </Link>
        <Navbar />
      </div>

      <div className={styles.container}>
        <main>
          <div className={styles.top}>
            <h5 className={styles.category}>{post.category}</h5>
            <h3 className={styles.title}>{post.title}</h3>
            <p>
              <time className={styles.date} dateTime={post.timeStamp}>
                {new Date(post.timeStamp).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </p>
          </div>

          <img className={styles.image} src={mountainImage} alt={post.title} />
          <p className={styles.bodyText}>{post.bodyText}</p>
        </main>

        <div>
          <p className={styles.quote}>
            "When you visit a friend, you take care to leave your friend's home
            just as you found it. When you visit the backcountry, the same
            courtesies apply."
          </p>
        </div>

        {/* COMMENTS WILL GO HERE */}
        <div className={styles.commentContainer}>
          <Comments postId={post.id} />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
