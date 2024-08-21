import { openModal, closeModal } from './modal.js';
// Функция создания карточки

export function createCard(cardItem, deleteCard, cardTemplate, imgPopup, likeHandleFunction) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    cardNew.querySelector('.card__image').src = cardItem.link;
    cardNew.querySelector('.card__image').alt = cardItem.name;
    cardNew.querySelector('.card__title').textContent = cardItem.name;
    cardNew.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardNew);
    });

    cardNew.querySelector('.card__image').addEventListener('click', () => {
        const imageContainer = imgPopup.querySelector('.popup__image')
        imageContainer.src = cardItem.link
        imageContainer.alt = cardItem.name
        const imageCaption = imgPopup.querySelector('.popup__caption')
        imageCaption.textContent = cardItem.name
        openModal(imgPopup);
    });
    // Лайки на карточках
    const buttonLike = cardNew.querySelector('.card__like-button')
    buttonLike.addEventListener('click', likeHandleFunction)

    return cardNew;
}

// Функция удаления карточки

export function deleteCard(cardNew) {
    cardNew.remove();
}
