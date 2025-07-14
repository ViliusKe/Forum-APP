import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post";
import { fetchPostById } from "@/api/post";
import PostPage from "@/components/PostPage/PostPage";

const PostPageById = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const router = useRouter();
  const id = router.query.id as string;

  const fetchPost = async (id: string) => {
    try {
      const response = await fetchPostById({ id: id });

      setPost(response.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  return (
    <PageTemplate>
      {post ? <PostPage post={post} /> : <>Loading</>}
    </PageTemplate>
  );
};

export default PostPageById;
