import Button from "../Button/Button";
import styles from "./styles.module.css";
import { Post as PostType } from "../../types/post";

type PostCardProps = {
  post: PostType;
  userId: string;
  onClick: () => void;
};

const PostCard = ({ post, onClick, userId }: PostCardProps) => {
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Posted by: {post.author.userName}</p>
      {userId === post.author.id && (
        <Button
          type={"DANGER"}
          title="Delete Post"
          className={styles.deleteBtn}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default PostCard;
