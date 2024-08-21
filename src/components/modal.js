// экспортируйте функции openModal и closeModal, 
// принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.
import { keyHandler, closePopOverlay } from "../index";

export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
    popupElement.addEventListener('click', closePopOverlay);
}


export function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
    popupElement.removeEventListener('click', closePopOverlay);
}
