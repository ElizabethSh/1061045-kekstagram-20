'use strict';

(function () {
  var main = document.querySelector('main');
  var picturesList = main.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').
                      content.querySelector('section');


  var renderPicture = function (photo, index) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').dataset.key = index;
    picture.dataset.key = index;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    return picture;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) { // попробовать переписать на forEach
      fragment.appendChild(renderPicture(data[i], i));
    }

    picturesList.appendChild(fragment);
  };

  var successLoadHandler = function (photos) {
    window.data.userPhotos = photos;
    window.data.picturesFilter.classList.remove('img-filters--inactive');
    // updatePhotos();
    render(window.data.userPhotos);
    window.picture.addListeners();
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

    render: render

  };

})();
