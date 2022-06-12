function ImagePopup(props) {
  return (
    <div
      className={`popup popup-photo ${ props.card._id && props.isOpen && "popup_opened" }`}
    >
      <div className="popup-photo__container">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup-photo__link"
        />
        <h3 className="popup-photo__title">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
