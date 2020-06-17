'use strict';

(function () {
  var picturesList = document.querySelector('.pictures'); // повтор!
  var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

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

  var errorHandler = function () {
    console.log('Error');
  };

  window.backend.load(successHandler, errorHandler);

})();
