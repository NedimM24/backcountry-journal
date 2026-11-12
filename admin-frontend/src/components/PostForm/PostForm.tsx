import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSpinner } from "../LoadingSpinner/ButtonSpinner";
import styles from "./PostForm.module.css";

export function PostForm() {
  const [newPost, setNewPost] = useState({
    coverImage: "",
    title: "",
    bodyText: "",
    category: "",
    isPublished: false,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationErrors([]);
    setSubmitError(null);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //OBJECT THAT HOLDS THE USERS INPUTTED DATA
    const userData = {
      ...newPost,
      coverImage: newPost.coverImage.trim() || null,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          setValidationErrors(
            data.errors.map((error: { msg: string }) => error.msg),
          );
        } else {
          setSubmitError(data.message || "Failed to create post");
        }
        return;
      }

      //IF ALL GOES WELL, SEND THE USER TO HOME PAGE
      navigate("/");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occured",
      );
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Create New Post</h2>
        <p>
          Write a new Backcountry Journal article. You choose to either publish
          your article, or keep it as a draft.
        </p>
      </div>
      {submitError && <p role="alert">{submitError}</p>}

      {validationErrors.length > 0 && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {validationErrors.map((message, index) => (
              <li key={`${message}-${index}`}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} action="">
        <div>
          <div className={styles.imageTitle}>
            <label htmlFor="">Image URL</label>
            <input
              type="text"
              name="coverImage"
              id="coverImage"
              value={newPost.coverImage}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  coverImage: e.target.value,
                }))
              }
            />

            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={newPost.title}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.category}>
          <p>Category</p>
          <label>
            <input
              type="radio"
              name="category"
              value="hiking"
              required
              checked={newPost.category === "hiking"}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            Hiking
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="camping"
              required
              checked={newPost.category === "camping"}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            Camping
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="backpacking"
              required
              checked={newPost.category === "backpacking"}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            Backpacking
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="gear"
              required
              checked={newPost.category === "gear"}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            Gear
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="other"
              required
              checked={newPost.category === "other"}
              onChange={(e) =>
                setNewPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            Other
          </label>
        </div>

        <div className={styles.body}>
          <label htmlFor="">Body</label>
          <textarea
            name="bodyText"
            id="bodyText"
            value={newPost.bodyText}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                bodyText: e.target.value,
              }))
            }
            required
          ></textarea>
        </div>

        <div className={styles.published}>
          <p>Publishing status</p>
          <label>
            <input
              type="radio"
              name="isPublished"
              value="true"
              required
              checked={newPost.isPublished === true}
              onChange={() =>
                setNewPost((prev) => ({
                  ...prev,
                  isPublished: true,
                }))
              }
            />
            Publish
          </label>

          <label>
            <input
              type="radio"
              name="isPublished"
              value="false"
              required
              checked={newPost.isPublished === false}
              onChange={() =>
                setNewPost((prev) => ({
                  ...prev,
                  isPublished: false,
                }))
              }
            />
            Keep as draft
          </label>
        </div>

        <button className="btn" disabled={isLoading}>
          {isLoading ? <ButtonSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
