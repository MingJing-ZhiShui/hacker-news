import { Comment, Story } from '../interface'

const api = {

  get: async function (url: string): Promise<any> {
    return fetch(url)
      .then(resp => resp.json())
  },

  getTopTenStories: async function (): Promise<number[]> {
    const items = await api.get(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    return items.slice(0, 10)
  },

  getStoryContent: async function (id: number | string): Promise<Story> {
    return api.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  },

  getStoryComments: async function (story: Story): Promise<Comment[]> {
    if (!story.kids)
      return Promise.resolve([])
    const commentIds = story.kids.slice(0, 20)
    const pros = commentIds.map(d => api.get(`https://hacker-news.firebaseio.com/v0/item/${d}.json`))
    return Promise.all(pros)
  }
}

export default api