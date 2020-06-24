'use strict';

(function () {

  var userPhotos = [];

  /* var MAX_AMOUNT = 25;

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var names = ['Анатолий', 'Игорь', 'Ангелина', 'Элеонора', 'Крош', 'Капитан Отчаяние'];

  var comment;
  var comments = [];
  var photoDescription;
  var photoDescriptions = [];

  var getRandomIntenger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var renderComment = function () {
    comment = {
      avatar: 'img/avatar-' + getRandomIntenger(1, 6) + '.svg',
      message: messages[getRandomIntenger(0, messages.length - 1)],
      name: names[getRandomIntenger(0, names.length - 1)],
    };
    return comment;
  };

  var commentAmount = getRandomIntenger(5, 10);

  var createComments = function () {
    for (var i = 0; i < commentAmount; i++) {
      renderComment(i);
      comments[i] = comment;
    }
  };

  var createPhotoDescription = function (index) {
    createComments();
    photoDescription = {
      url: 'photos/' + (index + 1) + '.jpg',
      description: 'строка, описание фотографии',
      likes: getRandomIntenger(15, 200),
      comments: comments
    };
  };

  var createData = function () {
    for (var i = 0; i < MAX_AMOUNT; i++) {
      createPhotoDescription(i);
      photoDescriptions[i] = photoDescription;
    }
  };

  createData(); // TEMP*/

  window.data = {
    userPhotos: userPhotos
    // photoDescriptions: photoDescriptions,

    // create: createData
  };

})();
