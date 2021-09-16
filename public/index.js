import { darkMode } from './darkMode.js'
import {
  loginUser,
  registerNewUser,
  createNewAccount,
  withdrawDB,
  depositDB,
  getUpdatedUserById,
} from './userService.js'

$(document).ready(function () {
  darkMode()
  fetchAccounts()
  updateHeaderFromLS()
})
const updateHeaderFromLS = () => {
  const u = getUserFromLS()
  let loginBtn = $('#loginBtn')
  let signUpBtn = $('#signUpBtn')
  loginBtn[0].innerText = u.firstName
  loginBtn.removeClass('bg-yellow-500')
  loginBtn.addClass('bg-blue-500')
  signUpBtn[0].innerText = 'Sign out'
  signUpBtn.removeClass('bg-blue-500')
  signUpBtn.addClass('bg-red-500')
  //Todo: Sign out btn must clear LS ---> create btn display none 
}

$('#dateOfBirth')
  .mouseover(function () {
    $(this).get(0).type = 'date'
  })
  .mouseleave(function () {
    $(this).get(0).type = 'text'
  })

$('#registerForm').submit(function (e) {
  e.preventDefault()
  e.stopPropagation()
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
    amount: regUser.money,
  }
  createNewAccountToDB(accountInfo)
}



const createNewAccountToDB = async (accountInfo) => {
  const newAcc = await createNewAccount(accountInfo)

  Swal.fire({
    icon: 'success',
    title: 'Your account has been created successfully!',
    text: `
    **Account number is : ${newAcc.accountNumber}**
    *Current balance is : ${newAcc.balance}*
     ${
       newAcc.creditCard
         ? 'Your credit card number is : ' + newAcc.creditCard
         : ''
     }
    `,
    confirmButtonText: `Login`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location.pathname = '/public/index.html'
    }
  })
}

$('#loginForm').submit(function (event) {
  event.preventDefault()
  let email = $('#email').val()
  let password = $('#password').val()
  let loginBtn = $('#loginBtn')
  let signUpBtn = $('#signUpBtn')

  if (validateForm()) {
    const currentUser = loginUser(email, password)
    currentUser.then(function (response) {
      showToast('success', 'Signed in successfully')
      loginBtn[0].innerText = response.firstName
      loginBtn.removeClass('bg-yellow-500')
      loginBtn.addClass('bg-blue-500')
      signUpBtn[0].innerText = 'Sign out'
      signUpBtn.addClass('bg-red-500')
      Swal.fire({
        icon: 'success',
        title: 'Your have been signed in successfully!',
        text: `
        **Hello : ${response.firstName}**
        *Welcome to your Bank*
        `,
        confirmButtonText: `Go to Your accounts`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.setItem('currentUser', JSON.stringify(response))
          window.location.pathname = '/public/account.html'
        }
      })
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

const ConfirmedMessage = (title, message, icon) => {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, do it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Good Job!', 'Your stuff has been done.', 'success')
    }
  })
}

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

////////////////AJAX AND SWAL////////////////////
// Swal.fire({
//   title: 'Submit your Github username',
//   input: 'text',
//   inputAttributes: {
//     autocapitalize: 'off'
//   },
//   showCancelButton: true,
//   confirmButtonText: 'Look up',
//   showLoaderOnConfirm: true,
//   preConfirm: (login) => {
//     return fetch(`//api.github.com/users/${login}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.statusText)
//         }
//         return response.json()
//       })
//       .catch(error => {
//         Swal.showValidationMessage(
//           `Request failed: ${error}`
//         )
//       })
//   },
//   allowOutsideClick: () => !Swal.isLoading()
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: `${result.value.login}'s avatar`,
//       imageUrl: result.value.avatar_url
//     })
//   }
// })

function fetchAccounts() {
  console.log('object')
  if (getUserFromLS()) {
    const currentUser = getUserFromLS()
    console.log(currentUser)
    const accounts = currentUser.accounts
    $.each(accounts, function (i, item) {
      $('#accounts').append(
        $('<option>', {
          value: item.id,
          text: `NR: ${item.accountNumber} Available $${item.balance}`,
        })
      )
    })
  }
}

$('#withdraw').click(function (e) {
  e.preventDefault()
  //EX => NR: 9983424 Available $1440
  const indexAccNR = $('#accounts option:selected').text().indexOf('Available')
  const accNr = $('#accounts option:selected').text().slice(4, indexAccNR)
  const amount = $('#amount').val()
  const accId = $('#accounts').val() // acc id

  withdraw(amount, accId, accNr)
})
$('#deposit').click(function (e) {
  e.preventDefault()
  //EX => NR: 9983424 Available $1440
  const indexAccNR = $('#accounts option:selected').text().indexOf('Available')
  const accNr = $('#accounts option:selected').text().slice(4, indexAccNR)
  const amount = $('#amount').val()
  const accId = $('#accounts').val() // acc id

  deposit(amount, accId, accNr)
})

const getUserFromLS = () => {
  if (localStorage.getItem('currentUser')) {
    return JSON.parse(localStorage.getItem('currentUser'))
  } else {
    return null
  }
}

let accountInfo = {
  clientId: 2,
  accountType: '',
  amount: 10,
  accountNumber: 9983424,
}

const withdraw = async (amount, accId, accNr) => {
  if (getUserFromLS()) {
    const currentUser = getUserFromLS()
    accountInfo.clientId = currentUser.id
    accountInfo.amount = Number(amount)
    accountInfo.accountNumber = Number(accNr)
    const res = await withdrawDB(accountInfo)
    updateCurrentUsersAccountLS(res)
  }
}

const deposit = async (amount, accId, accNr) => {
  if (getUserFromLS()) {
    const currentUser = getUserFromLS()
    accountInfo.clientId = currentUser.id
    accountInfo.amount = amount
    accountInfo.accountNumber = accNr
    const res = await depositDB(accountInfo)
    updateCurrentUsersAccountLS(res)
  }
}

const updateCurrentUsersAccountLS = async (res) => {
  const oldUser = getUserFromLS()
  const newUser = await getUpdatedUserById(oldUser.id)
  localStorage.setItem('currentUser', JSON.stringify(newUser))
  Swal.fire({
    title: 'Your transaction has been completed',
    text: `Your new balance: ${res.balance}`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Are you going to continue?',
  }).then((result) => {
    if (!result.isConfirmed) {
      localStorage.removeItem('currentUser')
      Swal.fire('GoodBye!', 'You have been logout successfully', 'success')
    } else {
      window.location.reload()
    }
  })
}
