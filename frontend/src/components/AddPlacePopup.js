import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [value, setValue] = React.useState({});

  function handleInputChange(e) {
    const newValue = { ...value, [e.target.name]: e.target.value };
    setValue(newValue);
  }

  React.useEffect(() => {
    setValue({
      name: '',
      link: '',
    })
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: value.title,
      link: value.link,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className="popup__form-input popup__form-input_info_title"
        value={value.title || ""}
        onChange={handleInputChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        id="card-title"
        required
        autoComplete="off"
      />
      <span className="popup__error card-title-error"></span>

      <input
        type="url"
        name="link"
        className="popup__form-input popup__form-input_info_link"
        value={value.link || ""}
        onChange={handleInputChange}
        placeholder="Ссылка на картинку"
        id="card-link"
        required
        autoComplete="off"
      />
      <span className="popup__error card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
