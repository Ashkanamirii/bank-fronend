import { api } from './api.js'
export const getUser = async (email, password) => {
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

  // Want to use async/await? Add the `async` keyword to your outer function/method.
  //   async function getUser() {
  //     try {
  //       const response = await axios.get('/user?ID=12345')
  //       console.log(response)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
}

//  api.get('/user/12345')
//    .then(function (response) {
//      console.log(response.data);
//      console.log(response.status);
//      console.log(response.statusText);
//      console.log(response.headers);
//      console.log(response.config);
//  });

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
