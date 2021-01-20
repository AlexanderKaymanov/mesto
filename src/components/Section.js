export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderedItem = data;
    this._renderer = renderer;
    this._container = containerSelector;
    this._card = document.querySelector('.template').content.querySelector('.card__button_remove');
    this._removeCard = document.querySelector('.template').content.querySelector('.card');
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер для одной карточки
  addCard(element) {
    this._container.prepend(element);
  }

  // Метод, отвечающий за удаление одной выбранной карточки
  removeCard(element) {
    console.log(element);
    this._element = element;
    this._element.remove();
    console.log('Карточка удалена из разметки');
  }

  // Метод, отвечающий за отрисовку одной карточки
  renderItem(item) {
    this._card.classList.remove('card__button_hidden');
    console.log(item);
    this._renderer({ name: item.name, link: item.link, likes: item.likes, owner: item.owner, _id: item._id });
  }

  // Метод, отвечающий за отрисовку всех карточек
  renderItems(userId) {
    this._renderedItems.map(item => {
      if (userId !== item.owner) {
        this._card.classList.add('card__button_hidden');
      } else {
        this._card.classList.remove('card__button_hidden');
      }
      this._renderer({ name: item.name, link: item.link, likes: item.likes, owner: item.owner, _id: item._id });
    });
  };
}
