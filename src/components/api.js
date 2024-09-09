//Токен: 357d8846-e9ab-49c0-9f36-bd1a5f8848db
//Идентификатор группы: wff-cohort-22
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '357d8846-e9ab-49c0-9f36-bd1a5f8848db',
    'Content-Type': 'application/json'
  }
}
//Проверяем получение данных
function resCheck(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
//Загрузка информации о пользователе 
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then((res) => resCheck(res));
  }
//Редактировать данные профиля
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => resCheck(res));
}
//Загрузка карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => resCheck(res));
}
//Отображение карточки на странице
export function displayCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => resCheck(res));
}
//Лайк карточке
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => resCheck(res));
}
//Убрать лайк у карточки
export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => resCheck(res));
}
//Удалить карточку свою
export function removeMyCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => resCheck(res));
}
//Обновить аватарку
export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar.link,
    }),
  }).then((res) => resCheck(res));
}