import "./vendor/fonts.css";
import "./vendor/normalize.css";
import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// Модальные окна
const imgPopup = document.querySelector(".popup_type_image");
const imgPopupCloseButton = imgPopup.querySelector(".popup__close");
const imageContainer = imgPopup.querySelector('.popup__image');
const imageCaption = imgPopup.querySelector('.popup__caption');

const profilePopup = document.querySelector(".popup_type_edit");
const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
const newCardAddButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Формы
const formEditprofile = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];

// Выбираем элементы, куда должны быть вставлены значения полей
const nameInput = formEditprofile.elements.name; 
const jobInput = formEditprofile.elements.description; 

// Находим поля формы в DOM
const nameCardNew = formNewCard.elements["place-name"];
const imgCardNew = formNewCard.elements.link;

imgPopupCloseButton.addEventListener("click", () => {
    closeModal(imgPopup);
});

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    placesList.appendChild(
        createCard(cardItem, deleteCard, cardTemplate, openImgPopup)
    );
});

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // Очистка ошибок валидации при открытии формы профиля
    clearValidation(profilePopup);
    openModal(profilePopup);    
});
profilePopupCloseButton.addEventListener("click", () => {
    formEditprofile.reset();
    closeModal(profilePopup);
});

// Обработчик «отправки» формы
function handleFormEdit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const newName = nameInput.value;
    const newJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closeModal(profilePopup);
}
// Прикрепляем обработчик к форме:
formEditprofile.addEventListener("submit", handleFormEdit);

newCardAddButton.addEventListener("click", () => {
     // Очистка ошибок валидации при очистке формы добавления карточки
    clearValidation(newCardPopup);
    openModal(newCardPopup);
});
newCardPopupCloseButton.addEventListener("click", () => {
    closeModal(newCardPopup);
    formNewCard.reset();
});

// Обработчик «отправки» формы
function handleImgForm(evt) {
    evt.preventDefault();
    const newCardUser = {
        name: "",
        link: "",
    };
    newCardUser.name = nameCardNew.value;
    newCardUser.link = imgCardNew.value;
    placesList.prepend(
        createCard(
            newCardUser,
            deleteCard,
            cardTemplate,
            openImgPopup
        )
    );
    closeModal(newCardPopup);
    formNewCard.reset();
}
// Прикрепляем обработчик к форме:
formNewCard.addEventListener("submit", handleImgForm);

function openImgPopup(evt) {
    const cardImage = evt.target
    imageContainer.src = cardImage.src
    imageContainer.alt = cardImage.alt
    imageCaption.textContent = cardImage.alt
    openModal(imgPopup);
}

enableValidation()

