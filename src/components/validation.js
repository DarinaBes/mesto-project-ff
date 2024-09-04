// Из файла экспортируется только функция активации валидации enableValidation
// и функция очистки ошибок валидации clearValidation;
//функция enableValidation принимает объект настроек, которые используются при валидации;
//если поле ввода не проходит валидацию, то под ним отображается текст ошибки;
//поля «Имя» и «О себе» формы редактирования профиля и поле «Название» формы добавления карточки валидируются с помощью регулярного выражения;
//если поле ввода не проходит валидацию регулярным выражением, то текст ошибки должен быть кастомный;
//если хотя бы одно из полей формы не прошло валидацию, то кнопка отправки формы должна быть неактивной, иначе она должна иметь активное состояние;
//при заполнении полей формы профиля и при очистке формы добавления карточки должна вызываться очистка валидации.

export const enableValidation = (configValidation) => {
    // Найдём все формы с указанным классом в DOM
    const formList = Array.from(document.querySelectorAll(configValidation.formList));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, configValidation);
    });
};

// Очистка ошибок валидации
export function clearValidation(formList, configValidation) {
    const inputList = Array.from(formList.querySelectorAll(configValidation.inputList));
    // Найдем кнопку формы
    const buttonElement = formList.querySelector(configValidation.buttonElement);
    // Очистим ошибки валидации для каждого поля
    inputList.forEach((inputElement) => {
        hideInputError(formList, inputElement, configValidation);
    });
    // Сделаем кнопку неактивной
    toggleButtonState(inputList, buttonElement, configValidation);
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, configValidation) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
    } else {
        hideInputError(formElement, inputElement, configValidation);
    }
};

const setEventListeners = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputList));
    const buttonElement = formElement.querySelector(configValidation.buttonElement);
    //проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, configValidation);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, configValidation);
            toggleButtonState(inputList, buttonElement, configValidation);
        });
    });
};

//Проверяем был ли ввод верным или неверным
const hasInvalidInput = (inputList) => {
    // проходим по массиву
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей и элемент кнопки
const toggleButtonState = (inputList, buttonElementDisabled, configValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElementDisabled.disabled = true;
        buttonElementDisabled.classList.add(configValidation.buttonElementDisabled);
    } else {
        buttonElementDisabled.disabled = false;
        buttonElementDisabled.classList.remove(configValidation.buttonElementDisabled);
    }
};

