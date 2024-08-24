export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    popupElement.addEventListener('click', closeByOverlayClick);
}

export function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    popupElement.removeEventListener('click', closeByOverlayClick);
}

// Функция закрывающая попапы при нажатии клавиши esc
function closeByEsc(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openedPopup)
    }
} 
// Функция закрывающая попапы при нажатии на оверлей
function closeByOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
        closeModal(evt.currentTarget)
    }
    
}
