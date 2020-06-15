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

  var createPictures = function () {
    window.data.create();
    var fragment = document.createDocumentFragment();

    window.data.photoDescriptions.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });
    picturesList.appendChild(fragment);
  };

  createPictures();

})();
