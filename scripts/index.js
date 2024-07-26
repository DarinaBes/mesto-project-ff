// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCardElement(cardItem, deleteCard) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    cardNew.querySelector('.card__image').src = cardItem.link;
    cardNew.querySelector('.card__title').textContent = cardItem.name;
    cardNew.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardNew);
    }); 

    return cardNew;
}
// @todo: Функция удаления карточки

function deleteCard(cardNew) {
    cardNew.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    placesList.appendChild(createCardElement(cardItem, deleteCard));
});

