import styles from "./styles.module.css";
import { Post as PostType } from "../../types/post";
import { isLoggedIn } from "@/utils/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { createAnswer, deleteAnswerById } from "@/api/answer";
import { getUserIdFromToken } from "@/utils/auth";
import { DeletePostById } from "@/api/post";

type PostPageProps = {
  post: PostType;
};

type AnswerHeadersAndIdProps = {
  jwt: string;
  answerId: string;
};

const PostPage = ({ post }: PostPageProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [answerContent, setAnswerContent] = useState("");

  const router = useRouter();
  const jwt = Cookies.get("Forum-app-user-token");

  const userId = jwt ? getUserIdFromToken(jwt) : null;

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

  const deletePost = async () => {
    if (!jwt) return;
    try {
      await DeletePostById({ jwt, id: post.id });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAnswer = async (answerId: string) => {
    try {
      await deleteAnswerById({ jwt: jwt!, answerId });
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>Posted by: {post.author.userName}</p>
        {userId === post.author.id && (
          <Button
            type={"DANGER"}
            title="Delete Post"
            className={styles.deleteBtn}
            onClick={deletePost}
          />
        )}
      </div>
      <div className={styles.answers}>
        {post.answers && post.answers.length > 0 ? (
          post.answers.map((answer) => (
            <div key={answer.id} className={styles.answer}>
              <p className={styles.answerAuthor}>{answer.author.userName}</p>
              <p>{answer.content}</p>
              {jwt && answer.authorId === userId && (
                <Button
                  type={"DANGER"}
                  title={"Delete"}
                  onClick={() => deleteAnswer(answer.id)}
                />
              )}
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
