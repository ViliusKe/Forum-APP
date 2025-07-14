import styles from "./styles.module.css";
import { Post as PostType } from "../../types/post";
import AnswerCard from "../AnswerCard/AnswerCard";

type AnswersListProps = {
  post: PostType;
  userId: string;
  jwt: string;
  onDelete: (id: string) => void;
};

const AnswersList = ({ post, onDelete, jwt, userId }: AnswersListProps) => {
  return (
    <div className={styles.answers}>
      {post.answers && post.answers.length > 0 ? (
        post.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            userId={userId}
            jwt={jwt}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No answers yet.</p>
      )}
    </div>
  );
};

export default AnswersList;
