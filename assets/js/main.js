document.addEventListener('DOMContentLoaded', () => {
  const toggler = document.querySelector('button.nav-toggle');
  const navigation = document.querySelector('.site-nav');
  if(null !== toggler) {
    toggler.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(null !== navigation) {
        navigation.classList.contains('expanded') ? navigation.classList.remove('expanded') : navigation.classList.add('expanded');
      }
    });
  }
  // document.addEventListener('click', (event) => {
  //   if(null !== navigation && navigation.classList.contains('expanded')) {
  //     navigation.classList.remove('expanded');
  //   }
  // });
});