import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PostForm() {
  const [newPost, setNewPost] = useState({
    coverImage: "",
    title: "",
    bodyText: "",
    category: "",
    isPublished: false,
  });

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //OBJECT THAT HOLDS THE USERS INPUTTED DATA
    const userData = newPost;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("New post failed", data);
        return;
      }

      //IF ALL GOES WELL, SEND THE USER TO HOME PAGE
      navigate("/");
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  return (
    <div>
      <p>new posty</p>
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
