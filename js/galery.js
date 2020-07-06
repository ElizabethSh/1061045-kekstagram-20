'use strict';

(function () {
  var main = document.querySelector('main');
  var picturesList = main.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').
                      content.querySelector('section');


  var renderSmallPicture = function (photo, index) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').dataset.key = index;
    picture.dataset.key = index;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    return picture;
  };

  var createSmallPhotos = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) { // попробовать переписать на forEach
      fragment.appendChild(renderSmallPicture(data[i], i));
    }

    picturesList.appendChild(fragment);
  };

  var updatePhotos = function (data) {
    createSmallPhotos(data);
  };

  var successLoadHandler = function (photos) {
    window.data.userPhotos = photos;
    // updatePhotos();
    updatePhotos(window.data.userPhotos); // рисуем миниатюры

    // показываем кнопки фильтрации
    window.data.picturesFilter.classList.remove('img-filters--inactive');

    // добавляем обработчик на контейнер с фотографиями
    window.picture.addListeners();

    // добавляем обработчики на кнопки сортировки
    window.data.addListeners();
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
    picturesList: picturesList,

    createSmallPhotos: createSmallPhotos,
    updatePhotos: updatePhotos

  };

})();
