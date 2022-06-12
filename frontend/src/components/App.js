import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as Auth from '../utils/Auth';
import iconErrorPath from '../styles/images/reg-icon-error.png';
import iconSuccessPath from '../styles/images/reg-icon-success.png';

function App() {
  const [isEditProfilePopupOpen, setOpenEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setOpenAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setOpenEditAvatar] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(null);
  const [isLoginSuccess, setLoginSuccess] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
      Promise.all([api.getCards(), api.getProfile()])
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        setOpenAddPlace(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newLike = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newLike);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((cardItem) => {
        setCards((arr) => arr.filter((c) => c._id !== card._id && cardItem));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        setOpenEditProfile(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        setOpenEditAvatar(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImageOpen(true);
  }

  function handleEditAvatarClick() {
    setOpenEditAvatar(true);
  }

  function handleEditProfileClick() {
    setOpenEditProfile(true);
  }

  function handleAddPlaceClick() {
    setOpenAddPlace(true);
  }

  function closeAllPopups() {
    setOpenEditAvatar(false);
    setOpenEditProfile(false);
    setOpenAddPlace(false);
    setImageOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleRegisterUser(data) {
    Auth.register(data.email, data.password)
      .then(() => {
        setRegistrationSuccess(true);
        setInfoTooltipOpen(true);
        setTimeout(() => {
          setInfoTooltipOpen(false);
          history.push('/sign-in');
        }, 1500);
      })
      .catch((err) => {
        setRegistrationSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleLoginUser(data) {
    Auth.authorize(data.email, data.password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        tokenCheck();
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setLoginSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log('token ', token);
      Auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  function toggleBurgerMenu() {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          email={userEmail}
          onOpenMenu={toggleBurgerMenu}
          isMenuOpen={isBurgerMenuOpen}
        />
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

            <ImagePopup
              onClose={closeAllPopups}
              card={selectedCard}
              isOpen={isImageOpen}
            />
          </ProtectedRoute>

          <Route path="/sign-in">
            <Login handleLogin={handleLoginUser} />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              isSuccess={isLoginSuccess}
              infoIcon={isLoginSuccess ? iconSuccessPath : iconErrorPath}
              infoMessage={
                isLoginSuccess
                  ? 'Вы успешно зарегистрировались!'
                  : 'Что-то пошло не так! Попробуйте ещё раз.'
              }
            />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegisterUser} />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              isSuccess={isRegistrationSuccess}
              infoIcon={isRegistrationSuccess ? iconSuccessPath : iconErrorPath}
              infoMessage={
                isRegistrationSuccess
                  ? 'Вы успешно зарегистрировались!'
                  : 'Что-то пошло не так! Попробуйте ещё раз.'
              }
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
