import { Switch } from "react-router-dom";
import { Route, Link } from "react-router-dom";

function Header(props) {
  function openBurgerMenu() {
    props.onOpenMenu();
  }

  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo"></div>
        <div
          className={`${props.loggedIn && "header__menu-icon"} ${
            props.isMenuOpen && "header__menu-icon_active"
          }`}
          onClick={openBurgerMenu}
        >
          <span></span>
        </div>

        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>

      </div>

      {props.loggedIn && (
        <div
          className={`header__navBar ${
            props.isMenuOpen && "header__navBar_opened"
          }`}
        >
          <div className="header__user-email">{props.email}</div>
          <button className="header__button-signout" onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}      
    </header>
  );
}

export default Header;
