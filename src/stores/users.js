import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 1,
        pseudo: "JSM",
        firstname: 'John',
        lastname: "Smith",
        email: '1Hs1H@example.com',
        password: 'password'
      },
      {
        id: 2,
        pseudo: "JDO",
        firstname: 'Jane',
        lastname: "Doe",
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
      const user = state.users.find((user) => user.pseudo === login && user.password === password)
      return user
    },
    getAuthor: (state) => (id) => {
      console.log("Trying to get user with id", id)
      return state.users.find((user) => user.id === id)
    }
  },
})