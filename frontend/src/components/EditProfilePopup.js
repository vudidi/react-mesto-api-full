import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [value, setValue] = React.useState({});
    const currentUser = React.useContext(CurrentUserContext);

    function handleInputChange(e) {
        const newValue = {...value, [e.target.name]: e.target.value}
        setValue(newValue);
    }   

    React.useEffect(() => {
        setValue(currentUser)
    }, [currentUser, props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name: value.name,
          about: value.about,
        });
      }

    return (
      <PopupWithForm
          onClose={props.onClose}
          isOpen={props.isOpen}
          onSubmit={handleSubmit}
          name="profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
        >
          <input
            type="text"
            name="name"
            className="popup__form-input popup__form-input_info_name"
            value={value.name || ''}
            onChange={handleInputChange}
            minLength="2"
            maxLength="40"
            id="profile-title"
            required
            autoComplete="off"
          />
          <span className="popup__error profile-title-error"></span>
          <input
            type="text"
            name="about"
            className="popup__form-input popup__form-input_info_about"
            value={value.about || ''}
            onChange={handleInputChange}
            minLength="2"
            maxLength="200"
            id="profile-about"
            required
            autoComplete="off"
          />
          <span className="popup__error profile-about-error"></span>
        </PopupWithForm>
    );
  }
  
  export default EditProfilePopup;
  