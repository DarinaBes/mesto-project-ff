import "./vendor/fonts.css";
import "./vendor/normalize.css";
import "./pages/index.css";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getUserInfo, editProfile, editAvatar, displayCard } from './components/api.js'

let userId;

Promise.all([getUserInfo(), getInitialCards()])
    .then(([profileUser, initialCards]) => {
        userId = profileUser._id;

        profileImage.style.backgroundImage = `url(${profileUser.avatar})`;
        profileName.textContent = profileUser.name;
        profileJob.textContent = profileUser.about;

        // Вывести карточки на страницу
        initialCards.forEach((cardItem) => {
            placesList.appendChild(
                createCard(cardItem, deleteCard, cardTemplate, openImgPopup, userId)
            );
        });
    })
    .catch(error => console.error("Ошибка", error));

const configValidation = {
    formList: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    buttonElementDisabled: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

// Модальные окна
const imgPopup = document.querySelector(".popup_type_image");
const imgPopupCloseButton = imgPopup.querySelector(".popup__close");
const imageContainer = imgPopup.querySelector('.popup__image');
const imageCaption = imgPopup.querySelector('.popup__caption');

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
const newCardAddButton = document.querySelector(".profile__add-button");

//Профиль пользователя
const profilePopup = document.querySelector(".popup_type_edit");
const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupAvatar = document.querySelector(".popup_type_new-avatar");
const profileImage = document.querySelector(".profile__image");
const avatarPopupCloseButton = profilePopupAvatar.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Формы
const formEditprofile = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];
const formNewAvatar = document.forms["avatar"];

// Выбираем элементы, куда должны быть вставлены значения полей
const nameInput = formEditprofile.elements.name;
const jobInput = formEditprofile.elements.description;

// Находим поля формы в DOM
const nameCardNew = formNewCard.elements["place-name"];
const imgCardNew = formNewCard.elements.link;
const imgAvatarNew = formNewAvatar.elements.link;

imgPopupCloseButton.addEventListener("click", () => {
    closeModal(imgPopup);
});
//При нажатии подставляются данные профиля
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(profilePopup, configValidation);
    openModal(profilePopup);
});
profilePopupCloseButton.addEventListener("click", () => {
    formEditprofile.reset();
    closeModal(profilePopup);
});
// Обработчик «отправки» формы профиля
function handleFormEdit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    NewButtonText(true, profilePopup.querySelector(".popup__button"));
    editProfile(newName, newJob)
        .then((res) => {
            profileName.textContent = res.name;
            profileJob.textContent = res.about;
            closeModal(editPopup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            NewButtonText(false, profilePopup.querySelector(".popup__button"));
        });
    closeModal(profilePopup);
}
formEditprofile.addEventListener("submit", handleFormEdit);

//Добавление новой карточки
newCardAddButton.addEventListener("click", () => {

    openModal(newCardPopup);
});
newCardPopupCloseButton.addEventListener("click", () => {
    closeModal(newCardPopup);
    formNewCard.reset();
    clearValidation(newCardPopup, configValidation);
});
// Обработчик «отправки» формы карточки
function handleImgForm(evt) {
    evt.preventDefault();
    const newCardUser = {
        name: nameCardNew.value,
        link: imgCardNew.value,
    };
    NewButtonText(true, formNewCard.querySelector(".popup__button"));
    displayCard(newCardUser.name, newCardUser.link)
        .then((card) => {
            placesList.prepend(
                createCard(
                    card,
                    deleteCard,
                    cardTemplate,
                    openImgPopup,
                    userId
                )
            );
            closeModal(newCardPopup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            formNewCard.reset();
            NewButtonText(false, formNewCard.querySelector(".popup__button"));
        });
}
formNewCard.addEventListener("submit", handleImgForm);


//Открыть карточку на весь экран
function openImgPopup(evt) {
    const cardImage = evt.target
    imageContainer.src = cardImage.src
    imageContainer.alt = cardImage.alt
    imageCaption.textContent = cardImage.alt
    openModal(imgPopup);
}

// Обновить аватар
profileImage.addEventListener("click", () => {
    openModal(profilePopupAvatar);
});
function handleImgAvatar(evt) {
    evt.preventDefault();
    const newAvatar = { link: imgAvatarNew.value };
    profileImage.style.backgroundImage = `url(${newAvatar.link})`;
    localStorage.setItem('userAvatar', newAvatar.link);
    NewButtonText(true, profilePopupAvatar.querySelector(".popup__button"));
    editAvatar(newAvatar)
        .then(() => {
            closeModal(profilePopupAvatar);
            clearValidation(formNewAvatar, configValidation);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            formNewAvatar.reset();
            NewButtonText(false, profilePopupAvatar.querySelector(".popup__button"));
        });
}

formNewAvatar.addEventListener("submit", handleImgAvatar);
avatarPopupCloseButton.addEventListener("click", () => {
    closeModal(profilePopupAvatar);
    formNewAvatar.reset();
});

// Функция меняющая текст кнопки, пока данные грузятся
function NewButtonText(yesLoading, button) {
    if (yesLoading) {
    button.textContent = "Сохранение...";
    } 
    else {
    button.textContent = "Сохранить";
    }
}

//Валидация
enableValidation(configValidation);

