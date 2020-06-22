'use strict';

(function () {
  var isEscapeEvent = function (evt, action) {
    if (evt.key === 'Escape') {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
      action();
    }
  };

  window.util = {
    isEscapeEvent: isEscapeEvent,
    isEnterEvent: isEnterEvent
  };

})();
