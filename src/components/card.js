import { likeCard, removeLike, removeMyCard } from "./api";
// Функция создания карточки
export function createCard(cardItem, cardTemplate, openImgPopup, userId, openSubmitDeletePopup) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardNew.querySelector('.card__delete-button')
    const buttonLike = cardNew.querySelector('.card__like-button');
    const cardImage = cardNew.querySelector('.card__image')
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardNew.querySelector('.card__title').textContent = cardItem.name;

    // Присваиваем кнопке id карточки
    buttonLike.dataset.id = cardItem._id
    buttonLike.addEventListener('click', handleLike)

    const likeCounter = cardNew.querySelector('.like-counter');
    const likes = cardItem.likes
    const likesCount = likes.length
    likeCounter.textContent = likesCount

    const isMineLike = likes.some((like) => like._id === userId);
    if (isMineLike) {
        buttonLike.classList.add("card__like-button_is-active");
    }
    if (cardItem.owner._id !== userId) {
        deleteButton.classList.add('card__delete-button--hidden')
    }
    if (cardItem.owner._id === userId) {
        deleteButton.addEventListener('click', ()=> openSubmitDeletePopup(cardItem._id, deleteCard))
    }

    cardNew.querySelector('.card__image').addEventListener('click', openImgPopup);
    return cardNew;
}

function deleteCard(id) {
    return removeMyCard(id)
}

// Ставим лайки
function handleLike(evt) {
    const buttonLike = evt.target
    const id = buttonLike.dataset.id
    const likeCounter = buttonLike.nextElementSibling;
    if (buttonLike.classList.contains("card__like-button_is-active")) {
        console.log(id)
        removeLike(id)
            .then((data) => {
                likeCounter.textContent = data.likes.length;
                buttonLike.classList.remove("card__like-button_is-active");
            })
            .catch((error) =>
                console.error("Ошибка", error)
            );
    } else {
        console.log(id)
        likeCard(id)
            .then((data) => {
                likeCounter.textContent = data.likes.length;
                buttonLike.classList.add("card__like-button_is-active");
            })
            .catch((error) =>
                console.error("Ошибка", error)
            );
    }
}



