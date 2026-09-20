import { defineStore } from "pinia";

export interface ForumComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  lastActiveAt: string;
  views: number;
  comments: ForumComment[];
}

export const useForumStore = defineStore("forum", {
  state: () => ({
    posts: [] as ForumPost[],
  }),
  actions: {
    addPost(title: string, author: string, content: string) {
      const now = new Date().toLocaleString();
      this.posts.unshift({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title,
        author,
        content,
        createdAt: now,
        lastActiveAt: now,
        views: 0,
        comments: [],
      });
    },
    addComment(postId: string, author: string, content: string) {
      const post = this.posts.find((item) => item.id === postId);
      if (!post) return;
      const now = new Date().toLocaleString();
      post.comments.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        author,
        content,
        createdAt: now,
      });
      post.lastActiveAt = now;
    },
    addView(postId: string) {
      const post = this.posts.find((item) => item.id === postId);
      if (post) post.views += 1;
    },
  },
});
