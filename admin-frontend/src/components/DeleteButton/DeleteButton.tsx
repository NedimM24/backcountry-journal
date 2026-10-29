import { useState } from "react";
import { ButtonSpinner } from "../LoadingSpinner/ButtonSpinner";

type DeletedButtonProps = {
  postId: number;
  onDeleted: (deletedId: number) => void;
};

export function DeleteButton({ postId, onDeleted }: DeletedButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      onDeleted(postId);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occured");
      }
    }
  }

  return (
    <div>
      {error && <p role="alert">{error}</p>}
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? <ButtonSpinner /> : "Delete Post"}
      </button>
    </div>
  );
}
