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
  _toggleButtonState(_buttonElement, isActive) {
    this._disableButtonSubmit();
    if (isActive) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
  }

  // Метод слушателя событий полей input и кнопок submit
  _setEventListeners() {
    this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);

        // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
        const isAllValid = this._formElement.checkValidity();
        this._toggleButtonState(this._buttonElement, isAllValid);
      });
    });
  }

  // Метод отключения кнопки submit после сохранения формы
  _disableButtonSubmit() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  // Метод валидации форм
  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._disableButtonSubmit();
    });

    this._setEventListeners(this._buttonElement);
    this._toggleButtonState(this._buttonElement, this._formElement.checkValidity());
  }
}
