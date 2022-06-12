import AuthForm from "./AuthForm";
import React from "react";

function Login(props) {

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const newLoginData = {...loginData, [e.target.name]: e.target.value}
    setLoginData(newLoginData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleLogin({
      email: loginData.email,
      password: loginData.password,
    });
  }

  return (
    <AuthForm
      name="login"
      title="Вход"
      buttonText="Войти"
      path=""
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        className="popup__form-input popup__form-input_theme_dark"
        placeholder="Email"
        id="login-email"
        minLength="2"
        maxLength="20"
        required
        autoComplete="off"
        onChange={handleInputChange}
        value={loginData.email || ''}
      />
      <span className="popup__error login-email-error"></span>
      <input
        type="password"
        name="password"
        className="popup__form-input popup__form-input_theme_dark"
        placeholder="Пароль"
        id="login-password"
        minLength="6"
        maxLength="20"
        required
        autoComplete="off"
        onChange={handleInputChange}
        value={loginData.password || ''}
      />
      <span className="popup__error login-password-error"></span>
    </AuthForm>
  );
}

export default Login;
