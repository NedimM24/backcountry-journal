export function PostForm() {
  return (
    <div>
      <p>new posty</p>
      <form action="">
        <div>
          <label htmlFor="">Image</label>
          <input type="text" name="image" id="image" />
        </div>

        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" id="title" required />
        </div>

        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" id="title" required />
        </div>

        <div>
          <p>Category</p>
          <label>
            <input
              type="radio"
              name="category"
              value="hiking"
              required
              defaultChecked
            />
            Hiking
          </label>

          <label>
            <input type="radio" name="category" value="camping" required />
            Camping
          </label>

          <label>
            <input type="radio" name="category" value="backpacking" required />
            Backpacking
          </label>

          <label>
            <input type="radio" name="category" value="gear" required />
            Gear
          </label>

          <label>
            <input type="radio" name="category" value="other" required />
            Other
          </label>
        </div>

        <div>
          <label htmlFor="">Body</label>
          <textarea name="body" id="body"></textarea>
        </div>

        <div>
          <p>Category</p>
          <label>
            <input
              type="radio"
              name="isPublished"
              value="true"
              required
              defaultChecked
            />
            Publish
          </label>

          <label>
            <input type="radio" name="isPublished" value="false" required />
            Keep as draft
          </label>
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
