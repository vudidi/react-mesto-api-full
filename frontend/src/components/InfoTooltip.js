import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="tooltip"
      style={{
        display: "none",
      }}
    >
      <>
        <img
          className="popup__reg-icon"
          alt="Ошибка при регистрации"
          src={props.infoIcon}
        ></img>
        <p className="popup__reg-message">{props.infoMessage}</p>
      </>
    </PopupWithForm>
  );
}

export default InfoTooltip;
