// Функция добавления класса с ошибкой
function showError(input, inputErrorClass) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

// Функция удаления класса с ошибкой
function hideError(input, inputErrorClass) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

// Функция проверки валидности полей
function checkInputValidity(input, inputErrorClass) {
  input.setCustomValidity('');
  if (!input.validity.valid) {
    showError(input, inputErrorClass);
  } else {
    hideError(input, inputErrorClass);
  }
}

// Фнкция изменения состояния кнопки
function toggleButtonState(inactiveButtonClass, buttonSubmit, isActive) {
  if (isActive) {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove(inactiveButtonClass);
  } else {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(inactiveButtonClass);
  }
}

// Функция слушателя событий полей input и кнопок submit
function setEventListeners(formElement, inputSelector, inactiveButtonClass, inputErrorClass, buttonElement) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputs.forEach(input => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(evt.target, inputErrorClass);

      // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
      const isAllValid = formElement.checkValidity();
      toggleButtonState(inactiveButtonClass, buttonElement, isAllValid);
    });
  });
}

// Функция перебора и валидации форм
function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((formElement, i ) => {
    /** Выключаем перезагрузку страницы при отправке формы **/
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const buttonElement = formElement.querySelector(submitButtonSelector);
    setEventListeners(formElement, inputSelector, inactiveButtonClass, inputErrorClass, buttonElement);
    toggleButtonState(inactiveButtonClass, buttonElement, formElement.checkValidity());
  });
}

// Конфигурация атрибутов
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
});
