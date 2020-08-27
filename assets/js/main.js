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

// enable to activate click & expand content images
// window.addEventListener('load', () => {
//   const postContentImages = document.querySelectorAll('.post .post-content img');
//   postContentImages.forEach((imageElement) => {
//     imageElement.addEventListener('click', (event) => {
//       if('P' === event.target.parentElement.tagName) {
//         event.target.parentElement.classList.toggle('expanded-post-image');
//       }
//     });
//   });
// });