
let likes = document.querySelectorAll('.element-grid__like');

for (let i = 0 ; i < likes.length; i++) {
  likes[i].addEventListener('click', function(){ likes[i].classList.toggle('element-grid__like_active'); });
}
