'use strict';

// модуль для отрисовки полноэкранного изображения при нажатии на
// миниатюру;

(function () {

  var body = document.querySelector('body');
  var bigPicture = body.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  /* var commentTemplate = document.querySelector('#comment').
                      content.querySelector('.social__comment');*/
  var commentExamples = commentsList.querySelectorAll('.social__comment');
  var buttonClose = bigPicture.querySelector('.big-picture__cancel');

  var addListeners = function () {
    window.galery.picturesList.addEventListener('click', onPictureClick);
    window.galery.picturesList.addEventListener('keydown', onPictureEnterPress);
  };

  var removeListeners = function () {
    window.galery.picturesList.removeEventListener('click', onPictureClick);
    window.galery.picturesList.removeEventListener('keydown', onPictureEnterPress);
  };

  /* Функция рендеринга комменария */
  /* var renderSocialComment = function (usersComment) {
    var socialComment = commentTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = usersComment.avatar;
    socialComment.querySelector('.social__picture').alt = usersComment.name;
    socialComment.querySelector('.social__text').textContent = usersComment.message;

    return socialComment;
  }; */

  /* Отрисовываем коммнтарии в зависимоти от их количества */
  /* var createSocialComment = function () {
    var fragment = document.createDocumentFragment();

    window.data.photoDescriptions[0].comments.forEach(function (it) {
      fragment.appendChild(renderSocialComment(it));
    });
    commentsList.appendChild(fragment);
  };*/

  // Показываем большое фото

  var openBigPicture = function () {
    /* Удаляем комментарии по умолчанию */
    commentExamples.forEach(function (it) {
      it.remove();
    });

    // createSocialComment();

    // показываем окно с фото
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentEscPress);
    removeListeners();
  };

  var onPictureClick = function (evt) {
    if (evt.target && evt.target.matches('img[class="picture__img"]')) {
      openBigPicture();
    }
  };

  var onPictureEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      openBigPicture();
    });
  };

  addListeners();

  // закрываем попап с большим фото

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentEscPress);
    addListeners();
  };

  var onButtonCloseClick = function () {
    closeBigPicture();
  };

  var onDocumentEscPress = function (evt) {
    window.util.isEscapeEvent(evt, function () {
      closeBigPicture();
    });
  };

  buttonClose.addEventListener('click', onButtonCloseClick);

  // вставляем информацию из 1-го элемента массива с данными*/

  /* var renderBigPicture = function () {
    bigPicture.querySelector('.likes-count').textContent = window.data.userPhotos[0].likes;
    bigPicture.querySelector('.big-picture__img img').src = window.data.photoDescriptions[0].url;
    bigPicture.querySelector('.big-picture__img img').alt = ' ';
    bigPicture.querySelector('.social__caption').textContent = window.data.photoDescriptions[0].description;
    bigPicture.querySelector('.comments-count').textContent = window.data.photoDescriptions[0].comments.length;
  };*/

  // createSocialComment();

  /* Прячем блоки счётчика комментариев и загрузки новых комментариев */
  // bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  // bigPicture.querySelector('.comments-loader').classList.add('hidden');

  window.picture = {
    addListeners: addListeners,
    removeListeners: removeListeners
  };
})();
