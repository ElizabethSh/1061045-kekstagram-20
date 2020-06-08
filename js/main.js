'use strict';

var MAX_AMOUNT = 25;

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

  photoDescriptions.forEach(function (it) {
    fragment.appendChild(renderPicture(it));
  });
  picturesList.appendChild(fragment);
};

createPictures();

/* module3-task3 */

var bigPicture = document.querySelector('.big-picture');
var commentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment').
                      content.querySelector('.social__comment');
var commentExamples = commentsList.querySelectorAll('.social__comment');


/* Показываем большое фото и вставляем информацию из 1-го элемента массива с данными*/
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.likes-count').textContent = photoDescriptions[0].likes;
bigPicture.querySelector('.big-picture__img img').src = photoDescriptions[0].url;
bigPicture.querySelector('.big-picture__img img').alt = ' ';
bigPicture.querySelector('.social__caption').textContent = photoDescriptions[0].description;
bigPicture.querySelector('.comments-count').textContent = photoDescriptions[0].comments.length;

/* Удаляем комментарии по умолчанию */
commentExamples.forEach(function (it) {
  it.remove();
});

/* Функция рендеринга комменария */
var renderSocialComment = function (usersComment) {
  var socialComment = commentTemplate.cloneNode(true);

  socialComment.querySelector('.social__picture').src = usersComment.avatar;
  socialComment.querySelector('.social__picture').alt = usersComment.name;
  socialComment.querySelector('.social__text').textContent = usersComment.message;

  return socialComment;
};

/* Отрисовываем коммнтарии в зависимоти от их количества */
var createSocialComment = function () {
  var fragment = document.createDocumentFragment();

  photoDescriptions[0].comments.forEach(function (it) {
    fragment.appendChild(renderSocialComment(it));
  });
  commentsList.appendChild(fragment);
};

createSocialComment();

/* Прячем блоки счётчика комментариев и загрузки новых комментариев */
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

/* Добавляем body класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле */
document.querySelector('body').classList.add('modal-open');
