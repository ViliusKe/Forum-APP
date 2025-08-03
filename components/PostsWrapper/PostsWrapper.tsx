import styles from "./styles.module.css";
import { Post as PostType } from "../../types/post";
import Link from "next/link";
import Button from "../Button/Button";

type PostsWrapperProps = {
  posts: PostType[];
  filter: "all" | "answered";
  toggleFilter: () => void;
};

const PostsWrapper = ({ posts, filter, toggleFilter }: PostsWrapperProps) => {
  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <Button
          title={filter === "all" ? "Show Answered" : "Show All"}
          className={styles.rowBtn}
          onClick={toggleFilter}
        />
      </div>
      {posts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className={styles.postCard}
        >
          <div>
            {post.answerIds.length}{" "}
            {post.answerIds.length === 1 ? "answer" : "answers"}
          </div>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.content}>{limitWords(post.content, 30)}</p>
        </Link>
      ))}
    </div>
  );
};

export default PostsWrapper;
