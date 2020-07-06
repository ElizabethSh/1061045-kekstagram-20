'use strict';

(function () {

  var picturesFilter = document.querySelector('.img-filters');
  var picturesFilterForm = picturesFilter.querySelector('.img-filters__form');
  var filterButtons = picturesFilter.querySelectorAll('.img-filters__button');
  var userPhotos = [];
  var filteredPhotos = [];

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

  var filterPhoto = function (evt) {
    // проверяем, на каком элементе случилось событие (д.б.button)
    if (evt.target && evt.target.matches('button[type = "button"]')) {
      removePictures();
      // при нажатии на button добавляем ему класс active, а у других кнопок его удаляем
      filterButtons.forEach(function (it) {
        it.classList.remove('img-filters__button--active');
      });
      if (!evt.target.classList.contains('img-filters__button--active')) {
        evt.target.classList.add('img-filters__button--active');
      }
    }

    // сортировка фотографий в зависимости от нажатой кнопки сортировки
    if (evt.target && evt.target.matches('button[id = "filter-default"]')) {
      filteredPhotos = window.data.userPhotos;
    } else if (evt.target && evt.target.matches('button[id = "filter-random"]')) {
      var popularPhotos = window.data.userPhotos.slice();
      shuffle(popularPhotos);
      filteredPhotos = popularPhotos.slice(0, 10);
    } else {
      popularPhotos = window.data.userPhotos.slice();

      popularPhotos.sort(function (first, second) {
        if (second.comments.length > first.comments.length) {
          return 1;
        } else if (second.comments.length < first.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      filteredPhotos = popularPhotos;
    }
    window.galery.updatePhotos(filteredPhotos);
  };

  var onFilterButtonClick = window.debounce(function (evt) {
    filterPhoto(evt);
  });

  // picturesFilterForm.addEventListener('click', onFilterButtonClick);

  var removePictures = function () {
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (it) {
      it.remove();
    });
  };


  var addListeners = function () {
    picturesFilterForm.addEventListener('click', onFilterButtonClick);
  };

  var removeListeners = function () {
    picturesFilterForm.removeEventListener('click', onFilterButtonClick);
  };

  window.data = {
    picturesFilter: picturesFilter,
    userPhotos: userPhotos,
    filteredPhotos: filteredPhotos,

    addListeners: addListeners,
    removeListeners: removeListeners,

  };

})();
