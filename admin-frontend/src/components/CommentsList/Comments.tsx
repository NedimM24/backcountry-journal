import { useEffect, useState } from "react";

type Comment = {
  id: number;
  text: string;
  timeStamp: string;
  commenterId: number;
  parentPostId: number;
  commenter: {
    name: string;
    userName: string;
  };
};

type CommentsProps = {
  postId: number;
};

//postId is the parent postId
function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //POSTS COMMENT TO APPROPRIATE POST
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setError(null);
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      //RETURNS ALL COMMENTS TIED TO POST ID
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: comment,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to POST comment");
      }
      //CLEAR THE TEXT AREA
      setComment("");

      //FETCH UPDATED COMMENTS LIST
      const commentsResponse = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!commentsResponse.ok) {
        throw new Error("Failed to refresh comments");
      }

      const data: Comment[] = await commentsResponse.json();
      setComments(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occured");
      }
    }
  }

  useEffect(() => {
    async function fetchPostComments() {
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchPostComments();
  }, [postId]);

  return (
    <div>
      {/* All comments tied to post go here */}
      <h4>Comments</h4>
      {error && <p role="alert">{error}</p>}
      <div>
        {isLoading ? (
          <p>Loading Comments...</p>
        ) : comments.length === 0 ? (
          <p>Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id}>
              <h5>{comment.commenter.userName}</h5>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment input form */}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Comments;
