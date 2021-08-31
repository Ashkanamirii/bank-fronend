import { api } from './api.js'
export const loginUser = async (email, password) => {
  // Make a request for a user with a given ID
  return await api
    .get('/client/auth', {
      params: {
        email: email,
        password: password,
      },
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

export const withdrawDB = async (data) => {
  console.log(data)
  return await api
    .post('/account/withdraw', data)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

export const depositDB = async (data) => {
  console.log(data)
  return await api
    .post('/account/deposit', data)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

export const getUpdatedUserById = async (userId) => {
  try {
    const response = await api.get(`/client/getById/${userId}`)
    const user = response.data
    console.log(`GET: Here's the new user`, user)
    return user
  } catch (errors) {
    console.error(errors)
  }
}

export const registerNewUser = async (user) => {
  return await api
    .post('/client/save', user)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

export const createNewAccount = async (accountInfo) => {
  return await api
    .post('/account/create', accountInfo)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

// const BASE_URL = 'https://jsonplaceholder.typicode.com'

// const getTodoItems = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/todos?_limit=5`)

//     const todoItems = response.data

//     console.log(`GET: Here's the list of todos`, todoItems)

//     return todoItems
//   } catch (errors) {
//     console.error(errors)
//   }
// }

/**
 *   
 * api.get('/user/12345')
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
     console.log(response.headers);
     console.log(response.config);
  });



   // Want to use async/await? Add the `async` keyword to your outer function/method.
  //   async function getUser() {
  //     try {
  //       const response = await axios.get('/user?ID=12345')
  //       console.log(response)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
 * */
