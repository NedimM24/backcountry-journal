import { useEffect, useState } from "react";

type Comment = {
  id: number;
  text: string;
  timeStamp: string;
  commenterId: number;
  parentPostId: number;
};

type CommentsProps = {
  postId: number;
};

//postId is the parent postId
function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        //RETURNS ALL COMMENTS TIED TO POST ID
        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}/comments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    }
    fetchAllPosts();
  }, [postId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* All comments tied to post go here */}
      <h4>Comments</h4>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Comment input form */}
    </div>
  );
}

export default Comments;
