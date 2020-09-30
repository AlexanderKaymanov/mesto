const buttonOpenPopup = document.querySelector(".profile__edit-button");
const buttonClosePopup = document.querySelector(".close-image");
const popup = document.querySelector(".overlay");

const popupToggle = () => {
  popup.classList.toggle("overlay_is-opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);
