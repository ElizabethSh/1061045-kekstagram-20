'use strict';

(function () {

  var MAX_HASHTAG_LENGTH = 20;

  var form = document.querySelector('.img-upload__form');
  var hashtagInput = form.querySelector('.text__hashtags');
  var loading = form.querySelector('#upload-file');
  var imageUploadCancel = form.querySelector('.img-upload__cancel');
  var successMessageTemplate = document.querySelector('#success').
                        content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').
                        content.querySelector('.error');

  // открытие окна загрузки

  var onDocumentEscPress = function (evt) {
    window.util.isEscapeEvent(evt, function () {
      evt.preventDefault();
      closeUploadForm();
    });
  };

  var openUploadForm = function () {
    window.preview.imageUploadOverlay.classList.remove('hidden');
    window.preview.slider.classList.add('hidden');
    window.preview.imageUploadSetup.className = ''; // задается пустой класс. Некрасиво
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onDocumentEscPress);
    imageUploadCancel.addEventListener('click', onCloseButtonClick);
    loading.removeEventListener('change', onUploadClick);
    window.picture.removeListeners();
  };

  var onUploadClick = function () {
    openUploadForm();
  };

  loading.addEventListener('change', onUploadClick);

  // закрытие окна загрузки

  var closeUploadForm = function () {
    window.preview.imageUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    // loading.value = '';  // проверить нужно ли это
    form.reset();

    loading.addEventListener('change', onUploadClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    imageUploadCancel.removeEventListener('click', onCloseButtonClick);
    window.picture.addListeners();
  };

  var onCloseButtonClick = function () {
    closeUploadForm();
  };

  // Валидация хеш-тегов
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


  var successHandler = function () {
    closeUploadForm();
    var successMessage = successMessageTemplate.cloneNode(true);
    window.galery.main.appendChild(successMessage);

    var successButton = document.querySelector('.success__button');

    var closeSuccessMessage = function () {
      window.util.removeElement(successMessage);
      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onSuccessMessageClick);
    };

    var onSuccessButtonClick = function () {
      closeSuccessMessage();
    };

    var onSuccessMessageEscPress = function (evt) {
      window.util.isEscapeEvent(evt, closeSuccessMessage);
    };

    var onSuccessMessageClick = function () {
      closeSuccessMessage();
    };

    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };


  var errorHandler = function () {
    closeUploadForm();
    var errorMessage = errorMessageTemplate.cloneNode(true);
    window.galery.main.appendChild(errorMessage);

    var errorButton = errorMessage.querySelector('.error__button');

    var closeErrorMessage = function () {
      window.util.removeElement(errorMessage);

      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onErrorMessageClick);
    };

    var onErrorButtonClick = function () {
      closeErrorMessage();
    };

    var onErrorMessageEscPress = function (evt) {
      window.util.isEscapeEvent(evt, closeErrorMessage);
    };

    var onErrorMessageClick = function () {
      closeErrorMessage();
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);
  };

  var submitHandler = function (evt) {
    window.backend.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
    // if (!hashtagInput.validity.valid) {
    //   evt.preventDefault();
    // }
  };

  form.addEventListener('submit', submitHandler);


})();
