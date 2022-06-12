import AuthForm from "./AuthForm";
import React from "react";

function Register(props) {
  const [regData, setRegData] = React.useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const newRegData = {...regData, [e.target.name]: e.target.value}
    setRegData(newRegData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleRegister({
      email: regData.email,
      password: regData.password,
    });    
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      path="./sign-in"
      linkTitle="Уже зарегистрированы? Войти"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        className="popup__form-input popup__form-input_theme_dark"
        placeholder="Email"
        id="register-email"
        minLength="2"
        maxLength="20"
        required
        autoComplete="off"
        onChange={handleInputChange}
        value={regData.email || ''}
      />
      <span className="popup__error register-email-error"></span>
      <input
        type="password"
        name="password"
        className="popup__form-input popup__form-input_theme_dark"
        placeholder="Пароль"
        id="register-password"
        minLength="6"
        maxLength="20"
        required
        autoComplete="off"
        onChange={handleInputChange}
        value={regData.password || ''}
      />
      <span className="popup__error register-password-error"></span>
    </AuthForm>
  );
}

export default Register;
