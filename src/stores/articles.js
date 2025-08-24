import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [
      {
        id: 1,
        img: "http://unsplash.it/350/200?random",
        title: 'Article 1',
        author: 'James Smith',
        abstract: 'begun us simplest expect human treated arrange',
        date: '7/11/2101',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
      },
      {
        id: 2,
        img: "http://unsplash.it/400/200?random",
        title: 'Article 2',
        author: 'Dean Smith',
        abstract: 'trail major cave north facing goose folks told realize warm kitchen',
        date: '12/2/2112',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
      },
      {
        id: 3,
        img: "http://unsplash.it/500/200?random",
        title: 'Article 3',
        author: 'Jane Doe',
        abstract: 'strip talk too cattle planned choose broken first policeman',
        date: '9/3/2081',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore vitae non recusandae quisquam? Fugit quod a, nulla at, dolor accusantium sint beatae mollitia aliquid sed recusandae porro, nam rem voluptatibus. Modi laudantium et pariatur dignissimos, sunt doloribus atque ipsam asperiores, non ad alias magnam autem officia fugit possimus quae iste? Amet quisquam eligendi esse exercitationem reiciendis aperiam eius ut consequatur. Accusantium cum aut porro voluptatibus totam vel pariatur accusamus maiores quo eligendi inventore expedita magni blanditiis provident necessitatibus quaerat eveniet sed dicta ab, ut eaque, voluptatem temporibus nesciunt at! Quo. Beatae eveniet odio ipsum illum inventore voluptatum nisi dolore, temporibus doloribus minima optio explicabo quia repudiandae molestias praesentium saepe quibusdam? Porro aliquid nobis quam repudiandae et quas minus, repellat est. Eligendi voluptates, pariatur ipsum quos voluptatibus repellat libero! Aspernatur dignissimos, a tempore quae corrupti repellat molestiae consectetur non iusto delectus neque numquam, vitae molestias explicabo rerum? Quo laudantium adipisci quaerat.',
      },
    ],
  }),
  getters: {
    allArticles: (state) => {
      return state.articles
    },
    articleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id)
    },
  },
})
