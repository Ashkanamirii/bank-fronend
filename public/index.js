import { darkMode } from './darkMode.js'
import { getUser, registerNewUser, createNewAccount } from './getUser.js'

$(document).ready(function () {
  darkMode()
})

$('#dateOfBirth')
  .mouseover(function () {
    $(this).get(0).type = 'date'
  })
  .mouseleave(function () {
    $(this).get(0).type = 'text'
  })

$('#registerForm').submit(function (e) {
  e.preventDefault()
  regUser.firstName = $('#firstName').val()
  regUser.lastName = $('#lastName').val()
  regUser.address = $('#address').val()
  regUser.phone = $('#phone').val()
  regUser.email = $('#email').val()
  regUser.password = $('#password').val()
  regUser.repeatPassword = $('#repeatPassword').val()
  regUser.birthDate = $('#dateOfBirth').val()
  regUser.accountType = $('input[name="accountType"]:checked').val()
  regUser.condition = $('input[name="condition"]:checked').val()
  let money = $('#depositMoney option:selected').text()
  let m = parseFloat(money.substring(1))
  regUser.money = m + '000'
  registerNewUserToDB(regUser)
})

const regUser = {
  firstName: 'test',
  lastName: 'test tt',
  email: 'test@example.com',
  password: '123456',
  address: 'test@example.com',
  phone: 1234561111,
  birthDate: '1111110',
  hasCreditLevel: false,
  repeatPassword: '123456',
  accountType: 'credit',
  condition: 'on',
  money: 2000,
}

const registerNewUserToDB = async (regUser) => {
  const newUser = await registerNewUser(regUser)
  const accountInfo = {
    clientId: newUser.id,
    accountType: regUser.accountType,
    balance: regUser.money,
  }
  createNewAccountToDB(accountInfo)
}

const createNewAccountToDB = async (accountInfo) => {
  const newAcc = await createNewAccount(accountInfo)
  console.log(newAcc)
}

$('#loginForm').submit(function (event) {
  event.preventDefault()
  let email = $('#email').val()
  let password = $('#password').val()
  let loginBtn = $('#loginBtn')
  let signUpBtn = $('#signUpBtn')

  if (validateForm()) {
    const currentUser = getUser(email, password)
    currentUser.then(function (response) {
      showToast('success', 'Signed in successfully')
      loginBtn[0].innerText = response.firstName
      loginBtn.removeClass('bg-yellow-500')
      loginBtn.addClass('bg-blue-500')
      signUpBtn.hide('slow')
    })
  }
})

const validateForm = () => {
  if ($('#email').val().trim() !== '' && $('#password').val().trim() !== '') {
    return true
  } else {
    $('#emailError').text = 'Please enter a valid email'
    return false
  }
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

const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  Toast.fire({
    icon: icon,
    title: title,
  })
}
