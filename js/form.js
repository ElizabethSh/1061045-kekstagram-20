'use strict';

(function () {

  var loading = document.querySelector('#upload-file');
  var imageUploadCancel = document.querySelector('.img-upload__cancel');

  var onDocumentEscPress = function (evt) {
    window.util.isEscapeEvent(evt, function () {
      evt.preventDefault();
      closeUploadFile();
    });
  };

  // открытие окна загрузки

  var openUploadFile = function () {
    window.preview.imageUpload.classList.remove('hidden');
    window.preview.slider.classList.add('hidden');
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
    window.preview.imageUpload.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    loading.value = '';

    loading.addEventListener('change', onUploadClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    imageUploadCancel.removeEventListener('click', onCloseButtonClick);
  };

  var onCloseButtonClick = function () {
    closeUploadFile();
  };

  // Валидация хеш-тегов
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagInput = window.preview.imageUpload.querySelector('.text__hashtags');
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
