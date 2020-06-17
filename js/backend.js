'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/kekstagram/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_GET);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
