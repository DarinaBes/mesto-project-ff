// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");
// Модальные окна
export const imgPopup = document.querySelector(".popup_type_image");
export const imgPopupCloseButton = imgPopup.querySelector(".popup__close");
export const imageContainer = imgPopup.querySelector('.popup__image');
export const imageCaption = imgPopup.querySelector('.popup__caption');

export const newCardPopup = document.querySelector(".popup_type_new-card");
export const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
export const newCardAddButton = document.querySelector(".profile__add-button");
//Popup удаления карточки
export const popupDeleteQuestion = document.querySelector(".popup_type_question");
export const submitDeleteButton = document.querySelector('form[name="card-delete"');
export const closeButtonQuestion = popupDeleteQuestion.querySelector(".popup__close");
//Профиль пользователя
export const profilePopup = document.querySelector(".popup_type_edit");
export const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profilePopupAvatar = document.querySelector(".popup_type_new-avatar");
export const profileImage = document.querySelector(".profile__image");
export const avatarPopupCloseButton = profilePopupAvatar.querySelector(".popup__close");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");
// Формы
export const formEditprofile = document.forms["edit-profile"];
export const formNewCard = document.forms["new-place"];
export const formNewAvatar = document.forms["avatar-edit"];
// Выбираем элементы, куда должны быть вставлены значения полей
export const nameInput = formEditprofile.elements.name;
export const jobInput = formEditprofile.elements.description;
// Находим поля формы в DOM
export const nameCardNew = formNewCard.elements["place-name"];
export const imgCardNew = formNewCard.elements.link;
export const imgAvatarNew = formNewAvatar.querySelector(".popup__input_type_url");

