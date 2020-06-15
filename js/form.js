'use strict';

(function () {

  var loading = document.querySelector('#upload-file');
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadCancel = imageUpload.querySelector('.img-upload__cancel');

  var onDocumentEscPress = function (evt) {
    window.util.isEscapeEvent(evt, function () {
      evt.preventDefault();
      closeUploadFile();
    });
  };

  // открытие окна загрузки

  var openUploadFile = function () {
    imageUpload.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onDocumentEscPress);
    imageUploadCancel.addEventListener('click', onCloseButtonClick);
    loading.removeEventListener('change', onUploadClick);
  };

  var onUploadClick = function () {
    openUploadFile();
  };

  loading.addEventListener('change', onUploadClick);

  // закрытие окна загрузки

  var closeUploadFile = function () {
    imageUpload.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    loading.value = '';

    loading.addEventListener('change', onUploadClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    imageUploadCancel.removeEventListener('click', onCloseButtonClick);
  };

  var onCloseButtonClick = function () {
    closeUploadFile();
  };

  // применение эффекта для изображения

  var effectLevelPin = imageUpload.querySelector('.effect-level__pin');
  var effectLevelValue = imageUpload.querySelector('.effect-level__value');
  var effectLevel;

  effectLevelPin.addEventListener('mouseup', function () {
    effectLevel = Math.floor(effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth * 100); // уровень эффекта px/ длина полосы прокрутки пина px* 100
    effectLevelValue.value = effectLevel;
  });


  var effectsList = imageUpload.querySelector('.effects__list');
  var imageUploadPreview = imageUpload.querySelector('.img-upload__preview img');

  effectsList.addEventListener('click', function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imageUploadPreview.className = '';
      var className = 'effects__preview--' + evt.target.value;
      imageUploadPreview.classList.add(className);
      effectLevelValue.value = 100; /* нужно ли устанавливать 100% */
    }
  });

  // Валидация хеш-тегов
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagInput = imageUpload.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');
  var re = /^#[A-Za-zА-Яа-я0-9]*\s*$/; // доработать чтобы не ругался на пробел

  var validateHashtag = function () {
    var hashtags = hashtagInput.value.split(' ');

    // нет проверки на повторяемость хэштегов!

    if (hashtags.length > 5) {
      hashtagInput.setCustomValidity('Допустимо не более пяти хэштегов');
      form.reportValidity();
    } else {
      hashtags.forEach(function (it) {
        if (!re.test(it)) {
          hashtagInput.setCustomValidity('Неправильный формат хэштега');
          form.reportValidity();
        } else if (it.length > MAX_HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Слишком длинный хэштег. Удалите лишние ' + (it.length - MAX_HASHTAG_LENGTH) + ' симв.');
          form.reportValidity();
        } else {
          hashtagInput.setCustomValidity('');
        }
      });
    }
  };

  var onHashtagFieldInput = function () {
    validateHashtag();
  };

  hashtagInput.addEventListener('input', onHashtagFieldInput);

  var onHashtagFieldEscPress = function (evt) {
    window.util.isEscapeEvent(evt, function () {
      evt.stopPropagation();
    });
  };

  hashtagInput.addEventListener('keydown', onHashtagFieldEscPress);

  // не работает как нужно!
  form.addEventListener('summit', function (evt) {
    if (!hashtagInput.validity.valid) {
      evt.preventDefault();
    }
  });

})();
