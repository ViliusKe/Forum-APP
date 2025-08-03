import PageTemplate from "@/components/PageTemplate/PageTemplate";
import PostsWrapper from "@/components/PostsWrapper/PostsWrapper";
import { useEffect, useState } from "react";
import { Post as PostType } from "../types/post";
import { fetchAllPosts } from "@/api/post";

export default function Home() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [filter, setFilter] = useState<"all" | "answered">("all");

  const GetAllPosts = async () => {
    try {
      const response = await fetchAllPosts({ filter });

      setPosts(response.data.posts);
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
        {posts ? (
          <PostsWrapper
            posts={posts}
            filter={filter}
            toggleFilter={toggleFilter}
          />
        ) : (
          <>Loading</>
        )}
      </PageTemplate>
    </>
  );
}
