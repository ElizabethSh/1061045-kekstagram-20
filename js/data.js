'use strict';

(function () {

  var picturesFilter = document.querySelector('.img-filters');
  var picturesFilterForm = picturesFilter.querySelector('.img-filters__form');
  var filterButtons = picturesFilter.querySelectorAll('.img-filters__button');
  var userPhotos = [];

  // функция перемешивания массива данных
  var shuffle = function (array) {
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  picturesFilterForm.addEventListener('click', function (evt) {
    // проверяем, на каком элементе случилось событие (д.б.button)
    if (evt.target && evt.target.matches('button[type = "button"]')) {

      // при нажатии на button добавляем ему класс active, а у других кнопок его удаляем
      filterButtons.forEach(function (it) {
        it.classList.remove('img-filters__button--active');
      });
      if (!evt.target.classList.contains('img-filters__button--active')) {
        evt.target.classList.add('img-filters__button--active');
      }
    }

    if (evt.target && evt.target.matches('button[id = "filter-default"]')) {
      updatePhotos(window.data.userPhotos);
    } else if (evt.target && evt.target.matches('button[id = "filter-random"]')) {
      var copiedPhotos = window.data.userPhotos.slice();
      shuffle(copiedPhotos);
      var randomPhotos = copiedPhotos.slice(0, 10);
      updatePhotos(randomPhotos);
    }
  });

  var removePictures = function () {
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (it) {
      it.remove();
    });
  };

  var updatePhotos = function (data) {
    removePictures();
    window.galery.render(data);
  };

  window.data = {
    picturesFilter: picturesFilter,
    userPhotos: userPhotos,

    // updatePhotos: updatePhotos
  };

})();
