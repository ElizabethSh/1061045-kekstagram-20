'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').
                      content.querySelector('section');
  var main = document.querySelector('main');

  var renderPicture = function (photo) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    return picture;
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });

    picturesList.appendChild(fragment);
  };

  var errorLoadHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
    errorMessage.querySelector('.error__button').textContent = 'Попробовать снова';

    main.appendChild(errorMessage);
  };

  window.backend.load(successHandler, errorLoadHandler);

})();
