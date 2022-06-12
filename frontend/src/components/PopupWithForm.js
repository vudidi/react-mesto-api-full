function PopupWithForm(props) {  

  return (
    <div
      className={`popup popup_type_${props.name} popup_theme_light ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
        ></button>
        <form
          className="popup__form"
          name={props.name}
          id={`popupForm-_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__form-title">{props.title}</h2>
          {props.children}
          <button
            style={props.style}
            className={`popup__form-button popup__form-button_${props.name}`}
            type="submit"
            id={`submit-${props.name}`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
