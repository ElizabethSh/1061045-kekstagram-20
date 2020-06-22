'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/kekstagram/data';
  var URL_POST = 'https://javascript.pages.academy/kekstagram';

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();
