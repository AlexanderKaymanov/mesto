export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  // Метод добавления класса с ошибкой
  _showError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  // Метод удаления класса с ошибкой
  _hideError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
  }

  // Метод проверки валидности полей
  _checkInputValidity(input) {
    input.setCustomValidity('');
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  // Метод изменения состояния кнопки
  _toggleButtonState(buttonSubmit, isActive) {
    if (isActive) {
      buttonSubmit.disabled = false;
      buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
    } else {
      buttonSubmit.disabled = true;
      buttonSubmit.classList.add(this._settings.inactiveButtonClass);
    }
  }

  // Метод слушателя событий полей input и кнопок submit
  _setEventListeners(buttonElement) {
    const inputs = Array.from(this._formElement);
    inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
      this._checkInputValidity(evt.target);

      // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
      const isAllValid = this._formElement.checkValidity();
      this._toggleButtonState(buttonElement, isAllValid);
    });
  });
  }

  // Метод валидации форм
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._setEventListeners(buttonElement);
    this._toggleButtonState(buttonElement, this._formElement.checkValidity());
  }
}
