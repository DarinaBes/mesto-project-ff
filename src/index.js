import "./vendor/fonts.css";
import "./vendor/normalize.css";
import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getUserInfo, editProfile, editAvatar, displayCard } from './components/api.js'
import { renderLoading } from "./components/utils.js";

let userId;

function getData() {
    Promise.all([getUserInfo(), getInitialCards()])
        .then(([profileUser, initialCards]) => {
            userId = profileUser._id;

            profileImage.style.backgroundImage = `url(${profileUser.avatar})`;
            profileName.textContent = profileUser.name;
            profileJob.textContent = profileUser.about;

            // Вывести карточки на страницу
            initialCards.forEach((cardItem) => {
                placesList.appendChild(
                    createCard(cardItem, cardTemplate, openImgPopup, userId, openSubmitDeletePopup)
                );
            });
        })
        .catch(error => console.error("Ошибка", error));
}
getData()
//При нажатии подставляются данные профиля
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(profilePopup, configValidation);
    openModal(profilePopup);
});
// Обработчик «отправки» формы профиля
function handleFormEdit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    renderLoading(true, profilePopup.querySelector(".popup__button"));
    editProfile(newName, newJob)
        .then((res) => {
            profileName.textContent = res.name;
            profileJob.textContent = res.about;
            closeModal(profilePopup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, profilePopup.querySelector(".popup__button"));
        });
}
formEditprofile.addEventListener("submit", handleFormEdit);
profilePopupCloseButton.addEventListener("click", () => {
    formEditprofile.reset();
    closeModal(profilePopup);
});
// Добавление новой карточки/Обработчик «отправки» формы карточки
function handleImgForm(evt) {
    evt.preventDefault();
    const newCardUser = {
        name: nameCardNew.value,
        link: imgCardNew.value,
    };
    renderLoading(true, formNewCard.querySelector(".popup__button"));
    displayCard(newCardUser.name, newCardUser.link)
        .then((card) => {
            placesList.prepend(
                createCard(
                    card,
                    cardTemplate,
                    openImgPopup,
                    userId,
                    openSubmitDeletePopup
                )
            );
            formNewCard.reset();
            clearValidation(newCardPopup, configValidation);
            closeModal(newCardPopup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, formNewCard.querySelector(".popup__button"));
        });
}
formNewCard.addEventListener("submit", handleImgForm);
newCardAddButton.addEventListener("click", () => {
    openModal(newCardPopup);
});
newCardPopupCloseButton.addEventListener("click", () => {
    formNewCard.reset();
    clearValidation(newCardPopup, configValidation);
    closeModal(newCardPopup);
});
// Обновить аватар
function handleImgAvatar(evt) {
    evt.preventDefault();
    const newAvatar = imgAvatarNew.value;
    profileImage.style.backgroundImage = newAvatar;
    renderLoading(true, profilePopupAvatar.querySelector(".popup__button"));
    editAvatar(newAvatar)
        .then((res) => {
            profileImage.style.backgroundImage = `url('${res.avatar}')`;
            formNewAvatar.reset();
            clearValidation(formNewAvatar, configValidation);
            closeModal(profilePopupAvatar);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, profilePopupAvatar.querySelector(".popup__button"));
        });
}
formNewAvatar.addEventListener("submit", handleImgAvatar);
profileImage.addEventListener("click", () => {
    openModal(profilePopupAvatar);
});
avatarPopupCloseButton.addEventListener("click", () => {
    closeModal(profilePopupAvatar);
    clearValidation(formNewAvatar, configValidation);
    formNewAvatar.reset();
});
//Открыть карточку на весь экран
function openImgPopup(evt) {
    const cardImage = evt.target
    imageContainer.src = cardImage.src
    imageContainer.alt = cardImage.alt
    imageCaption.textContent = cardImage.alt
    openModal(imgPopup);
}
imgPopupCloseButton.addEventListener("click", () => {
    closeModal(imgPopup);
});
//Функция открытия модального окна для удаления карточки
function openSubmitDeletePopup(cardId, deleteCard) {
    openModal(popupDeleteQuestion);
    submitDeleteButton.addEventListener('click', () => {
        deleteCard(cardId)
            .then(() => {
                closeSubmitDeletePopup();
                placesList.replaceChildren();
                getData();
            })
            .catch((error) => {
                console.log(error);
            });
    }, { once: true });
}
function closeSubmitDeletePopup() {
    closeModal(popupDeleteQuestion);
}
closeButtonQuestion.addEventListener("click", () => {
    closeModal(popupDeleteQuestion);
});

const configValidation = {
    formList: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    buttonElementDisabled: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

//Валидация
enableValidation(configValidation);

import {
    cardTemplate, placesList, imgPopup, imgPopupCloseButton,
    imageContainer, imageCaption, newCardPopup, newCardPopupCloseButton,
    newCardAddButton, popupDeleteQuestion, submitDeleteButton, closeButtonQuestion, profilePopup, profilePopupCloseButton,
    profileEditButton, profilePopupAvatar, profileImage, avatarPopupCloseButton, profileName, profileJob,
    formEditprofile, formNewCard, formNewAvatar, nameInput, jobInput, nameCardNew, imgCardNew, imgAvatarNew
} from "./components/constants.js";