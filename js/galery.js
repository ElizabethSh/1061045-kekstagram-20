'use strict';

(function () {
  var main = document.querySelector('main');
  var picturesList = main.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').
                      content.querySelector('section');


  var renderPicture = function (photo) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    return picture;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });

    picturesList.appendChild(fragment);
  };

  var updatePhotos = function () { // в дальнейшем функция фильтрации
    render(window.data.userPhotos);
  };

  var successLoadHandler = function (photos) {
    window.data.userPhotos = photos;
    updatePhotos();
  };


  var errorLoadHandler = function () {
    var errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
    errorWindow.querySelector('.error__button').textContent = 'Попробовать снова';

    main.appendChild(errorWindow);
  };

  window.backend.load(successLoadHandler, errorLoadHandler);

  window.galery = {
    main: main,

    picturesList: picturesList
  };

})();
