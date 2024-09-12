// Функция меняющая текст кнопки, пока данные грузятся
export function renderLoading(yesLoading, button) {
    if (yesLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}