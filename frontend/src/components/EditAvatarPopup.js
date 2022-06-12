import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const avatarLinkRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    avatarLinkRef.current.value = "";
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        className="popup__form-input popup__form-input_avatar_link"
        ref={avatarLinkRef}
        placeholder="Ссылка на аватар"
        id="avatar-link"
        required
        autoComplete="off"
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
