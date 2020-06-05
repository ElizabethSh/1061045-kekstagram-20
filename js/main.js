'use strict';

var MAX_AMOUNT = 25;
var commentAmount = Math.floor(Math.random() * 10 + 1);

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

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').
                      content.querySelector('.picture');

var getRandomIntenger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderComments = function () {
  comment = {
    avatar: 'img/avatar-' + getRandomIntenger(1, 6) + '.svg',
    message: messages[getRandomIntenger(0, messages.length - 1)],
    name: names[getRandomIntenger(0, names.length - 1)],
  };
  return comment;
};

var createComments = function () {
  for (var i = 0; i < commentAmount; i++) {
    renderComments(i);
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

var renderPicture = function (photo) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  return picture;
};

var createPictures = function () {
  createData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoDescriptions.length; i++) {
    fragment.appendChild(renderPicture(photoDescriptions[i]));
  }

  picturesList.appendChild(fragment);
};

createPictures();
