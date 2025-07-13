import styles from "./styles.module.css";
import { Post as PostType } from "../../types/post";
import { isLoggedIn } from "@/utils/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { createAnswer } from "@/api/answer";

type PostPageProps = {
  post: PostType;
};

const PostPage = ({ post }: PostPageProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [answerContent, setAnswerContent] = useState("");

  const router = useRouter();
  const jwt = Cookies.get("Forum-app-user-token");

  const onSubmit = async () => {
    try {
      const insertBody = { content: answerContent };

      if (!answerContent.trim()) return;

      const response = await createAnswer({
        jwt: jwt!,
        id: post.id,
        insertBody,
      });
      setAnswerContent("");
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(isLoggedIn());
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>Posted by: {post.author.userName}</p>
      </div>
      <div className={styles.answers}>
        {post.answers && post.answers.length > 0 ? (
          post.answers.map((answer) => (
            <div key={answer.id} className={styles.answer}>
              <p className={styles.answerAuthor}>{answer.author.userName}</p>
              <p>{answer.content}</p>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
      {loggedIn ? (
        <div className={styles.answerField}>
          {" "}
          <textarea
            placeholder="Write your answer here..."
            rows={4}
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
          ></textarea>
          <Button
            title={"Submit"}
            className={styles.submitBtn}
            onClick={onSubmit}
          />
        </div>
      ) : (
        <p>Please log in to submit an answer.</p>
      )}
    </div>
  );
};

export default PostPage;
