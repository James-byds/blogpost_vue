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
      }
    ]
  }),
  getters: {
    allUsers: (state) => {
      return state.users
    },
    loginUser: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    }
  }
})