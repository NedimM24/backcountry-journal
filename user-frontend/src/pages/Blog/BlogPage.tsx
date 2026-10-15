import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "../Home/Home.module.css";
import logo from "../../assets/backcountry-logo-green.svg";
import { useEffect, useState } from "react";

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
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post");
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

      <p>You are now viewing Post Id: {id}</p>
      <main>
        {post.coverImage && <img src={post.coverImage} alt={post.title} />}
        <h3>{post.title}</h3>
        <h5>{post.category}</h5>
        <p>{post.bodyText}</p>
      </main>

      {/* COMMENTS WILL GO HERE */}
    </div>
  );
}

export default BlogPage;
