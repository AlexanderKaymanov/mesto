export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер для одной карточки
  addCard(element) {
    this._container.prepend(element);
  }

  // Метод, отвечающий за отрисовку одной карточки
  renderItem() {
    const item = this._renderedItems;
    this._renderer(item);
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
