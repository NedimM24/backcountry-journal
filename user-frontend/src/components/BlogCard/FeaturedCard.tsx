import { useEffect, useState } from "react";

export function FeaturedCard() {
  type FeaturedPost = {
    title: string;
    coverImage: string | null;
    category: string;
    timestamp: string;
  };

  const [post, setPost] = useState<FeaturedPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedPost() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/posts/featured",
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
    <div>
      <h2>Feature Blog</h2>
      {post.coverImage}
      {post.title}
      {post.category}
      {post.timestamp}
    </div>
  );
}
