import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post";
import { fetchPostById } from "@/api/post";

const PostPage = async () => {
  const [post, setPost] = useState<PostType | null>(null);
  const router = useRouter();
  const id = router.query.id as string;

  const fetchPost = async (id: string) => {
    try {
      const response = await fetchPostById({ id: id });

      console.log(response.data.post);
      //   setPost(response.data.post)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost(id);
  });

  return <PageTemplate>{post ? <>PostPage</> : <>Loading</>}</PageTemplate>;
};

export default PostPage;
