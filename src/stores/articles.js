import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'
import AddArticle from '@/components/AddArticle.vue'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [
      {
        id: 1,
        thumbnail: "http://unsplash.it/350/200?random",
        banner: "http://unsplash.it/800/200?random",
        title: 'Article 1',
        authorId: 1,
        abstract: 'begun us simplest expect human treated arrange',
        date: '7/11/2101',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
        comments: [
          {
            id: 1,
            author: 'John Doe',
            content: 'This is a comment',
            date: '12/1/2022'
          }
        ]
      },
      {
        id: 2,
        thumbnail: "http://unsplash.it/350/200?random",
        banner: "http://unsplash.it/800/200?random",
        title: 'Article 2',
        authorId: 1,
        abstract: 'trail major cave north facing goose folks told realize warm kitchen',
        date: '12/2/2112',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
        comments: [
          {
            id: 1,
            author: 'John Doe',
            content: 'This is a comment',
            date: '12/1/2022'
          }
        ]
      },
      {
        id: 3,
        thumbnail: "http://unsplash.it/350/200?random",
        banner: "http://unsplash.it/800/200?random",
        title: 'Article 3',
        authorId: 2,
        abstract: 'strip talk too cattle planned choose broken first policeman',
        date: '9/3/2081',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
        comments: [
          {
            id: 1,
            author: 'JSM',
            content: 'This is a comment',
            date: '12/1/2022'
          }
        ]
      },
      {
        id: 4,
        thumbnail: "http://unsplash.it/350/200?random",
        banner: "http://unsplash.it/800/200?random",
        title: 'Article 4',
        authorId: 2,
        abstract: 'strip talk too cattle planned choose broken first policeman',
        date: '9/3/2081',
      },
    ],
    lastId: 5 
  }),//end state
  getters: {
    allArticles: (state) => {
      return state.articles
    },
    articleById: (state) => (id) => {
      return state.articles.find((article) => article.id == id)
    },
  },//end getters
  actions: {
    addArticle(newArticle) {
      this.articles.push(newArticle)
      console.log(this.articles)
    },
    deleteArticle(id) {
      this.articles = this.articles.filter((article) => article.id !== id)
      //sends back to home
      router.push({name: 'home'})
    },
    updateArticle(editedArticle) {
      this.articles = this.articles.map((article) => {
        if (article.id === editedArticle.id) {
          return editedArticle
        }
        return article
      })
    },
    deleteComment(articleId, commentId) {
      const articleIndex = this.articles.findIndex((article) => article.id === articleId)
      this.articles[articleIndex].comments = this.articles[articleIndex].comments.filter((comment) => comment.id !== commentId)
    }
  }
})//end defineStore
