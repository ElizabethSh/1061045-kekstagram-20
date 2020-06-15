'use strict';

// модуль для отрисовки полноэкранного изображения при нажатии на
// миниатюру;

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').
                      content.querySelector('.social__comment');
  var commentExamples = commentsList.querySelectorAll('.social__comment');

  /* Показываем большое фото и вставляем информацию из 1-го элемента массива с данными*/
  /* bigPicture.classList.remove('hidden');*/ /* temp */

  bigPicture.querySelector('.likes-count').textContent = window.data.photoDescriptions[0].likes;
  bigPicture.querySelector('.big-picture__img img').src = window.data.photoDescriptions[0].url;
  bigPicture.querySelector('.big-picture__img img').alt = ' ';
  bigPicture.querySelector('.social__caption').textContent = window.data.photoDescriptions[0].description;
  bigPicture.querySelector('.comments-count').textContent = window.data.photoDescriptions[0].comments.length;

  /* Удаляем комментарии по умолчанию */
  commentExamples.forEach(function (it) {
    it.remove();
  });

  /* Функция рендеринга комменария */
  var renderSocialComment = function (usersComment) {
    var socialComment = commentTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = usersComment.avatar;
    socialComment.querySelector('.social__picture').alt = usersComment.name;
    socialComment.querySelector('.social__text').textContent = usersComment.message;

    return socialComment;
  };

  /* Отрисовываем коммнтарии в зависимоти от их количества */
  var createSocialComment = function () {
    var fragment = document.createDocumentFragment();

    window.data.photoDescriptions[0].comments.forEach(function (it) {
      fragment.appendChild(renderSocialComment(it));
    });
    commentsList.appendChild(fragment);
  };

  createSocialComment();

  /* Прячем блоки счётчика комментариев и загрузки новых комментариев */
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  /* Добавляем body класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле */
  document.querySelector('body').classList.add('modal-open');

})();
