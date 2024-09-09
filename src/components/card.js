// функция создания карточки принимает в качестве параметров данные карточки, функции обработки её событий и id текущего пользователя;
import {likeCard, removeLike, removeMyCard } from "./api";

// Функция создания карточки
export function createCard(cardItem, deleteCard, cardTemplate, openImgPopup, userId) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardNew.querySelector('.card__image')
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardNew.querySelector('.card__title').textContent = cardItem.name;

    const deleteButton = cardNew.querySelector('.card__delete-button')
    deleteButton.classList.add('card__delete-button--hidden')

    const cardIsMine = cardItem.owner._id === userId;
    if (cardIsMine) {
        deleteButton.classList.remove('card__delete-button--hidden')
        deleteButton.addEventListener('click', () => {
            removeMyCard(cardItem._id)
            .then(() => {
                deleteCard(cardNew);
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    const buttonLike = cardNew.querySelector('.card__like-button');
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
    cardNew.querySelector('.card__image').addEventListener('click', openImgPopup);
    return cardNew;
}



// Ставим лайки
function handleLike(event) {

    const buttonLike = event.target
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

//Функция удаления карточки
export function deleteCard(cardNew) {
    cardNew.remove();
}

