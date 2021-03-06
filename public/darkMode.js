export const darkMode = () => {
  if (
    localStorage.theme === 'dark' ||
    (!'theme' in localStorage &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('html').classList.add('dark')
  } else if (localStorage.theme === 'dark') {
    document.querySelector('html').classList.add('dark')
  }

  document.getElementById('switchTheme').addEventListener('click', function () {
    let htmlClasses = document.querySelector('html').classList
    if (localStorage.theme == 'dark') {
      htmlClasses.remove('dark')
      localStorage.removeItem('theme')
      document.querySelector('#switchTheme').innerHTML =
        '<i class="icofont-sun text-2xl text-yellow-500"></i>'
      // document.querySelector('#logo').innerHTML = '<img src="assets/img/logo.png" alt="ragadama logo" class="w-64">'
    } else {
      htmlClasses.add('dark')
      localStorage.theme = 'dark'
      document.querySelector('#switchTheme').innerHTML =
        '<i class="icofont-moon text-2xl text-white"></i>'
      // document.querySelector('#logo').innerHTML = '<img src="assets/img/logo-white.png" alt=" ragadama logo" class="w-64">'
    }
  })
}

