import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "../../components/DeleteButton/DeleteButton";

export function EditPost() {
  const { id } = useParams();
  const [newPost, setNewPost] = useState({
    coverImage: "",
    title: "",
    bodyText: "",
    category: "",
    isPublished: false,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();

  //POPULATE FORM FIELDS TO INCLUDE THE POSTS CONTENT
  useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        console.log(data.category);

        setNewPost({
          coverImage: data.coverImage ?? "",
          title: data.title,
          bodyText: data.bodyText,
          category: data.category.toLowerCase(),
          isPublished: data.isPublished,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationErrors([]);
    setSubmitError(null);
    //OBJECT THAT HOLDS THE USERS INPUTTED DATA
    const userData = {
      ...newPost,
      coverImage: newPost.coverImage.trim() || null,
      category:
        newPost.category.charAt(0).toUpperCase() + newPost.category.slice(1),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          setValidationErrors(
            data.errors.map((error: { msg: string }) => error.msg),
          );
        } else {
          setSubmitError(data.message || "Failed to update post");
        }
        return;
      }

      //IF ALL GOES WELL, SEND THE USER TO HOME PAGE
      navigate("/posts");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occured",
      );
    }
  }

  return (
    <div>
      <p>edit posty</p>

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
          <label htmlFor="">Image</label>
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
        </div>

        <div>
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

        <div>
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

        <div>
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

        <div>
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

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
