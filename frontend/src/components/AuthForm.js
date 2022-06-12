// import React from "react";
import { Link } from 'react-router-dom';

function AuthForm(props) {
    return (
      <div
        className="popup popup_opened popup_theme_dark"
      >
        <div className="popup__container popup__container_theme_dark">
          
          <form
            className="popup__form popup__form_theme_dark"
            name={props.name}
            id={`popupForm-_${props.name}`}
            onSubmit={props.onSubmit}
          >
            <h2 className="popup__form-title popup__form-title_theme_dark">{props.title}</h2>
            {props.children}
            <button
              className={`popup__form-button popup__form-button_theme_dark popup__form-button_${props.name}`}
              type="submit"
              id={`submit-${props.name}`}
            >
              {props.buttonText}
            </button>
            <Link to={props.path} className="popup__sign-in-link">{props.linkTitle}</Link>
          </form>
        </div>
      </div>
    );
  }
  
  export default AuthForm;