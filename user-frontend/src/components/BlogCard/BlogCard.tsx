import { Link } from "react-router-dom";
import mountainImage from "../../assets/m5.jpg";
import styles from "./BlogCard.module.css";

type BlogPost = {
  id: number;
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
  bodyText: string;
};

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageSrc =
    post.coverImage && post.coverImage !== "null"
      ? post.coverImage
      : mountainImage;
  console.log("Value:", post.coverImage);
  console.log("Type:", typeof post.coverImage);
  console.log("Strict null check:", post.coverImage === null);
  console.log("Fallback:", post.coverImage ?? mountainImage);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} alt={post.title} />
      <div className={styles.bottom}>
        <h5 className={styles.category}>{post.category}</h5>
        <h3>{post.title}</h3>
        <p className={styles.bodyText}>{post.bodyText}</p>
        <p>
          <time className={styles.date} dateTime={post.timeStamp}>
            {new Date(post.timeStamp).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </p>
        <Link className={styles.readBtn} to={`/posts/${post.id}`}>
          Read the story ➔
        </Link>
      </div>
    </div>
  );
}
