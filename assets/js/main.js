document.addEventListener('DOMContentLoaded', () => {
  // mobile menu toggler
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
  // add anchors to headings
  const headingSelector = 'article.post h1, article.post h2, article.post h3, article.post h4, article.post h5, article.post h6';
  document.querySelectorAll(headingSelector).forEach((heading) => {
    if(heading.id.trim() !== '') {
      heading.classList.add('heading-anchor');
      heading.insertAdjacentHTML('afterBegin', `<a href="#${heading.id}" class="heading-anchor-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>`);
    }
  });
});
