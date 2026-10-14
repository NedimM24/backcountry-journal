type BlogPost = {
  title: string;
  coverImage: string | null;
  category: string;
  timeStamp: string;
};

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div>
      <img>{post.coverImage}</img>
      <h3>{post.title}</h3>
      <h5>{post.category}</h5>
      <p>
        <time>{post.timeStamp}</time>
      </p>
    </div>
  );
}
