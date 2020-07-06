'use strict';

// модуль для отрисовки полноэкранного изображения при нажатии на
// миниатюру;

(function () {
  var COMMENT_AMOUNT_MAX = 5;

  var body = document.querySelector('body');
  var bigPicture = body.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').
                      content.querySelector('.social__comment');
  var buttonClose = bigPicture.querySelector('.big-picture__cancel');

  // рендерим большое фото
  var renderBigPicture = function (data) {
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.big-picture__img img').src = data.url;
    bigPicture.querySelector('.big-picture__img img').alt = ' ';
    bigPicture.querySelector('.social__caption').textContent = data.description;
    bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  };

  // Функция рендеринга комменария
  var renderSocialComment = function (usersComment) {
    var socialComment = commentTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = usersComment.avatar;
    socialComment.querySelector('.social__picture').alt = usersComment.name;
    socialComment.querySelector('.social__text').textContent = usersComment.message;

    return socialComment;
  };

  // Отрисовываем коммнтарии в зависимоти от их количества
  var createSocialComment = function (usersComments) {
    var fragment = document.createDocumentFragment();

    var takeNumber = usersComments.comments.length < COMMENT_AMOUNT_MAX ? usersComments.comments.length : COMMENT_AMOUNT_MAX;
    // var socialCommentCount = document.querySelector('.social__comment-count');
    // socialCommentCount.textContent = takeNumber + ' из';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderSocialComment(usersComments.comments[i]));
    }

    commentsList.appendChild(fragment);
  };

  // Показываем большое фото
  var openBigPicture = function (index) {
    renderBigPicture(window.data.userPhotos[index]);

    var comments = commentsList.querySelectorAll('.social__comment');
    // Удаляем комментарии по умолчанию
    comments.forEach(function (it) {
      it.remove();
    });

    createSocialComment(window.data.userPhotos[index]);

    // показываем окно с фото
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentEscPress);
    removeListeners();
    window.data.removeListeners();
  };

  var onPictureClick = function (evt) {
    if (evt.target && evt.target.matches('img[class="picture__img"]')) {
      openBigPicture(evt.target.dataset.key);
    }
  };

  var onPictureEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      openBigPicture(evt.target.dataset.key);
    });
  };

  // закрываем попап с большим фото
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentEscPress);
    addListeners();
    window.data.addListeners();
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

  // функция добавления обработчиков
  var addListeners = function () {
    window.galery.picturesList.addEventListener('click', onPictureClick);
    window.galery.picturesList.addEventListener('keydown', onPictureEnterPress);
  };

  // функция удаления обработчиков
  var removeListeners = function () {
    window.galery.picturesList.removeEventListener('click', onPictureClick);
    window.galery.picturesList.removeEventListener('keydown', onPictureEnterPress);
  };


  // createSocialComment();

  /* Прячем блоки счётчика комментариев и загрузки новых комментариев */
  // bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  // bigPicture.querySelector('.comments-loader').classList.add('hidden');

  window.picture = {
    addListeners: addListeners,
    removeListeners: removeListeners
  };
})();
