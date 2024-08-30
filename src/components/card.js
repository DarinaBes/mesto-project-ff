// функция создания карточки принимает в качестве параметров данные карточки, функции обработки её событий и id текущего пользователя;

// Функция создания карточки
export function createCard(cardItem, deleteCard, cardTemplate, openImgPopup) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardNew.querySelector('.card__image')

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardNew.querySelector('.card__title').textContent = cardItem.name;
    cardNew.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardNew);
    });

    cardNew.querySelector('.card__image').addEventListener('click', openImgPopup);
    // Лайки на карточках
    const buttonLike = cardNew.querySelector('.card__like-button')
    buttonLike.addEventListener('click', handleLike)
    return cardNew;
}

// Функция удаления карточки
export function deleteCard(cardNew) {
    cardNew.remove();
}

function handleLike(evt) {
    if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
    }
};
