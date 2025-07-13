import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { insertPost } from "@/api/post";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const InsertPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const jwt = Cookies.get("Forum-app-user-token");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const insertBody = {
        title,
        content,
      };

      const response = await insertPost({
        jwt: jwt!,
        insertBody: insertBody,
      });

      router.push("/");
    } catch (err) {
      // @ts-expect-error TODO
      if (err.status === 401) {
        router.push("/login");
      }
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputCard}>
        <h3>Post a question and our community will gladly help you!</h3>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.contentInput}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="Write your post here..."
        />
        <Button title="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default InsertPost;
