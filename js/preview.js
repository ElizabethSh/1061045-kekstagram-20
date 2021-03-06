'use strict';

// модуль показа и настройки загружаемого фото

(function () {

  var X_MIN = 0;
  var X_MAX = 453;

  // применение эффекта для изображения

  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var slider = imageUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelValue = slider.querySelector('.effect-level__value');
  var effectsList = imageUploadOverlay.querySelector('.effects__list');
  var imageUploadSetup = imageUploadOverlay.querySelector('.img-upload__preview img');
  var effectLevel;

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var currentCoords = {
        x: effectLevelPin.offsetLeft - shift.x
      };

      if (currentCoords.x < X_MIN) {
        effectLevelPin.style.left = X_MIN;
      } else if (currentCoords.x > X_MAX) {
        effectLevelPin.style.left = X_MAX;
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }

      effectLevel = Math.floor(effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth * 100); // уровень эффекта px/ длина полосы прокрутки пина px* 100
      effectLevelValue.defaultValue = effectLevel;
      imageUploadOverlay.querySelector('.effect-level__depth').style.width = effectLevel + '%';
    };

    document.addEventListener('mousemove', onMouseMove);

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  });

  effectsList.addEventListener('click', function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imageUploadSetup.className = '';
      var className = 'effects__preview--' + evt.target.value;
      imageUploadSetup.classList.add(className);
      effectLevelValue.defaultValue = 100;
      effectLevelPin.style.left = X_MAX + 'px';
      imageUploadOverlay.querySelector('.effect-level__depth').style.width = 100 + '%';
      slider.classList.remove('hidden');

      if (evt.target && evt.target.matches('input[id="effect-none"]')) {
        slider.classList.add('hidden');
      }
    }
  });

  window.preview = {
    slider: slider,
    imageUploadSetup: imageUploadSetup,
    imageUploadOverlay: imageUploadOverlay
  };

})();
