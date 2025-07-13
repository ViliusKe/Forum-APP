export type Author = {
  id: string;
  userName: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  answerIds: string[];
  createdAt: Date;
  author: Author;
  answers?: Answer[];
};

export type Answer = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  likes: string[];
  dislikes: string[];
  author: Author;
};

export type PostWithAnswers = Post & {
  answers: Answer[];
};
