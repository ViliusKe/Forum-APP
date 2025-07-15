import styles from "./styles.module.css";
import { Answer } from "../../types/post";
import Button from "../Button/Button";
import { useState } from "react";
import { likeAnswerById, dislikeAnswerById } from "../../api/answer";
import ThumbUp from "../../assets/img/ThumbUp";
import ThumbDown from "../../assets/img/ThumbDown";
import { isLoggedIn } from "@/utils/auth";

type AnswerCardProps = {
  answer: Answer;
  userId: string;
  jwt: string;
  onDelete: (id: string) => void;
};

const AnswerCard = ({ answer, userId, jwt, onDelete }: AnswerCardProps) => {
  const [likes, setLikes] = useState(answer.likes.length);
  const [dislikes, setDislikes] = useState(answer.dislikes.length);
  const [hasLiked, setHasLiked] = useState(answer.likes.includes(userId));
  const [hasDisliked, setHasDisliked] = useState(
    answer.dislikes.includes(userId)
  );

  const loggedIn = isLoggedIn();

  const handleVote = async (type: "like" | "dislike") => {
    try {
      const voteFunction = type === "like" ? likeAnswerById : dislikeAnswerById;
      const response = await voteFunction({ answerId: answer.id, jwt });

      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);

      if (type === "like") {
        if (hasLiked) {
          setHasLiked(false);
        } else {
          setHasLiked(true);
          setHasDisliked(false);
        }
      } else {
        if (hasDisliked) {
          setHasDisliked(false);
        } else {
          setHasDisliked(true);
          setHasLiked(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.answerAuthor}>{answer.author.userName}</p>
      <p>{answer.content}</p>

      <div className={styles.voteButtons}>
        <button
          onClick={() => handleVote("like")}
          className={styles.iconButton}
          aria-label="Like"
          disabled={!loggedIn} // disable if not logged in
        >
          <ThumbUp filled={hasLiked} />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => handleVote("dislike")}
          className={styles.iconButton}
          aria-label="Dislike"
          disabled={!loggedIn} // disable if not logged in
        >
          <ThumbDown filled={hasDisliked} />
          <span>{dislikes}</span>
        </button>
      </div>

      {userId === answer.authorId && (
        <Button
          type={"DANGER"}
          title={"Delete"}
          onClick={() => onDelete(answer.id)}
        />
      )}
    </div>
  );
};

export default AnswerCard;
