import { defineStore } from 'pinia'

// 帖子（主题）类型
export interface ForumPost {
  id: string // 唯一ID
  title: string // 标题
  author: string // 作者昵称
  content: string // 正文内容
  createdAt: string // 创建时间
  lastActiveAt: string // 最后活跃时间（发帖或最后回复）
  views: number // 浏览数
  comments: ForumComment[] // 回复列表
}

// 回复类型
export interface ForumComment {
  id: string // 唯一ID
  author: string // 作者昵称
  content: string // 回复内容
  createdAt: string // 回复时间
}

// 论坛 Pinia Store
export const useForumStore = defineStore('forum', {
  state: () => ({
    posts: [] as ForumPost[]
  }),
  getters: {
    postsArr(state): ForumPost[] {
      return state.posts
    }
  },
  actions: {
    // 新建主题
    addPost(title: string, author: string, content: string) {
      (this.postsArr as unknown as ForumPost[]).unshift({
        id: Date.now() + Math.random() + '',
        title,
        author,
        content,
        createdAt: new Date().toLocaleString(),
        lastActiveAt: new Date().toLocaleString(),
        views: 0,
        comments: []
      })
    },
    // 新增回复
    addComment(postId: string, author: string, content: string) {
      const post = (this.postsArr as unknown as ForumPost[]).find((p: ForumPost) => p.id === postId)
      if (post) {
        post.comments.push({
          id: Date.now() + Math.random() + '',
          author,
          content,
          createdAt: new Date().toLocaleString()
        })
        post.lastActiveAt = new Date().toLocaleString()
      }
    },
    // 增加浏览数
    addView(postId: string) {
      const post = (this.postsArr as unknown as ForumPost[]).find((p: ForumPost) => p.id === postId)
      if (post) post.views++
    }
  }
}) 