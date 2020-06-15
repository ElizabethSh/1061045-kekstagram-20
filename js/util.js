'use strict';

(function () {
  var isEscapeEvent = function (evt, action) {
    if (evt.key === 'Escape') {
      action();
    }
  };

  window.util = {
    isEscapeEvent: isEscapeEvent
  };

})();
