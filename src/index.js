import "./vendor/fonts.css";
import "./vendor/normalize.css";
import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// Модальное окно картинки
const imgPopup = document.querySelector(".popup_type_image");
const popCloseImg = imgPopup.querySelector(".popup__close");
popCloseImg.addEventListener("click", () => {
    closeModal(imgPopup);
});

export const likeHandleFunction = (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
    }
};

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    placesList.appendChild(
        createCard(cardItem, deleteCard, cardTemplate, imgPopup, likeHandleFunction)
    );
});

// Модальное окно редактирования профиля
const popEdit = document.querySelector(".popup_type_edit");
const popCloseButton = popEdit.querySelector(".popup__close");
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popEdit);
});
popCloseButton.addEventListener("click", () => {
    formElement.reset();
    closeModal(popEdit);
});

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Находим форму в DOM
const formElement = document.forms["edit-profile"];
// Выберите элементы, куда должны быть вставлены значения полей
const nameInput = formElement.elements.name; //.querySelector(".popup__input_type_name");
const jobInput = formElement.elements.description; //.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closeModal(popEdit);
    formElement.reset();
}
// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", handleFormSubmit);

// Модальное окно карточка добавление
const popNewCard = document.querySelector(".popup_type_new-card");
const popCardButton = popNewCard.querySelector(".popup__close");
const profileButton = document.querySelector(".profile__add-button");
profileButton.addEventListener("click", () => {
    openModal(popNewCard);
});
popCardButton.addEventListener("click", () => {
    closeModal(popNewCard);
    formCardNew.reset();
});
// Находим форму в DOM
const formCardNew = document.forms["new-place"];
// Находим поля формы в DOM
const NameCardNew = formCardNew.elements["place-name"]; //.querySelector('.popup__input_type_card-name');
const ImgCardNew = formCardNew.elements.link; //.querySelector('.popup__input_type_url');
const NewCardUser = {
    name: "",
    link: "",
};
// Обработчик «отправки» формы
function ImgFormSubmit(evt) {
    evt.preventDefault();
    NewCardUser.name = NameCardNew.value;
    NewCardUser.link = ImgCardNew.value;
    placesList.prepend(
        createCard(
            NewCardUser,
            deleteCard,
            cardTemplate,
            imgPopup,
            likeHandleFunction
        )
    );
    closeModal(popNewCard);
    formCardNew.reset();
}
// Прикрепляем обработчик к форме:
formCardNew.addEventListener("submit", ImgFormSubmit);

// Функция закрывающая попапы при нажатии клавиши esc
export function keyHandler(evt) {
    if (evt.key === "Escape") {
        if (imgePopup.classList.contains("popup_is-opened")) {
            closeModal(imgePopup);
        } else if (popEdit.classList.contains("popup_is-opened")) {
            closeModal(popEdit);
        } else if (popNewCard.classList.contains("popup_is-opened")) {
            closeModal(popNewCard);
        }
    }
}
// Функция закрывающая попапы при нажатии на оверлей
export function closePopOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closeModal(imgPopup);
        closeModal(popEdit);
        closeModal(popNewCard);
    }
}
