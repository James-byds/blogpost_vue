import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 1,
        name: 'John',
        email: '1Hs1H@example.com',
        password: 'password'
      },
      {
        id: 2,
        name: 'Jane',
        email: '2Hs1H@example.com',
        password: 'password'
      }
    ],
    currentUser: ref(null),
    session: ref(false)
  }),
  getters: {
    allUsers: (state) => {
      return state.users
    },
    loginUser: (state) => (login, password) => {
      const user = state.users.find((user) => user.name === login)
      return user
    }
  }
})