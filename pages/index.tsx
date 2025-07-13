import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import PostsWrapper from "@/components/PostsWrapper/PostsWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Post as PostType } from "../types/post";
import Cookies from "js-cookie";
import { fetchAllPosts } from "@/api/post";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filter, setFilter] = useState<"all" | "answered">("all");

  const GetAllPosts = async () => {
    try {
      const filterQuery = filter === "answered" ? "answered" : "";

      const response = await fetchAllPosts({
        filter: filterQuery,
      });

      setPosts(response.data.posts);
      console.log(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFilter = () => {
    const newFilter = filter === "all" ? "answered" : "all";
    setFilter(newFilter);
  };

  useEffect(() => {
    GetAllPosts();
  }, [filter]);

  return (
    <>
      <PageTemplate>
        <PostsWrapper
          posts={posts}
          filter={filter}
          toggleFilter={toggleFilter}
        />
      </PageTemplate>
    </>
  );
}
